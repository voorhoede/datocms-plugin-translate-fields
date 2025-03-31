import fetchMock from 'jest-fetch-mock'
import { getTranslation } from './translation'
import { TranslationFormat, TranslationService } from './types'

const tranlationOptions = {
  fromLocale: 'nl',
  toLocale: 'en',
  format: TranslationFormat.plain,
  translationService: TranslationService.mock,
  apiKey: '',
  openAIOptions: {
    model: 'text-davinci-003',
    temperature: 0,
    maxTokens: 100,
    topP: 0,
    prompt:
      "Translate the following from the locale '{{fromLocale}}' to the locale '{{toLocale}}': {{value}}",
  },
}

const translatedText = 'Translated test'

describe('getTranslation', () => {
  it('should return translation', async () => {
    const translation = await getTranslation('test', tranlationOptions)
    expect(translation).toStrictEqual(translatedText)
  })

  it('should return translation with yandex response', async () => {
    fetchMock.mockOnce(JSON.stringify({ text: [translatedText] }))
    expect.assertions(1)

    const translation = await getTranslation('test', {
      ...tranlationOptions,
      translationService: TranslationService.yandex,
    })
    expect(translation).toStrictEqual(translatedText)
  })

  it('should return translation with deepl response', async () => {
    fetchMock.mockOnce(
      JSON.stringify({ translations: [{ text: translatedText }] }),
    )

    const translation = await getTranslation('test', {
      ...tranlationOptions,
      translationService: TranslationService.deepl,
    })
    expect(translation).toStrictEqual(translatedText)
  })

  it('should return translation with deepl free response', async () => {
    fetchMock.mockOnce(
      JSON.stringify({ translations: [{ text: translatedText }] }),
    )

    const translation = await getTranslation('test', {
      ...tranlationOptions,
      translationService: TranslationService.deeplFree,
    })
    expect(translation).toStrictEqual(translatedText)
  })

  it('should return translation with openAI response', async () => {
    fetchMock.mockOnce(
      JSON.stringify({
        choices: [{ message: { content: translatedText } }],
      }),
    )

    const translation = await getTranslation('test', {
      ...tranlationOptions,
      translationService: TranslationService.openAI,
    })
    expect(translation).toStrictEqual(translatedText)
  })

  it('should return translation with yandex response', async () => {
    fetchMock.mockOnce(JSON.stringify({ text: [translatedText] }))
    await expect(() =>
      getTranslation('test', {
        ...tranlationOptions,
        translationService: 'test' as TranslationService,
      }),
    ).rejects.toThrow('No translation service added in the settings')
  })
})
