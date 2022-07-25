import set from 'lodash/set'
import get from 'lodash/get'
import {
  TranslationOptions,
  PathTranslationOptions,
  Path,
  TranslationService
} from './types'
import { makeObject, paths, makeArray } from './helpers'
import {
  yandex as yandexSupportedLocales,
  deepl as deeplSupportedLocales
} from './supportedLocales'

import { fromMarkdown } from 'mdast-util-from-markdown'
import { toMarkdown } from 'mdast-util-to-markdown'

const parseHtml = require('html2json')

export async function getTranslation(string: string, options: TranslationOptions): Promise<string> {
  const params = new URLSearchParams()

  switch (options.translationService) {
    case TranslationService.yandex: {
      params.set('key', options.apiKey)
      params.set('lang', options.toLocale)
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
    case TranslationService.deepl:
    case TranslationService.deeplFree: {
      params.set('auth_key', options.apiKey)
      params.set('target_lang', options.toLocale)
      params.set('tag_handling', 'xml')
      params.set('text', string)

      const apiVersion =
        options.translationService === TranslationService.deeplFree
          ? 'api-free'
          : 'api'

      const request = await fetch(
        `https://${apiVersion}.deepl.com/v2/translate?${params.toString()}`,
      )

      if (request.status !== 200) {
        throw new Error(`DEEPL returned status ${request.status}`)
      }

      const response = await request.json()

      return response.translations
        .map((translation: any) => translation.text)
        .join(' ')
    }
    default: {
      throw new Error('No translation service added in the settings')
    }
  }
}

export async function getStructuredTextTranslation(value: any[], options: TranslationOptions): Promise<any[]> {
  const filteredArray = value.filter(item => item.type !== 'block')
  const filteredObject = makeObject(filteredArray, 'children')
  const allPaths = paths(filteredObject)

  const translatedArray = await getTranslationPerPath(
    value,
    {
      ...options,
      arrayKey: 'children',
      translatingKey: 'text',
      paths: allPaths,
    }
  )
  return translatedArray
}

export async function getHtmlTranslation(string: string, options: TranslationOptions): Promise<string> {
  const json = parseHtml.html2json(string)
  const translatedArray = await getTranslationPerPath(
    json.child,
    {
      ...options,
      arrayKey: 'child',
      translatingKey: 'text'
    }
  )
  const html = parseHtml.json2html({ ...json, child: translatedArray })
  return html
}

export async function getMarkdownTranslation(string: string, options: TranslationOptions): Promise<string> {
  const json = fromMarkdown(string)
  const translatedArray = await getTranslationPerPath(
    json.children,
    {
      ...options,
      arrayKey: 'children',
      translatingKey: 'value'
    }
  )
  const md = toMarkdown({ ...json, children: translatedArray })
  return md
}

export async function getTranslationPerPath(array: any[], options: PathTranslationOptions): Promise<any[]> {
  const jsonObject = makeObject(array, options.arrayKey)
  const allPaths: Path[] = options.paths ? options.paths : paths(jsonObject)

  for (const pathObject of allPaths) {
    const fullPath = pathObject.path
    if (pathObject.key === options.translatingKey && pathObject.value.trim()) {
      const currentString = get(jsonObject, fullPath)
      if (currentString) {
        const translatedString = await getTranslation(currentString, options)
        set(jsonObject, fullPath, translatedString)
      }
    }
  }

  const translatedArray = makeArray(jsonObject, options.arrayKey)
  return translatedArray
}

export function getSupportedLocale(locale: string, translationService: TranslationService): string {
  const localeLower = locale.toLowerCase()
  const localeStart = localeLower.indexOf('-') > 0 ? localeLower.substring(0, localeLower.indexOf('-')) : localeLower

  switch (translationService) {
    case TranslationService.yandex: {
      if (yandexSupportedLocales.includes(localeStart)) {
        return localeStart
      }
      break
    }
    case TranslationService.deepl:
    case TranslationService.deeplFree: {
      switch (localeLower) {
        case 'en':
          return 'EN-US'
        case 'pt':
          return 'PT-PT'
        case 'en-us':
        case 'en-gb':
        case 'pt-pt':
        case 'pt-br':
          return localeLower.toUpperCase()
        default:  break
      }

      if (deeplSupportedLocales.includes(localeStart)) {
        return localeStart.toUpperCase()
      }

      break
    }
  }

  return locale
}
