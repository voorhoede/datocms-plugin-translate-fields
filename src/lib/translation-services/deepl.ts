import {
  DeeplFormalityLevel,
  TranslationOptions,
  TranslationService,
} from '../types'

export default async function translate(
  string: string,
  options: TranslationOptions
): Promise<string> {
  const params = new URLSearchParams()

  params.set('auth_key', options.apiKey)
  params.set('target_lang', options.toLocale)
  params.set('tag_handling', 'xml')
  params.set('text', string)

  if (options.fromLocale) {
    params.set('source_lang', options.fromLocale)
  }

  if (options.deeplOptions?.glossaryId) {
    params.set('glossary_id', options.deeplOptions.glossaryId)
  }

  if (
    options.deeplOptions?.formality &&
    options.deeplOptions?.formality !== DeeplFormalityLevel.default
  ) {
    params.set('formality', options.deeplOptions?.formality)
  }

  const apiVersion =
    options.translationService === TranslationService.deeplFree
      ? 'api-free'
      : 'api'

  const request = await fetch(
    `https://${apiVersion}.deepl.com/v2/translate?${params.toString()}`
  )

  if (request.status !== 200) {
    throw new Error(`DEEPL returned status ${request.status}`)
  }

  const response = await request.json()

  return response.translations
    .map((translation: any) => translation.text)
    .join(' ')
}
