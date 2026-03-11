import { TranslationService } from './types'
import {
  yandex as yandexSupportedLocales,
  deeplTo as deeplSupportedToLocales,
  deeplFrom as deeplSupportedFromLocales,
  supertextFrom as supertextSupportedFromLocales,
  supertextTo as supertextSupportedToLocales,
} from './supported-locales'

export function getSupportedToLocale(
  locale: string,
  translationService: TranslationService,
): string {
  const localeLower = locale.toLowerCase()
  const indexOfDash = localeLower.indexOf('-')
  const localeStart =
    indexOfDash > 0 ? localeLower.substring(0, indexOfDash) : localeLower

  switch (translationService) {
    case TranslationService.yandex: {
      return localeStart
    }
    case TranslationService.deepl:
    case TranslationService.deeplFree: {
      switch (localeLower) {
        case 'en':
          return 'EN-US'
        case 'en-eu':
          return 'EN-GB'
        case 'en-ie':
          return 'EN-GB'
        case 'pt':
          return 'PT-PT'
        default:
          break
      }

      if (
        deeplSupportedToLocales
          .map((deeplLocale) => deeplLocale.toLowerCase())
          .includes(localeStart)
      ) {
        return localeStart.toUpperCase()
      }

      return locale.toUpperCase()
    }
    case TranslationService.supertext: {
      if (supertextSupportedToLocales.includes(locale)) {
        return locale
      }

      if (supertextSupportedToLocales.includes(localeStart)) {
        return localeStart
      }

      switch (localeStart) {
        case 'en':
          return 'en-US'
        case 'de':
          return 'de-DE'
        case 'fr':
          return 'fr-FR'
        case 'it':
          return 'it-IT'
        case 'pt':
          return 'pt-PT'
        case 'sr':
          return 'sr-Latn'
        case 'zh':
          return 'zh-Hans'
        default:
          break
      }
    }
  }

  return locale
}

export function getSupportedFromLocale(
  locale: string,
  translationService: TranslationService,
): string {
  const localeLower = locale.toLowerCase()
  const indexOfDash = localeLower.indexOf('-')
  const localeStart =
    indexOfDash > 0 ? localeLower.substring(0, indexOfDash) : localeLower

  switch (translationService) {
    case TranslationService.yandex: {
      if (yandexSupportedLocales.includes(localeStart)) {
        return localeStart
      }

      return ''
    }
    case TranslationService.deepl:
    case TranslationService.deeplFree: {
      if (
        deeplSupportedFromLocales
          .map((deeplLocale) => deeplLocale.toLowerCase())
          .includes(localeStart)
      ) {
        return localeStart.toUpperCase()
      }

      return ''
    }
    case TranslationService.supertext: {
      if (
        supertextSupportedFromLocales
          .map((supertextLocale) => supertextLocale.toLowerCase())
          .includes(localeStart)
      ) {
        return localeStart
      }

      return ''
    }
  }

  return locale
}

export const deeplTo = [
  'BG',
  'CS',
  'DA',
  'DE',
  'EL',
  'EN-GB',
  'EN-US',
  'ES',
  'ET',
  'FI',
  'FR',
  'HU',
  'ID',
  'IT',
  'JA',
  'KO',
  'LT',
  'LV',
  'NB',
  'NL',
  'PL',
  'PT-BR',
  'PT-PT',
  'RO',
  'RU',
  'SK',
  'SL',
  'SV',
  'TR',
  'UK',
  'ZH',
]

export const deeplFrom = [
  'BG',
  'CS',
  'DA',
  'DE',
  'EL',
  'EN',
  'ES',
  'ET',
  'FI',
  'FR',
  'HU',
  'ID',
  'IT',
  'JA',
  'KO',
  'LT',
  'LV',
  'NB',
  'NL',
  'PL',
  'PT',
  'RO',
  'RU',
  'SK',
  'SL',
  'SV',
  'TR',
  'UK',
  'ZH',
]

export const yandex = [
  'af',
  'am',
  'ar',
  'az',
  'ba',
  'be',
  'bg',
  'bn',
  'bs',
  'ca',
  'ceb',
  'cs',
  'cy',
  'da',
  'de',
  'el',
  'en',
  'eo',
  'es',
  'et',
  'eu',
  'fa',
  'fi',
  'fr',
  'ga',
  'gd',
  'gl',
  'gu',
  'he',
  'hi',
  'hr',
  'ht',
  'hu',
  'hy',
  'id',
  'is',
  'it',
  'ja',
  'jv',
  'ka',
  'kk',
  'km',
  'kn',
  'ko',
  'ky',
  'la',
  'lb',
  'lo',
  'lt',
  'lv',
  'mg',
  'mhr',
  'mi',
  'mk',
  'ml',
  'mn',
  'mr',
  'mrj',
  'ms',
  'mt',
  'my',
  'ne',
  'nl',
  'no',
  'pa',
  'pap',
  'pl',
  'pt',
  'ro',
  'ru',
  'si',
  'sk',
  'sl',
  'sq',
  'sr',
  'su',
  'sv',
  'sw',
  'ta',
  'te',
  'tg',
  'th',
  'tl',
  'tr',
  'tt',
  'udm',
  'uk',
  'ur',
  'uz',
  'vi',
  'xh',
  'yi',
  'zh',
]

export const supertextFrom = [
  'bg',
  'cs',
  'da',
  'de',
  'el',
  'en',
  'es',
  'fi',
  'fr',
  'gsw',
  'hr',
  'hu',
  'it',
  'ja',
  'ko',
  'nb',
  'nl',
  'pl',
  'pt',
  'rm',
  'ru',
  'sk',
  'sl',
  'sq',
  'sr',
  'sv',
  'tr',
  'zh',
]

export const supertextTo = [
  'bg',
  'cs',
  'da',
  'de-AT',
  'de-CH',
  'de-DE',
  'el',
  'en-GB',
  'en-US',
  'es',
  'fi',
  'fr-CH',
  'fr-FR',
  'gsw-u-sd-chbe',
  'gsw-u-sd-chzh',
  'hr',
  'hu',
  'it-CH',
  'it-IT',
  'ja',
  'ko',
  'nb',
  'nl',
  'pl',
  'pt-BR',
  'pt-PT',
  'rm',
  'ru',
  'sk',
  'sl',
  'sq',
  'sr-Cyrl',
  'sr-Latn',
  'sv',
  'tr',
  'zh-Hans',
  'zh-Hant',
]
