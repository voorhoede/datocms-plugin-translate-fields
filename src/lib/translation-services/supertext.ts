import { SupertextPolitness, TranslationOptions } from '../types'

export default async function translate(
  string: string,
  options: TranslationOptions,
): Promise<string> {
  const apiUrl = new URL('https://cors-proxy.datocms.com') // DatoCMS-provided CORS proxy
  apiUrl.searchParams.set(
    'url',
    'https://api.supertext.com/v1/translate/ai/text',
  ) // Actual Supertext API endpoint

  // Make the API request
  const request = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      Authorization: `Supertext-Auth-Key ${options.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: [string],
      source_lang: options.fromLocale ?? undefined,
      target_lang: options.toLocale,
      tag_handling:
        options.format === 'html'
          ? 'html'
          : !options.supertextOptions?.preserveFormatting
          ? 'xml'
          : undefined,
      politeness:
        options.supertextOptions?.politeness &&
        options.supertextOptions.politeness !== SupertextPolitness.default
          ? options.supertextOptions.politeness
          : undefined,
    }),
  })

  if (request.status !== 200) {
    throw new Error(`Supertext returned status ${request.status}`)
  }

  const response = await request.json()

  return (response.translated_text as string[]).join(' ')
}
