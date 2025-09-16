import { SelectField, TextField, FieldGroup, Spinner } from 'datocms-react-ui'
import { Models, SettingOption } from '../../../lib/types'
import PromptTextareaField from '../../PromptTextareaField/PromptTextareaField'

type OpenAIConfigFieldsProps = {
  updateParametersFn: (params: Record<string, unknown>) => void
  options: SettingOption<string>[]
  models: Models | null
  openAIApiKey: string | undefined
  error: string
  selectedModel: SettingOption<string>
  temperature: number
  maxCompletionTokens: number
  topP: number
  prompt: string
}

export default function OpenAIConfigFields({
  updateParametersFn,
  options,
  models,
  error,
  openAIApiKey,
  selectedModel,
  temperature,
  maxCompletionTokens,
  topP,
  prompt,
}: OpenAIConfigFieldsProps) {
  if (!openAIApiKey) {
    return null
  }

  if (!models) {
    return <Spinner />
  }

  return (
    <>
      {error && <p className="text-error">{error}</p>}

      <FieldGroup>
        <SelectField
          name="model"
          id="model"
          label="Model"
          hint="All available models. Note: not all models are suitable for translation."
          selectInputProps={{ options }}
          value={selectedModel}
          onChange={(newValue) => {
            updateParametersFn({
              model: newValue,
            })
          }}
        />

        <TextField
          name="temperature"
          id="temperature"
          label="Temperature"
          hint="What sampling temperature to use."
          value={temperature}
          textInputProps={{
            type: 'number',
            min: 0,
            max: 1,
            step: 0.01,
          }}
          onChange={(newValue) => {
            updateParametersFn({
              temperature: Number(newValue),
            })
          }}
        />

        <TextField
          name="maxCompletionTokens"
          id="maxCompletionTokens"
          label="Max Tokens"
          hint="The maximum number of tokens to generate in the completion. The exact limit varies per model."
          placeholder="100"
          value={maxCompletionTokens}
          textInputProps={{
            type: 'number',
            min: 0,
            max: 4000,
            step: 1,
          }}
          onChange={(newValue) => {
            updateParametersFn({
              maxCompletionTokens: Number(newValue),
            })
          }}
        />

        <TextField
          name="topP"
          id="topP"
          label="Top P"
          hint="An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass."
          value={topP}
          textInputProps={{
            type: 'number',
            min: 0,
            max: 1,
            step: 0.01,
          }}
          onChange={(newValue) => {
            updateParametersFn({
              topP: Number(newValue),
            })
          }}
        />

        <PromptTextareaField
          openAIApiKey={openAIApiKey}
          selectedModel={selectedModel}
          temperature={temperature}
          maxCompletionTokens={maxCompletionTokens}
          topP={topP}
          value={prompt}
          onBlur={(newValue) => {
            updateParametersFn({
              prompt: newValue,
            })
          }}
        />
      </FieldGroup>
    </>
  )
}
