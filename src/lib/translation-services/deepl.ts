import {
  DeeplFormalityLevel,
  TranslationOptions,
  TranslationService,
} from '../types'

export default async function translate(
  string: string,
  options: TranslationOptions,
): Promise<string> {
  const params = new URLSearchParams()

  params.set('target_lang', options.toLocale)
  params.set('tag_handling', options.format === 'html' ? 'html' : 'xml')
  params.set('text', string)

  if (options.fromLocale) {
    params.set('source_lang', options.fromLocale)
  }

  if (options.deeplOptions?.glossaryId) {
    params.set('glossary_id', options.deeplOptions.glossaryId)
  }

  if (options.deeplOptions?.preserveFormatting) {
    params.set('preserve_formatting', '1')
  }

  if (
    options.deeplOptions?.formality &&
    options.deeplOptions.formality !== DeeplFormalityLevel.default
  ) {
    params.set('formality', options.deeplOptions.formality)
  }

  const apiVersion =
    options.translationService === TranslationService.deeplFree
      ? 'api-free'
      : 'api'

  const apiUrl = new URL('https://cors-proxy.datocms.com') // DatoCMS-provided CORS proxy
  apiUrl.searchParams.set('url', `https://${apiVersion}.deepl.com/v2/translate`) // Actual DeepL API endpoint

  // Make the API request
  const request = await fetch(apiUrl, {
    method: 'POST', // Note: DeepL will deprecate GET requests from March 2025: https://developers.deepl.com/docs/resources/breaking-changes-change-notices/march-2025-deprecating-get-requests-to-translate-and-authenticating-with-auth_key
    headers: {
      Authorization: `DeepL-Auth-Key ${options.apiKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params, // Form body is URL-encoded just like search params
  })

  if (request.status !== 200) {
    throw new Error(`DEEPL returned status ${request.status}`)
  }

  const response = await request.json()

  return response.translations
    .map((translation: any) => translation.text)
    .join(' ')
}
