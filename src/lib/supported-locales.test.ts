import {
  getSupportedFromLocale,
  getSupportedToLocale,
} from './supported-locales'
import { TranslationService } from './types'

describe('getSupportedFromLocale', () => {
  describe('deepl', () => {
    it('should return single locale if en-us', () => {
      expect(getSupportedFromLocale('en-us', TranslationService.deepl)).toBe(
        'EN'
      )
    })
    it('should return single locale if en', () => {
      expect(getSupportedFromLocale('en-us', TranslationService.deepl)).toBe(
        'EN'
      )
    })
    it('should return single locale if pt-pt', () => {
      expect(getSupportedFromLocale('pt-pt', TranslationService.deepl)).toBe(
        'PT'
      )
    })
    it('should return empty string if locale does not exist', () => {
      expect(getSupportedFromLocale('yi', TranslationService.deepl)).toBe('')
    })
  })

  describe('deeplFree', () => {
    it('should return single locale if en-us', () => {
      expect(
        getSupportedFromLocale('en-us', TranslationService.deeplFree)
      ).toBe('EN')
    })
    it('should return single locale if en', () => {
      expect(
        getSupportedFromLocale('en-us', TranslationService.deeplFree)
      ).toBe('EN')
    })
    it('should return single locale if pt-pt', () => {
      expect(
        getSupportedFromLocale('pt-pt', TranslationService.deeplFree)
      ).toBe('PT')
    })
    it('should return empty string if locale does not exist', () => {
      expect(getSupportedFromLocale('yi', TranslationService.deeplFree)).toBe(
        ''
      )
    })
  })

  describe('yandex', () => {
    it('should return single locale if en-us', () => {
      expect(getSupportedFromLocale('en-us', TranslationService.yandex)).toBe(
        'en'
      )
    })
    it('should return single locale if EN', () => {
      expect(getSupportedFromLocale('EN', TranslationService.yandex)).toBe('en')
    })
    it('should return empty string if locale does not exist', () => {
      expect(getSupportedFromLocale('ab', TranslationService.deeplFree)).toBe(
        ''
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
        'PT-PT'
      )
    })
    it('should return double locale if pt-br', () => {
      expect(getSupportedToLocale('pt-br', TranslationService.deepl)).toBe(
        'PT-BR'
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
        'BLA-BLA'
      )
    })
  })

  describe('deeplFree', () => {
    it('should return double locale if en', () => {
      expect(getSupportedToLocale('en', TranslationService.deeplFree)).toBe(
        'EN-US'
      )
    })
    it('should return double locale if pt', () => {
      expect(getSupportedToLocale('pt', TranslationService.deeplFree)).toBe(
        'PT-PT'
      )
    })
    it('should return double locale if pt-pt', () => {
      expect(getSupportedToLocale('pt-pt', TranslationService.deeplFree)).toBe(
        'PT-PT'
      )
    })
    it('should return double locale if pt-br', () => {
      expect(getSupportedToLocale('pt-br', TranslationService.deeplFree)).toBe(
        'PT-BR'
      )
    })
    it('should return single locale if nl', () => {
      expect(getSupportedToLocale('nl', TranslationService.deeplFree)).toBe(
        'NL'
      )
    })
    it('should return single locale if nl-be', () => {
      expect(getSupportedToLocale('nl-be', TranslationService.deeplFree)).toBe(
        'NL'
      )
    })
    it('should return locale if locale does not exist', () => {
      expect(
        getSupportedToLocale('bla-bla', TranslationService.deeplFree)
      ).toBe('BLA-BLA')
    })
  })

  describe('yandex', () => {
    it('should return single locale if en-us', () => {
      expect(getSupportedToLocale('en-us', TranslationService.yandex)).toBe(
        'en'
      )
    })
    it('should return single locale if EN', () => {
      expect(getSupportedToLocale('EN', TranslationService.yandex)).toBe('en')
    })
    it('should return locale if locale does not exist', () => {
      expect(getSupportedToLocale('ab', TranslationService.yandex)).toBe(
        'ab'
      )
    })
  })
})
