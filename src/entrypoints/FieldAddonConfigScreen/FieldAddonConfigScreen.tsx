import { RenderManualFieldExtensionConfigScreenCtx } from 'datocms-plugin-sdk'
import { Canvas, Form, SelectField, FieldGroup } from 'datocms-react-ui'

import { translationServiceOptions } from '../../lib/constants'
import {
  GlobalParameters,
  Parameters,
  TranslationService,
} from '../../lib/types'

import ApiTextField from '../../components/ApiTextField/ApiTextField'
import { OpenAIConfigFieldsFieldAddonConfigScreen } from '../../components/OpenAIConfigFields/OpenAIConfigFields'
import GlossaryIdField from '../../components/GlossaryIdField/GlossaryIdField'

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

  console.warn('pluginParameters', pluginParameters)
  console.warn('pluginGlobalParameters', pluginGlobalParameters)

  return (
    <Canvas ctx={ctx}>
      <p>This DatoCMS plugin.</p>

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

          {(selectedTranslationService.value === TranslationService.deepl ||
            selectedTranslationService.value ===
              TranslationService.deeplFree) && (
            <GlossaryIdField
              value={pluginParameters?.deeplGlossaryId || ''}
              onBlur={(newValue) => {
                if (newValue !== pluginParameters?.deeplGlossaryId) {
                  ctx.updatePluginParameters({
                    ...pluginParameters,
                    deeplGlossaryId: newValue,
                  })

                  ctx.notice('Settings updated successfully!')
                }
              }}
            />
          )}

          {selectedTranslationService.value === TranslationService.openAI && (
            <OpenAIConfigFieldsFieldAddonConfigScreen ctx={ctx} />
          )}
        </FieldGroup>
      </Form>
    </Canvas>
  )
}
