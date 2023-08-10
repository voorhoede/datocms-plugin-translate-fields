import { TranslationOptions } from '../types'

export default async function translate(
  string: string,
  options: TranslationOptions,
): Promise<string> {
  const params = new URLSearchParams()

  params.set('key', options.apiKey)
  params.set(
    'lang',
    options.fromLocale
      ? `${options.fromLocale}-${options.toLocale}`
      : options.toLocale,
  )
  params.set('format', 'plain')
  params.set('text', string)

  const request = await fetch(
    `https://translate.yandex.net/api/v1.5/tr.json/translate?${params.toString()}`,
  )

  if (request.status !== 200) {
    throw new Error(`Yandex returned status ${request.status}`)
  }

  const response = await request.json()
  return response.text.join(' ')
}
