import { pickBy, get, set } from 'lodash'

import {
  TranslationOptions,
  PathTranslationOptions,
  Path,
  TranslationService,
  PathType,
} from './types'
import {
  makeObject,
  paths,
  makeArray,
  removePropertyFromArrayRecursively,
} from './helpers'
import {
  yandex as yandexSupportedLocales,
  deepl as deeplSupportedLocales,
} from './supportedLocales'

import yandexTranslate from './translationServices/yandex'
import deeplTranslate from './translationServices/deepl'
import openAITranslate from './translationServices/openAI'

import { fromMarkdown } from 'mdast-util-from-markdown'
import { toMarkdown } from 'mdast-util-to-markdown'

const parseHtml = require('html2json')

export async function getTranslation(
  string: string,
  options: TranslationOptions
): Promise<string> {
  switch (options.translationService) {
    case TranslationService.yandex: {
      return yandexTranslate(string, options)
    }
    case TranslationService.deepl:
    case TranslationService.deeplFree: {
      return deeplTranslate(string, options)
    }
    case TranslationService.openAI: {
      return openAITranslate(string, options)
    }
    default: {
      throw new Error('No translation service added in the settings')
    }
  }
}

export async function getRichTextTranslation(
  value: any[],
  options: TranslationOptions
): Promise<any[]> {
  const mappedValue = removePropertyFromArrayRecursively(value, ['itemId'])
  const allPaths = paths(mappedValue)
  let translatedArray = mappedValue

  for (const path of allPaths) {
    if (path.type === PathType.text) {
      const currentPath = path.path
      const currentString = get(translatedArray, path.path)
      if (currentString) {
        const translatedString = await getTranslation(currentString, options)
        set(translatedArray, currentPath, translatedString)
      }
    }

    if (path.type === PathType.html) {
      const currentPath = path.path
      const currentString = get(translatedArray, path.path)
      if (currentString) {
        const translatedString = await getHtmlTranslation(
          currentString,
          options
        )
        set(translatedArray, currentPath, translatedString)
      }
    }

    if (path.type === PathType.markdown) {
      const currentPath = path.path
      const currentString = get(translatedArray, path.path)
      if (currentString) {
        const translatedString = await getMarkdownTranslation(
          currentString,
          options
        )
        set(translatedArray, currentPath, translatedString)
      }
    }

    if (path.type === PathType.structured_text) {
      const currentPath = path.path
      const currentArray = get(translatedArray, path.path)
      if (currentArray) {
        const translatedString = await getStructuredTextTranslation(
          currentArray,
          options
        )
        set(translatedArray, currentPath, translatedString)
      }
    }

    if (path.type === PathType.seo) {
      const currentPath = path.path
      const currentValue = get(translatedArray, path.path)
      if (currentValue) {
        const translatedString = await getSeoTranslation(currentValue, options)
        set(translatedArray, currentPath, translatedString)
      }
    }
  }

  return translatedArray
}

export async function getSeoTranslation(
  value: any,
  options: TranslationOptions
): Promise<any> {
  return {
    title: await getTranslation(value.title, options),
    description: await getTranslation(value.description, options),
    image: value?.image,
    twitter_card: value?.twitter_card,
  }
}

export async function getStructuredTextTranslation(
  value: any[],
  options: TranslationOptions
): Promise<any[]> {
  const filteredArray = value.map((item) =>
    item.type !== 'block' ? item : { type: 'block' }
  )
  const filteredObject = makeObject(filteredArray, 'children')
  const allPaths = paths(filteredObject)
  const translatedArray = await getTranslationPerPath(
    value.map((item) =>
      item.type === 'block' ? pickBy(item, (_, key) => key !== 'id') : item
    ),
    {
      ...options,
      arrayKey: 'children',
      translatingKey: 'text',
      paths: allPaths,
    }
  )
  return translatedArray
}

export async function getHtmlTranslation(
  string: string,
  options: TranslationOptions
): Promise<string> {
  const json = parseHtml.html2json(string)
  const translatedArray = await getTranslationPerPath(json.child, {
    ...options,
    arrayKey: 'child',
    translatingKey: 'text',
  })
  const html = parseHtml.json2html({ ...json, child: translatedArray })
  return html
}

export async function getMarkdownTranslation(
  string: string,
  options: TranslationOptions
): Promise<string> {
  const json = fromMarkdown(string)
  const translatedArray = await getTranslationPerPath(json.children, {
    ...options,
    arrayKey: 'children',
    translatingKey: 'value',
  })
  const md = toMarkdown({ ...json, children: translatedArray })
  return md
}

export async function getTranslationPerPath(
  array: any[],
  options: PathTranslationOptions
): Promise<any[]> {
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

export function getSupportedLocale(
  locale: string,
  translationService: TranslationService
): string {
  const localeLower = locale.toLowerCase()
  const localeStart =
    localeLower.indexOf('-') > 0
      ? localeLower.substring(0, localeLower.indexOf('-'))
      : localeLower

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
        default:
          break
      }

      if (deeplSupportedLocales.includes(localeStart)) {
        return localeStart.toUpperCase()
      }

      break
    }
  }

  return locale
}
