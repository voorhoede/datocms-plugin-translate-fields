import { RenderManualFieldExtensionConfigScreenCtx } from 'datocms-plugin-sdk'
import {
  Canvas,
  Form,
  SelectField,
  FieldGroup,
  SwitchField,
} from 'datocms-react-ui'

import {
  deeplFormalityLevelOptions,
  defaultShowTranslate,
  defaultDeeplPreserveFormatting,
  translationServiceOptions,
} from '../../lib/constants'
import {
  GlobalParameters,
  Parameters,
  TranslationService,
} from '../../lib/types'

import ApiTextField from '../../components/ApiTextField/ApiTextField'
import GlossaryIdField from '../../components/GlossaryIdField/GlossaryIdField'
import FormalityField from '../../components/FormalityField/FormalityField'
import ExcludedFields from '../../components/ExcludedKeysField/ExcludedKeysField'
import OpenAIAddonConfigScreen from '../../components/OpenAI/OpenAIAddonConfigScreen/OpenAIAddonConfigScreen'

type Props = {
  ctx: RenderManualFieldExtensionConfigScreenCtx
}

export default function ConfigScreen({ ctx }: Props) {
  const pluginParameters: Parameters = ctx.parameters
  const pluginGlobalParameters: GlobalParameters =
    ctx.plugin.attributes.parameters

  const selectedShowTranslateAll =
    pluginParameters?.showTranslateAll ??
    pluginGlobalParameters?.showTranslateAll ??
    defaultShowTranslate

  const selectedTranslationService =
    pluginParameters?.translationService ||
    pluginGlobalParameters?.translationService ||
    translationServiceOptions[0]

  const selectedFormalityLevel =
    pluginParameters?.deeplFormalityLevel ||
    pluginGlobalParameters?.deeplFormalityLevel ||
    deeplFormalityLevelOptions[0]

  const selectedPreserveFormatting =
    pluginParameters?.deeplPreserveFormatting ??
    pluginGlobalParameters?.deeplPreserveFormatting ??
    defaultDeeplPreserveFormatting

  const excludedKeys =
    pluginParameters?.excludedKeys || pluginGlobalParameters?.excludedKeys || ''

  const isDeepl =
    selectedTranslationService.value === TranslationService.deepl ||
    selectedTranslationService.value === TranslationService.deeplFree
  const isOpenAI =
    selectedTranslationService.value === TranslationService.openAI

  return (
    <Canvas ctx={ctx}>
      <Form>
        <FieldGroup>
          <SwitchField
            name="showTranslateAll"
            id="showTranslateAll"
            label='Show "translate to all locales" button'
            hint='If disabled it will not show the "Translate to all locales" button.'
            value={selectedShowTranslateAll}
            onChange={(newValue) => {
              ctx.setParameters({
                ...pluginParameters,
                showTranslateAll: newValue,
              })
              ctx.notice('Settings updated successfully!')
            }}
          />

          <SelectField
            name="translationService"
            id="translationService"
            label="Translation service"
            hint="This is the translation service that will be used to translate fields."
            value={selectedTranslationService}
            selectInputProps={{
              options: translationServiceOptions,
            }}
            onChange={(newValue) => {
              ctx.setParameters({
                ...pluginParameters,
                translationService: newValue,
              })

              ctx.notice('Settings updated successfully!')
            }}
          />

          {translationServiceOptions.map((option) => {
            const currentValue: string =
              pluginParameters?.[`${option.value}ApiKey`] ||
              pluginGlobalParameters?.[`${option.value}ApiKey`] ||
              ''

            return (
              selectedTranslationService.value === option.value && (
                <ApiTextField
                  key={option.value}
                  value={currentValue}
                  option={option}
                  onBlur={(newValue) => {
                    if (newValue !== currentValue) {
                      ctx.setParameters({
                        ...pluginParameters,
                        [`${option.value}ApiKey`]: newValue,
                      })

                      ctx.notice('Settings updated successfully!')
                    }
                  }}
                />
              )
            )
          })}

          {isDeepl && (
            <FormalityField
              onChange={(newValue) => {
                if (
                  newValue.value !==
                  pluginParameters?.deeplFormalityLevel?.value
                ) {
                  ctx.setParameters({
                    ...pluginParameters,
                    deeplFormalityLevel: newValue,
                  })

                  ctx.notice('Settings updated successfully!')
                }
              }}
              value={selectedFormalityLevel}
            />
          )}

          {isDeepl && (
            <SwitchField
              name="deeplPreserveFormatting"
              id="deeplPreserveFormatting"
              label="Preserve formatting"
              hint="Sets whether the translation engine should respect the original formatting, even if it would usually correct some aspects."
              onChange={(newValue) => {
                ctx.setParameters({
                  ...pluginParameters,
                  deeplPreserveFormatting: newValue,
                })

                ctx.notice('Settings updated successfully!')
              }}
              value={selectedPreserveFormatting}
            />
          )}

          {isDeepl && (
            <GlossaryIdField
              value={pluginParameters?.deeplGlossaryId || ''}
              onBlur={(newValue) => {
                if (newValue !== pluginParameters?.deeplGlossaryId) {
                  ctx.setParameters({
                    ...pluginParameters,
                    deeplGlossaryId: newValue,
                  })

                  ctx.notice('Settings updated successfully!')
                }
              }}
            />
          )}

          {isOpenAI && <OpenAIAddonConfigScreen ctx={ctx} />}

          <ExcludedFields
            value={excludedKeys}
            onBlur={(newValue) => {
              if (newValue !== excludedKeys) {
                ctx.setParameters({
                  ...pluginParameters,
                  excludedKeys: newValue,
                })

                ctx.notice('Settings updated successfully!')
              }
            }}
          />
        </FieldGroup>
      </Form>
    </Canvas>
  )
}
