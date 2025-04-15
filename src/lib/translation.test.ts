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

const fetchMock = jest.fn()
const setFetchReturnValue = (value: unknown) => {
  fetchMock.mockReset()
  fetchMock.mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(value),
      status: 200,
    }),
  )
}
global.fetch = fetchMock

describe('getTranslation', () => {
  it('should return translation', async () => {
    const translation = await getTranslation('test', tranlationOptions)
    expect(translation).toStrictEqual(translatedText)
  })

  it('should return translation with yandex response', async () => {
    setFetchReturnValue({ text: [translatedText] })
    expect.assertions(1)

    const translation = await getTranslation('test', {
      ...tranlationOptions,
      translationService: TranslationService.yandex,
    })
    expect(translation).toStrictEqual(translatedText)
  })

  it('should return translation with deepl response', async () => {
    setFetchReturnValue({ translations: [{ text: translatedText }] })

    const translation = await getTranslation('test', {
      ...tranlationOptions,
      translationService: TranslationService.deepl,
    })
    expect(translation).toStrictEqual(translatedText)
  })

  it('should return translation with deepl free response', async () => {
    setFetchReturnValue({ translations: [{ text: translatedText }] })

    const translation = await getTranslation('test', {
      ...tranlationOptions,
      translationService: TranslationService.deeplFree,
    })
    expect(translation).toStrictEqual(translatedText)
  })

  it('should return translation with openAI response', async () => {
    setFetchReturnValue({
      choices: [{ message: { content: translatedText } }],
    })

    const translation = await getTranslation('test', {
      ...tranlationOptions,
      translationService: TranslationService.openAI,
    })
    expect(translation).toStrictEqual(translatedText)
  })

  it('should return translation with yandex response', async () => {
    setFetchReturnValue({ text: [translatedText] })
    await expect(() =>
      getTranslation('test', {
        ...tranlationOptions,
        translationService: 'test' as TranslationService,
      }),
    ).rejects.toThrow('No translation service added in the settings')
  })
})
