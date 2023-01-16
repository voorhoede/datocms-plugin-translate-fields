import {
  RenderConfigScreenCtx,
  RenderManualFieldExtensionConfigScreenCtx,
} from 'datocms-plugin-sdk'
import {
  SelectField,
  TextField,
  FieldGroup,
  Spinner,
  Canvas,
} from 'datocms-react-ui'
import { useOpenAIConfigFields } from '../../hooks/useOpenAIConfigFields'
import {
  Parameters,
  GlobalParameters,
  Models,
  SettingOption,
} from '../../lib/types'

type OpenAIConfigFieldsProps = {
  ctx: RenderConfigScreenCtx | RenderManualFieldExtensionConfigScreenCtx
  pluginParameters: Parameters | GlobalParameters
  updateParametersFn: (params: Record<string, unknown>) => Promise<void>
  options: Array<SettingOption>
  models: Models | null
  openAIApiKey: string | undefined
  error: string
  selectedModel: SettingOption
  temperature: number
  maxTokens: number
  topP: number
}

function OpenAIConfigFields({
  ctx,
  pluginParameters,
  updateParametersFn,
  options,
  models,
  error,
  openAIApiKey,
  selectedModel,
  temperature,
  maxTokens,
  topP,
}: OpenAIConfigFieldsProps) {
  if (error) {
    return (
      <Canvas ctx={ctx}>
        <p className='text-error'>{error}</p>
      </Canvas>
    )
  }

  if (!openAIApiKey) {
    return null
  }

  if (!models) {
    return <Spinner />
  }

  return (
    <FieldGroup>
      <SelectField
        name='model'
        id='model'
        label='Model'
        hint='All available GPT3 models. Note: not all models are suitable for translation.'
        selectInputProps={{ options }}
        value={selectedModel}
        onChange={(newValue) => {
          updateParametersFn({
            ...pluginParameters,
            model: newValue,
          })
          ctx.notice('Settings updated successfully!')
        }}
      />

      <TextField
        name='temperature'
        id='temperature'
        label='Temperature'
        hint='What sampling temperature to use.'
        value={temperature}
        textInputProps={{
          type: 'number',
          min: 0,
          max: 1,
          step: 0.01,
        }}
        onChange={(newValue) => {
          updateParametersFn({
            ...pluginParameters,
            temperature: Number(newValue),
          })
          ctx.notice('Settings updated successfully!')
        }}
      />

      <TextField
        name='maxTokens'
        id='maxTokens'
        label='Max Tokens'
        hint='The maximum number of tokens to generate in the completion. The exact limit varies per model.'
        placeholder='100'
        value={maxTokens}
        textInputProps={{
          type: 'number',
          min: 0,
          max: 4000,
          step: 1,
        }}
        onChange={(newValue) => {
          updateParametersFn({
            ...pluginParameters,
            maxTokens: Number(newValue),
          })
          ctx.notice('Settings updated successfully!')
        }}
      />

      <TextField
        name='topP'
        id='topP'
        label='Top P'
        hint='An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass.'
        value={topP}
        textInputProps={{
          type: 'number',
          min: 0,
          max: 1,
          step: 0.01,
        }}
        onChange={(newValue) => {
          updateParametersFn({
            ...pluginParameters,
            topP: Number(newValue),
          })
          ctx.notice('Settings updated successfully!')
        }}
      />
    </FieldGroup>
  )
}

type OpenAIConfigFieldsConfigScreenProps = {
  ctx: RenderConfigScreenCtx
}

export function OpenAIConfigFieldsConfigScreen({
  ctx,
}: OpenAIConfigFieldsConfigScreenProps) {
  const {
    options,
    models,
    error,
    openAIApiKey,
    selectedModel,
    temperature,
    maxTokens,
    topP,
  } = useOpenAIConfigFields({ ctx })

  const pluginParameters: GlobalParameters = ctx.plugin.attributes.parameters

  return (
    <OpenAIConfigFields
      ctx={ctx}
      pluginParameters={pluginParameters}
      updateParametersFn={ctx.updatePluginParameters}
      options={options}
      models={models}
      openAIApiKey={openAIApiKey}
      error={error}
      selectedModel={selectedModel}
      temperature={temperature}
      maxTokens={maxTokens}
      topP={topP}
    />
  )
}

type OpenAIConfigFieldsFieldAddonConfigScreenProps = {
  ctx: RenderManualFieldExtensionConfigScreenCtx
}

export function OpenAIConfigFieldsFieldAddonConfigScreen({
  ctx,
}: OpenAIConfigFieldsFieldAddonConfigScreenProps) {
  const configFields = useOpenAIConfigFields({ ctx })

  const { options, models, openAIApiKey, error } = configFields
  let { selectedModel, temperature, maxTokens, topP } = configFields

  const pluginParameters: Parameters = ctx.parameters

  selectedModel = pluginParameters.model ?? selectedModel
  temperature = pluginParameters.temperature ?? temperature
  maxTokens = pluginParameters.maxTokens ?? maxTokens
  topP = pluginParameters.topP ?? topP

  return (
    <OpenAIConfigFields
      ctx={ctx}
      pluginParameters={pluginParameters}
      updateParametersFn={ctx.setParameters}
      options={options}
      models={models}
      openAIApiKey={openAIApiKey}
      error={error}
      selectedModel={selectedModel}
      temperature={temperature}
      maxTokens={maxTokens}
      topP={topP}
    />
  )
}
