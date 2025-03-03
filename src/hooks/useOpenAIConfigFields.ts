import {
  RenderConfigScreenCtx,
  RenderManualFieldExtensionConfigScreenCtx,
} from 'datocms-plugin-sdk'
import { useEffect, useMemo, useState } from 'react'
import {
  GlobalParameters,
  Models,
  OpenAIDefaultValues,
  Parameters,
  SettingOption,
} from '../lib/types'

function getDefaultModel({
  models,
}: {
  models: Models
}): SettingOption<string> {
  const model = models.find((model) => model.id === OpenAIDefaultValues.model)
  const modelId = model?.id

  if (!modelId) {
    return {
      value: '',
      label: '',
    }
  }

  return {
    value: modelId,
    label: modelId,
  }
}

export function useOpenAIConfigFields({
  ctx,
}: {
  ctx: RenderConfigScreenCtx | RenderManualFieldExtensionConfigScreenCtx
}) {
  const [models, setModels] = useState<Models | null>(null)
  const [error, setError] = useState<string>('')
  const pluginGlobalParameters: GlobalParameters =
    ctx.plugin.attributes.parameters
  let pluginParameters: Parameters | undefined = undefined

  if ('parameters' in ctx) {
    pluginParameters = ctx.parameters
  }

  const model = pluginParameters?.model ?? pluginGlobalParameters.model
  const openAIApiKey =
    pluginParameters?.openAIApiKey ?? pluginGlobalParameters.openAIApiKey

  const selectedModel = useMemo(
    () => model ?? getDefaultModel({ models: models ?? [] }),
    [models, model],
  )

  const options = useMemo(() => {
    if (!models) {
      return []
    }

    return models.map((model) => ({
      label: model.id,
      value: model.id,
    }))
  }, [models])

  const temperature =
    pluginParameters?.temperature ??
    pluginGlobalParameters.temperature ??
    OpenAIDefaultValues.temperature

  const maxTokens =
    pluginParameters?.maxTokens ??
    pluginGlobalParameters.maxTokens ??
    OpenAIDefaultValues.maxTokens

  const topP =
    pluginParameters?.topP ??
    pluginGlobalParameters.topP ??
    OpenAIDefaultValues.topP

  const prompt =
    pluginParameters?.prompt ??
    pluginGlobalParameters.prompt ??
    OpenAIDefaultValues.prompt

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

  return {
    options,
    models,
    error,
    openAIApiKey,
    selectedModel,
    temperature,
    maxTokens,
    topP,
    prompt,
  }
}
