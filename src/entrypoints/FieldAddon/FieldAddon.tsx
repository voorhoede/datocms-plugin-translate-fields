import { useEffect, useState } from 'react'
import get from 'lodash/get'
import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk'
import { Canvas, Form, Button, Spinner } from 'datocms-react-ui'

import {
  getTranslation,
  getStructuredTextTranslation,
  getMarkdownTranslation,
  getRichTextTranslation,
  getHtmlTranslation,
  getSupportedToLocale,
  getSupportedFromLocale,
  getSeoTranslation,
} from '../../lib/translation'
import {
  Editor,
  TranslationFormat,
  TranslationOptions,
  GlobalParameters,
  Parameters,
  SettingOption,
  TranslationService,
  TranslationServiceKey,
  OpenAIDefaultValues,
} from '../../lib/types'
import {
  translationFormats,
  translationServiceOptions,
} from '../../lib/constants'
import { fieldHasFieldValue } from '../../lib/helpers'

type Props = {
  ctx: RenderFieldExtensionCtx
}

export default function FieldAddon({ ctx }: Props) {
  const [isTranslating, setIsTranslating] = useState(false)
  const [hasError, setHasError] = useState('')

  const pluginGlobalParameters: GlobalParameters =
    ctx.plugin.attributes.parameters
  const pluginParameters: Parameters = ctx.parameters

  const translationService: SettingOption =
    pluginParameters?.translationService ||
    pluginGlobalParameters?.translationService ||
    translationServiceOptions[0]

  const translationServiceValue = translationService.value as TranslationService
  const translationServiceApiKey =
    `${translationServiceValue}ApiKey` as TranslationServiceKey

  const translationApiKey: string =
    pluginParameters?.[translationServiceApiKey] ||
    pluginGlobalParameters?.[translationServiceApiKey] ||
    ''

  const model = pluginParameters.model ?? pluginGlobalParameters.model
  const modelValue = model?.value ?? OpenAIDefaultValues.model

  const temperature =
    pluginParameters.temperature ??
    pluginGlobalParameters.temperature ??
    OpenAIDefaultValues.temperature

  const maxTokens =
    pluginParameters.maxTokens ??
    pluginGlobalParameters.maxTokens ??
    OpenAIDefaultValues.maxTokens

  const topP =
    pluginParameters.topP ??
    pluginGlobalParameters.topP ??
    OpenAIDefaultValues.topP

  const fieldValue: any = get(ctx.formValues, ctx.fieldPath)
  const currentLocale: string = ctx.locale
  const locales: string[] = ctx.formValues.internalLocales as string[]
  const editor: Editor = ctx.field.attributes.appearance?.editor as Editor
  const isDefaultLocale: boolean = currentLocale === locales[0]
  const translationFormat: TranslationFormat = translationFormats[editor]

  useEffect(() => {
    setHasError('')
  }, [fieldValue])

  useEffect(() => {
    if (translationApiKey === '' && process.env.REACT_APP_USE_MOCK !== 'true') {
      setHasError(`Set ${translationService.label} API key in the settings`)
    }
  }, [translationApiKey, translationService])

  async function translateField(languages: string[], fromLocale?: string) {
    let translatableField = fieldValue
    const [fieldPath]: string[] = ctx.fieldPath.split(/\.(?=[^.]+$)/)
    if (fromLocale) {
      translatableField = get(ctx.formValues, `${fieldPath}.${fromLocale}`)
    }

    if (fieldHasFieldValue(translatableField, ctx)) {
      for (const locale of languages) {
        let translatedField
        const options: TranslationOptions = {
          fromLocale: getSupportedFromLocale(
            fromLocale || locales[0],
            translationServiceValue
          ),
          toLocale: getSupportedToLocale(locale, translationServiceValue),
          format: translationFormat,
          translationService: translationServiceValue,
          apiKey: translationApiKey,
          openAIOptions: {
            model: modelValue,
            temperature,
            maxTokens,
            topP,
          },
        }

        try {
          setIsTranslating(true)
          switch (translationFormat) {
            case TranslationFormat.structuredText: {
              translatedField = await getStructuredTextTranslation(
                translatableField,
                options
              )
              break
            }
            case TranslationFormat.html: {
              translatedField = await getHtmlTranslation(
                translatableField,
                options
              )
              break
            }
            case TranslationFormat.markdown: {
              translatedField = await getMarkdownTranslation(
                translatableField,
                options
              )
              break
            }
            case TranslationFormat.seo: {
              translatedField = await getSeoTranslation(
                translatableField,
                options
              )
              break
            }
            case TranslationFormat.richText: {
              translatedField = await getRichTextTranslation(
                translatableField,
                options
              )
              break
            }
            default: {
              translatedField = await getTranslation(translatableField, options)
              break
            }
          }

          ctx.setFieldValue(`${fieldPath}.${locale}`, translatedField)
        } catch (error: any) {
          setHasError(error.message)
        } finally {
          setIsTranslating(false)
        }
      }
    } else {
      setHasError(
        `Please add content to the default field (${fromLocale || locales[0]})`
      )
    }
  }

  if (hasError) {
    return (
      <Canvas ctx={ctx}>
        <p className="text-error body--small">{hasError}</p>
      </Canvas>
    )
  }

  if (fieldHasFieldValue(fieldValue, ctx) && !isDefaultLocale) {
    ctx.setHeight(0)
    return <></>
  }
  
  if (locales.length <= 1) {
    ctx.setHeight(0)
    return <></>
  }

  if (!isDefaultLocale) {
    return (
      <Canvas ctx={ctx}>
        <Form onSubmit={() => translateField([currentLocale], locales[0])}>
          <Button
            buttonSize="xxs"
            type="submit"
            rightIcon={isTranslating ? <Spinner size={24} /> : null}
            leftIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width="1em"
                height="1em"
              >
                <path
                  d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"
                  fill="currentColor"
                ></path>
              </svg>
            }
            disabled={isTranslating}
          >
            Copy and translate from {locales[0]}
          </Button>
        </Form>
      </Canvas>
    )
  }

  return (
    <Canvas ctx={ctx}>
      <Form
        onSubmit={() =>
          translateField(locales.filter((locale) => locale !== currentLocale))
        }
      >
        <Button
          buttonSize="xxs"
          type="submit"
          rightIcon={isTranslating ? <Spinner size={24} /> : null}
          disabled={isTranslating}
        >
          Translate to all locales (
          {locales.filter((locale) => locale !== currentLocale).join(', ')})
        </Button>
      </Form>
    </Canvas>
  )
}
