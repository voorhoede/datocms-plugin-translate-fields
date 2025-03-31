import { useState } from 'react'
import { TextareaField } from 'datocms-react-ui'
import {
  TranslationFormat,
  TranslationService,
  SettingOption,
} from '../../lib/types'
import { getPrompt } from '../../lib/translation-services/openAI'

type PromptTextareaFieldProps = {
  openAIApiKey: string
  selectedModel: SettingOption<string>
  temperature: number
  maxTokens: number
  topP: number
  value: string
  onBlur: (newValue: string) => void
}

export default function PromptTextareaField({
  openAIApiKey,
  selectedModel,
  temperature,
  maxTokens,
  topP,
  value,
  onBlur,
}: PromptTextareaFieldProps) {
  const [prompt, setPrompt] = useState<string>(value)

  return (
    <TextareaField
      name="prompt"
      id="prompt"
      label="Prompt"
      value={prompt}
      hint={
        <>
          <p>
            Prompt can be used to provide context to the translation model. Use{' '}
            {`{{}}`} for inserting some variables.{' '}
          </p>
          <p>
            Variables to use: {`{{value}}`} (The text to translate),{' '}
            {`{{fromLocale}}`}, {`{{toLocale}}`} and {`{{format}}`} (The format
            of the field (i.e {Object.values(TranslationFormat).join(', ')})).
          </p>
          <p>
            Used prompt:{' '}
            {getPrompt({
              value: '[Text to translate]',
              prompt,
              options: {
                fromLocale: 'en',
                toLocale: 'nl',
                format: TranslationFormat.html,
                translationService: TranslationService.openAI,
                apiKey: openAIApiKey,
                openAIOptions: {
                  model: selectedModel.value,
                  temperature,
                  maxTokens,
                  topP,
                  prompt,
                },
              },
            })}
          </p>
        </>
      }
      textareaInputProps={{
        onBlur: (e) => {
          onBlur(e.target.value)
        },
      }}
      onChange={(newValue: string) => {
        setPrompt(newValue)
      }}
    />
  )
}
