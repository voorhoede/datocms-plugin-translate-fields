import { RenderManualFieldExtensionConfigScreenCtx } from 'datocms-plugin-sdk'
import { Parameters } from '../../../lib/types'
import { useOpenAIConfigFields } from '../../../hooks/useOpenAIConfigFields'
import OpenAIConfigFields from '../OpenAIConfigFields/OpenAIConfigFields'

type OpenAIAddonConfigScreenProps = {
  ctx: RenderManualFieldExtensionConfigScreenCtx
}

export default function OpenAIAddonConfigScreen({
  ctx,
}: OpenAIAddonConfigScreenProps) {
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

  const pluginParameters: Parameters = ctx.parameters

  function updateParametersFn(params: Record<string, unknown>) {
    ctx.setParameters({ ...pluginParameters, ...params })
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
