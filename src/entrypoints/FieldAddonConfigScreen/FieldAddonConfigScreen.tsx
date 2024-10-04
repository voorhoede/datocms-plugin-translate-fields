import { RenderManualFieldExtensionConfigScreenCtx } from 'datocms-plugin-sdk'
import { Canvas, Form, SelectField, FieldGroup } from 'datocms-react-ui'

import {
  deeplFormalityLevelOptions,
  translationServiceOptions,
} from '../../lib/constants'
import {
  GlobalParameters,
  Parameters,
  TranslationService,
} from '../../lib/types'

import ApiTextField from '../../components/ApiTextField/ApiTextField'
import { OpenAIConfigFieldsFieldAddonConfigScreen } from '../../components/OpenAIConfigFields/OpenAIConfigFields'
import GlossaryIdField from '../../components/GlossaryIdField/GlossaryIdField'
import FormalityField from '../../components/FormalityField/FormalityField'
import ExcludedFields from '../../components/ExcludedKeysField/ExcludedKeysField'

type Props = {
  ctx: RenderManualFieldExtensionConfigScreenCtx
}

export default function ConfigScreen({ ctx }: Props) {
  const pluginParameters: Parameters = ctx.parameters
  const pluginGlobalParameters: GlobalParameters =
    ctx.plugin.attributes.parameters

  const selectedTranslationService =
    pluginParameters?.translationService ||
    pluginGlobalParameters?.translationService ||
    translationServiceOptions[0]

  const selectedFormalityLevel =
    pluginParameters?.deeplFormalityLevel ||
    pluginGlobalParameters?.deeplFormalityLevel ||
    deeplFormalityLevelOptions[0]

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

          {isOpenAI && <OpenAIConfigFieldsFieldAddonConfigScreen ctx={ctx} />}

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
