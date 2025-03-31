import { RenderConfigScreenCtx } from 'datocms-plugin-sdk'
import { GlobalParameters } from '../../../lib/types'
import { useOpenAIConfigFields } from '../../../hooks/useOpenAIConfigFields'
import OpenAIConfigFields from '../OpenAIConfigFields/OpenAIConfigFields'

type OpenAIConfigScreenProps = {
  ctx: RenderConfigScreenCtx
}

export default function OpenAIConfigScreen({ ctx }: OpenAIConfigScreenProps) {
  const {
    options,
    models,
    error,
    openAIApiKey,
    selectedModel,
    temperature,
    maxTokens,
    topP,
    prompt,
  } = useOpenAIConfigFields({ ctx })

  const pluginGlobalParameters: GlobalParameters =
    ctx.plugin.attributes.parameters

  function updateParametersFn(params: Record<string, unknown>) {
    ctx.updatePluginParameters({ ...pluginGlobalParameters, ...params })
    ctx.notice('Settings updated successfully!')
  }

  return (
    <OpenAIConfigFields
      updateParametersFn={updateParametersFn}
      options={options}
      models={models}
      openAIApiKey={openAIApiKey}
      error={error}
      selectedModel={selectedModel}
      temperature={temperature}
      maxTokens={maxTokens}
      topP={topP}
      prompt={prompt}
    />
  )
}
