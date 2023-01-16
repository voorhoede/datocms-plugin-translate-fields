import { RenderConfigScreenCtx } from 'datocms-plugin-sdk'
import {
  SelectField,
  TextField,
  FieldGroup,
  Spinner,
  Canvas,
} from 'datocms-react-ui'
import { useEffect, useMemo, useState } from 'react'
import {
  GlobalParameters,
  OpenAIDefaultValues,
  SettingOption,
} from '../../lib/types'

type OpenAIConfigFieldsProps = {
  ctx: RenderConfigScreenCtx
}

type Models = Array<{ id: string }>

function getDefaultModel({ models }: { models: Models }): SettingOption {
  const model = models.find((model) => model.id === OpenAIDefaultValues.model)
  const modelId = model?.id

  if (!modelId) {
    return {
      value: '',
      label: ''
    }
  }

  return {
    value: modelId,
    label: modelId
  }
}

export default function OpenAIConfigFields({ ctx }: OpenAIConfigFieldsProps) {
  const [models, setModels] = useState<Models | null>(null)
  const [options, setOptions] = useState<SettingOption[]>([])
  const [error, setError] = useState<string>('')

  const pluginParameters: GlobalParameters = ctx.plugin.attributes.parameters
  const { openAIApiKey } = pluginParameters

  const selectedModel: SettingOption = useMemo(
    () => pluginParameters?.model ?? getDefaultModel({ models: models ?? [] }),
    [models, pluginParameters?.model]
  )

  const temperature =
    pluginParameters.temperature ?? OpenAIDefaultValues.temperature
  const maxTokens = pluginParameters.maxTokens ?? OpenAIDefaultValues.maxTokens
  const topP = pluginParameters.topP ?? OpenAIDefaultValues.topP

  useEffect(() => {
    if (openAIApiKey) {
      setError('')

      fetch('https://api.openai.com/v1/models', {
        headers: {
          Authorization: 'Bearer ' + openAIApiKey,
        },
      })
        .then((request) => {
          if (request.status !== 200) {
            throw new Error(`OpenAI returned status ${request.status}`)
          }

          return request.json()
        })
        .then((response) => {
          setModels(response.data)
        })
        .catch((e: Error) => {
          setError(e.message)
        })
    }
  }, [openAIApiKey])

  useEffect(() => {
    if (models) {
      const modelOptions = models.map((model) => ({
        label: model.id,
        value: model.id,
      }))
      setOptions(modelOptions)
    }
  }, [models])

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
          ctx.updatePluginParameters({
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
          ctx.updatePluginParameters({
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
          ctx.updatePluginParameters({
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
          ctx.updatePluginParameters({
            ...pluginParameters,
            topP: Number(newValue),
          })
          ctx.notice('Settings updated successfully!')
        }}
      />
    </FieldGroup>
  )
}
