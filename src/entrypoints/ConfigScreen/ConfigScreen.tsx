import { RenderConfigScreenCtx } from 'datocms-plugin-sdk'
import {
  Canvas,
  Form,
  SelectField,
  SwitchField,
  FieldGroup,
} from 'datocms-react-ui'

import {
  deeplFormalityLevelOptions,
  defaultShowTranslate,
  fieldsOptions,
  translationServiceOptions,
} from '../../lib/constants'
import { GlobalParameters, TranslationService } from '../../lib/types'

import ApiTextField from '../../components/ApiTextField/ApiTextField'
import OpenAIConfigScreen from '../../components/OpenAI/OpenAIConfigScreen/OpenAIConfigScreen'
import GlossaryIdField from '../../components/GlossaryIdField/GlossaryIdField'
import FormalityField from '../../components/FormalityField/FormalityField'
import ExcludedFields from '../../components/ExcludedKeysField/ExcludedKeysField'

type Props = {
  ctx: RenderConfigScreenCtx
}

export default function ConfigScreen({ ctx }: Props) {
  const pluginParameters: GlobalParameters = ctx.plugin.attributes.parameters
  const selectedTranslationService =
    pluginParameters?.translationService || translationServiceOptions[0]
  const selectedFormalityLevel =
    pluginParameters?.deeplFormalityLevel || deeplFormalityLevelOptions[0]
  const excludedKeys = pluginParameters?.excludedKeys || ''

  const isDeepl =
    selectedTranslationService.value === TranslationService.deepl ||
    selectedTranslationService.value === TranslationService.deeplFree
  const isOpenAI =
    selectedTranslationService.value === TranslationService.openAI

  return (
    <Canvas ctx={ctx}>
      <p>
        This DatoCMS plugin gives you the ability to translate structured-text,
        string and text fields.
      </p>

      <Form>
        <FieldGroup>
          <SwitchField
            name="autoApply"
            id="autoApply"
            label="Auto apply to fields"
            hint="If enabled it will automatically apply the translate plugin to all fields set in the settings."
            value={Boolean(pluginParameters?.autoApply)}
            onChange={(newValue: boolean) => {
              ctx.updatePluginParameters({
                ...pluginParameters,
                autoApply: newValue,
              })
              ctx.notice('Settings updated successfully!')
            }}
          />
        </FieldGroup>

        {pluginParameters?.autoApply && (
          <FieldGroup>
            <SelectField
              name="fieldsToEnable"
              id="fieldsToEnable"
              label="Fields where this plugin is enabled"
              hint="These are all fields where the translate plugin will automatically apply."
              value={pluginParameters?.fieldsToEnable || fieldsOptions}
              selectInputProps={{
                isMulti: true,
                options: fieldsOptions,
              }}
              onChange={(newValue) => {
                ctx.updatePluginParameters({
                  ...pluginParameters,
                  fieldsToEnable: newValue,
                })
                ctx.notice('Settings updated successfully!')
              }}
            />

            <SwitchField
              name="showTranslateAll"
              id="showTranslateAll"
              label='Show "translate to all locales" button'
              hint='If disabled it will not show the "Translate to all locales" button.'
              value={pluginParameters?.showTranslateAll ?? defaultShowTranslate}
              onChange={(newValue) => {
                ctx.updatePluginParameters({
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
                ctx.updatePluginParameters({
                  ...pluginParameters,
                  translationService: newValue,
                })
                ctx.notice('Settings updated successfully!')
              }}
            />

            {translationServiceOptions.map((option) => {
              return (
                selectedTranslationService.value === option.value && (
                  <ApiTextField
                    key={option.value}
                    value={pluginParameters?.[`${option.value}ApiKey`] || ''}
                    option={option}
                    onBlur={(newValue) => {
                      if (
                        newValue !== pluginParameters?.[`${option.value}ApiKey`]
                      ) {
                        ctx.updatePluginParameters({
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
                    newValue?.value !==
                    pluginParameters?.deeplFormalityLevel?.value
                  ) {
                    ctx.updatePluginParameters({
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
                    ctx.updatePluginParameters({
                      ...pluginParameters,
                      deeplGlossaryId: newValue,
                    })

                    ctx.notice('Settings updated successfully!')
                  }
                }}
              />
            )}

            {isOpenAI && <OpenAIConfigScreen ctx={ctx} />}

            <ExcludedFields
              value={excludedKeys}
              onBlur={(newValue) => {
                if (newValue !== excludedKeys) {
                  ctx.updatePluginParameters({
                    ...pluginParameters,
                    excludedKeys: newValue,
                  })

                  ctx.notice('Settings updated successfully!')
                }
              }}
            />
          </FieldGroup>
        )}
      </Form>
    </Canvas>
  )
}
