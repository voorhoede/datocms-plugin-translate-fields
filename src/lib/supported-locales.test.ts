import {
  getSupportedFromLocale,
  getSupportedToLocale,
} from './supported-locales'
import { TranslationService } from './types'

describe('getSupportedFromLocale', () => {
  describe('deepl', () => {
    it('should return single locale if en-us', () => {
      expect(getSupportedFromLocale('en-us', TranslationService.deepl)).toBe(
        'EN',
      )
    })
    it('should return single locale if en', () => {
      expect(getSupportedFromLocale('en', TranslationService.deepl)).toBe('EN')
    })
    it('should return single locale if pt-pt', () => {
      expect(getSupportedFromLocale('pt-pt', TranslationService.deepl)).toBe(
        'PT',
      )
    })
    it('should return empty string if locale does not exist', () => {
      expect(getSupportedFromLocale('yi', TranslationService.deepl)).toBe('')
    })
  })

  describe('deeplFree', () => {
    it('should return single locale if en-us', () => {
      expect(
        getSupportedFromLocale('en-us', TranslationService.deeplFree),
      ).toBe('EN')
    })
    it('should return single locale if en', () => {
      expect(getSupportedFromLocale('en', TranslationService.deeplFree)).toBe(
        'EN',
      )
    })
    it('should return single locale if pt-pt', () => {
      expect(
        getSupportedFromLocale('pt-pt', TranslationService.deeplFree),
      ).toBe('PT')
    })
    it('should return empty string if locale does not exist', () => {
      expect(getSupportedFromLocale('yi', TranslationService.deeplFree)).toBe(
        '',
      )
    })
  })

  describe('yandex', () => {
    it('should return single locale if en-us', () => {
      expect(getSupportedFromLocale('en-us', TranslationService.yandex)).toBe(
        'en',
      )
    })
    it('should return single locale if EN', () => {
      expect(getSupportedFromLocale('EN', TranslationService.yandex)).toBe('en')
    })
    it('should return empty string if locale does not exist', () => {
      expect(getSupportedFromLocale('ab', TranslationService.deeplFree)).toBe(
        '',
      )
    })
  })

  describe('supertext', () => {
    it('should return single locale if en-US', () => {
      expect(
        getSupportedFromLocale('en-US', TranslationService.supertext),
      ).toBe('en')
    })
    it('should return single locale if en', () => {
      expect(getSupportedFromLocale('en', TranslationService.supertext)).toBe(
        'en',
      )
    })
    it('should return single locale if pt-PT', () => {
      expect(
        getSupportedFromLocale('pt-PT', TranslationService.supertext),
      ).toBe('pt')
    })
    it('should return empty string if locale does not exist', () => {
      expect(getSupportedFromLocale('yi', TranslationService.supertext)).toBe(
        '',
      )
    })
  })
})

describe('getSupportedToLocale', () => {
  describe('deepl', () => {
    it('should return double locale if en', () => {
      expect(getSupportedToLocale('en', TranslationService.deepl)).toBe('EN-US')
    })
    it('should return double locale if pt', () => {
      expect(getSupportedToLocale('pt', TranslationService.deepl)).toBe('PT-PT')
    })
    it('should return double locale if pt-pt', () => {
      expect(getSupportedToLocale('pt-pt', TranslationService.deepl)).toBe(
        'PT-PT',
      )
    })
    it('should return double locale if pt-br', () => {
      expect(getSupportedToLocale('pt-br', TranslationService.deepl)).toBe(
        'PT-BR',
      )
    })
    it('should return single locale if nl', () => {
      expect(getSupportedToLocale('nl', TranslationService.deepl)).toBe('NL')
    })
    it('should return single locale if nl-be', () => {
      expect(getSupportedToLocale('nl-be', TranslationService.deepl)).toBe('NL')
    })
    it('should return locale if locale does not exist', () => {
      expect(getSupportedToLocale('bla-bla', TranslationService.deepl)).toBe(
        'BLA-BLA',
      )
    })
  })

  describe('deeplFree', () => {
    it('should return double locale if en', () => {
      expect(getSupportedToLocale('en', TranslationService.deeplFree)).toBe(
        'EN-US',
      )
    })
    it('should return double locale if pt', () => {
      expect(getSupportedToLocale('pt', TranslationService.deeplFree)).toBe(
        'PT-PT',
      )
    })
    it('should return double locale if pt-pt', () => {
      expect(getSupportedToLocale('pt-pt', TranslationService.deeplFree)).toBe(
        'PT-PT',
      )
    })
    it('should return double locale if pt-br', () => {
      expect(getSupportedToLocale('pt-br', TranslationService.deeplFree)).toBe(
        'PT-BR',
      )
    })
    it('should return single locale if nl', () => {
      expect(getSupportedToLocale('nl', TranslationService.deeplFree)).toBe(
        'NL',
      )
    })
    it('should return single locale if nl-be', () => {
      expect(getSupportedToLocale('nl-be', TranslationService.deeplFree)).toBe(
        'NL',
      )
    })
    it('should return locale if locale does not exist', () => {
      expect(
        getSupportedToLocale('bla-bla', TranslationService.deeplFree),
      ).toBe('BLA-BLA')
    })
  })

  describe('yandex', () => {
    it('should return single locale if en-us', () => {
      expect(getSupportedToLocale('en-us', TranslationService.yandex)).toBe(
        'en',
      )
    })
    it('should return single locale if EN', () => {
      expect(getSupportedToLocale('EN', TranslationService.yandex)).toBe('en')
    })
    it('should return locale if locale does not exist', () => {
      expect(getSupportedToLocale('ab', TranslationService.yandex)).toBe('ab')
    })
  })

  describe('supertext', () => {
    it('should return double locale if en', () => {
      expect(getSupportedToLocale('en', TranslationService.supertext)).toBe(
        'en-US',
      )
    })
    it('should return double locale if en-US', () => {
      expect(getSupportedToLocale('en-US', TranslationService.supertext)).toBe(
        'en-US',
      )
    })
    it('should return double locale if de', () => {
      expect(getSupportedToLocale('de', TranslationService.supertext)).toBe(
        'de-DE',
      )
    })
    it('should return double locale if de-DE', () => {
      expect(getSupportedToLocale('de-DE', TranslationService.supertext)).toBe(
        'de-DE',
      )
    })
    it('should return double locale if de-CH', () => {
      expect(getSupportedToLocale('de-CH', TranslationService.supertext)).toBe(
        'de-CH',
      )
    })
    it('should return double locale if pt', () => {
      expect(getSupportedToLocale('pt', TranslationService.supertext)).toBe(
        'pt-PT',
      )
    })
    it('should return double locale if pt-PT', () => {
      expect(getSupportedToLocale('pt-PT', TranslationService.supertext)).toBe(
        'pt-PT',
      )
    })
    it('should return double locale if pt-BR', () => {
      expect(getSupportedToLocale('pt-BR', TranslationService.supertext)).toBe(
        'pt-BR',
      )
    })
    it('should return single locale if nl', () => {
      expect(getSupportedToLocale('nl', TranslationService.supertext)).toBe(
        'nl',
      )
    })
    it('should return locale if locale does not exist', () => {
      expect(
        getSupportedToLocale('bla-bla', TranslationService.supertext),
      ).toBe('bla-bla')
    })
  })
})
