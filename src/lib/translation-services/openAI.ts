import { TranslationOptions } from '../types'

export default async function translate(
  string: string,
  options: TranslationOptions,
): Promise<string> {
  const prompt = getPrompt({
    value: string,
    prompt: options.openAIOptions.prompt,
    options,
  })

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + options.apiKey,
    },
    body: JSON.stringify({
      messages: [{ role: 'user', content: prompt }],
      model: options.openAIOptions.model,
      temperature: options.openAIOptions.temperature,
      max_tokens: options.openAIOptions.maxTokens,
      top_p: options.openAIOptions.topP,
    }),
  }

  const request = await fetch(
    'https://api.openai.com/v1/chat/completions',
    requestOptions,
  )

  if (request.status !== 200) {
    throw new Error(`OpenAI returned status ${request.status}`)
  }

  const response = await request.json()
  const text = response.choices[0].message.content as string

  return text.trim()
}

export function getPrompt({
  value,
  prompt,
  options,
}: {
  value: string
  prompt: string
  options: TranslationOptions
}) {
  return prompt
    .replace(/{{\s*fromLocale\s*}}/g, options.fromLocale)
    .replace(/{{\s*toLocale\s*}}/g, options.toLocale)
    .replace(/{{\s*format\s*}}/g, options.format)
    .replace(/{{\s*value\s*}}/g, value)
}
