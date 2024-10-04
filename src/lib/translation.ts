import { get, set } from 'lodash'
import slugify from 'slugify'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { toMarkdown } from 'mdast-util-to-markdown'

import { TranslationOptions, Path, TranslationService, PathType } from './types'
import { paths, removePropertyRecursively } from './helpers'

import yandexTranslate from './translation-services/yandex'
import deeplTranslate from './translation-services/deepl'
import openAITranslate from './translation-services/openAI'

const parseHtml = require('html2json')

export async function getTranslation(
  string: string,
  options: TranslationOptions,
): Promise<string> {
  switch (options.translationService) {
    case TranslationService.mock: {
      return `Translated ${string}`
    }
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
  options: TranslationOptions,
): Promise<any[]> {
  const mappedValue = removePropertyRecursively(value, {
    keysToRemove: ['itemId'],
  })
  const allPaths = paths({
    object: mappedValue,
    excludedKeys: options.excludedKeys,
  })
  let translatedArray = mappedValue

  for (const path of allPaths) {
    if (path.type === PathType.text) {
      const currentPath = path.path
      const currentString = get(translatedArray, currentPath)
      if (currentString) {
        const translatedString = await getTranslation(currentString, options)
        set(translatedArray, currentPath, translatedString)
      }
    }

    if (path.type === PathType.html) {
      const currentPath = path.path
      const currentString = get(translatedArray, currentPath)
      if (currentString) {
        const translatedString = await getHtmlTranslation(
          currentString,
          options,
        )
        set(translatedArray, currentPath, translatedString)
      }
    }

    if (path.type === PathType.markdown) {
      const currentPath = path.path
      const currentString = get(translatedArray, currentPath)
      if (currentString) {
        const translatedString = await getMarkdownTranslation(
          currentString,
          options,
        )
        set(translatedArray, currentPath, translatedString)
      }
    }

    if (path.type === PathType.structured_text) {
      const currentPath = path.path
      const currentArray = get(translatedArray, currentPath)
      if (currentArray) {
        const translatedString = await getStructuredTextTranslation(
          currentArray,
          options,
        )
        set(translatedArray, currentPath, translatedString)
      }
    }

    if (path.type === PathType.structured_text_block) {
      const currentPath = path.path
      const currentObject: any = get(translatedArray, path.path)
      if (currentObject) {
        const translatedObject = await getRichTextTranslation(
          { ...currentObject, type: null, children: null },
          options,
        )
        set(translatedArray, currentPath, {
          ...translatedObject,
          type: currentObject.type,
          children: currentObject.children,
        })
      }
    }

    if (path.type === PathType.seo) {
      const currentPath = path.path
      const currentValue = get(translatedArray, currentPath)
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
  options: TranslationOptions,
): Promise<any> {
  return {
    title: value.title ? await getTranslation(value.title, options) : '',
    description: value.description
      ? await getTranslation(value.description, options)
      : '',
    image: value?.image,
    twitter_card: value?.twitter_card,
  }
}

export async function getStructuredTextTranslation(
  value: any[],
  options: TranslationOptions,
): Promise<any[]> {
  const mappedValue = removePropertyRecursively(value, {
    keysToRemove: ['id'],
    keysToSkip: ['meta'],
  })
  const allPaths = paths({
    object: mappedValue,
    excludedKeys: options.excludedKeys,
  })
  let translatedArray = mappedValue

  for (const path of allPaths) {
    if (path.type === PathType.text && path.key === 'text') {
      const currentPath = path.path
      const currentString = get(translatedArray, currentPath)
      if (currentString) {
        const translatedString = await getTranslation(currentString, options)
        set(translatedArray, currentPath, translatedString)
      }
    }

    if (path.type === PathType.structured_text) {
      const currentPath = path.path
      const currentArray = get(translatedArray, currentPath)
      if (currentArray) {
        const translatedString = await getStructuredTextTranslation(
          currentArray,
          options,
        )
        set(translatedArray, currentPath, translatedString)
      }
    }

    if (path.type === PathType.structured_text_block) {
      const currentPath = path.path
      const currentObject: any = get(translatedArray, path.path)
      if (currentObject) {
        const translatedObject = await getRichTextTranslation(
          { ...currentObject, type: null, children: null },
          options,
        )
        set(translatedArray, currentPath, {
          ...translatedObject,
          type: currentObject.type,
          children: currentObject.children,
        })
      }
    }
  }

  return translatedArray
}

export async function getHtmlTranslation(
  string: string,
  options: TranslationOptions,
): Promise<string> {
  const json = parseHtml.html2json(string)
  const allPaths: Path[] = paths({
    object: json.child,
    excludedKeys: options.excludedKeys,
  })
  let translatedArray = json.child

  for (const path of allPaths) {
    if (path.key === 'text') {
      const currentPath = path.path
      const currentString = get(translatedArray, currentPath)
      if (currentString) {
        const translatedString = await getTranslation(currentString, options)
        set(translatedArray, currentPath, translatedString)
      }
    }
  }

  const html = parseHtml.json2html({ ...json, child: translatedArray })
  return html
}

export async function getMarkdownTranslation(
  string: string,
  options: TranslationOptions,
): Promise<string> {
  const json = fromMarkdown(string)
  const allPaths: Path[] = paths({
    object: json.children,
    excludedKeys: options.excludedKeys,
  })
  let translatedArray = json.children

  for (const path of allPaths) {
    if (path.key === 'value') {
      const currentPath = path.path
      const currentString = get(translatedArray, currentPath)
      if (currentString) {
        const translatedString = await getTranslation(currentString, options)
        set(translatedArray, currentPath, translatedString)
      }
    }
  }

  const md = toMarkdown({ ...json, children: translatedArray })
  return md
}

export async function getSlugTranslation(
  string: string,
  options: TranslationOptions,
): Promise<string> {
  const deSlugifiedString = string.replace(/-/g, ' ')

  const translatedString = await getTranslation(deSlugifiedString, options)
  return slugify(translatedString, {
    lower: true,
    strict: true,
    locale: options.toLocale,
  })
}
