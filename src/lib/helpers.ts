import { isEmptyDocument } from 'datocms-structured-text-utils'
import { slateToDast } from 'datocms-structured-text-slate-utils'
import { Path, TranslationFormat, Editor, PathType } from './types'
import { translationFormats } from './constants'
import { markdownRegexesArray, htmlRegex } from './regexes'

export function makeObject(array: any[], arrayKey: string): any {
  return array.reduce((acc: any, item: any, index: number) => {
    if (arrayKey in item) {
      return {
        ...acc,
        [index]: {
          ...item,
          [arrayKey]: makeObject(item[arrayKey], arrayKey),
        },
      }
    }
    return { ...acc, [index]: item }
  }, {})
}

export function makeArray(object: any, objectKey: string): any[] {
  return Object.keys(object).reduce((acc: any[], key: string) => {
    if (objectKey in object[key]) {
      acc.push({
        ...object[key],
        [objectKey]: makeArray(object[key][objectKey], objectKey),
      })
      return acc
    }
    acc.push(object[key])
    return acc
  }, [])
}

export function paths(
  object: any,
  prev = '',
  type: PathType = PathType.text
): Path[] {
  if (object) {
    return Object.keys(object).reduce((acc: any[], key: string) => {
      const path = `${prev}${prev ? `.${key}` : key}`
      const value = object[key]
      let valueType = getValueType(key, value, type)

      if (
        valueType !== PathType.structured_text &&
        valueType !== PathType.color &&
        valueType !== PathType.media &&
        valueType !== PathType.seo &&
        typeof value === 'object'
      ) {
        acc.push(...paths(value, path, valueType))
      } else {
        acc.push({
          path,
          value,
          key,
          type: valueType,
        })
      }

      return acc
    }, [])
  }

  return []
}

export function getValueType(
  key: string,
  value: any,
  currentType: PathType
): PathType {
  if (
    key === 'itemTypeId' ||
    key === 'itemId' ||
    key === 'upload_id' ||
    key === 'id'
  ) {
    return PathType.id
  }

  if (key === 'slug' || key === 'url') {
    return PathType.slug
  }

  if (isJsonString(value)) {
    return PathType.json
  }

  if (typeof value === 'boolean') {
    return PathType.boolean
  }

  if (markdownRegexesArray.some((regex) => regex.test(value))) {
    return PathType.markdown
  }

  if (htmlRegex.test(value)) {
    return PathType.html
  }

  if (
    currentType === PathType.text &&
    Array.isArray(value) &&
    typeof value[0] === 'object' &&
    isStructuredTextSlate(value[0])
  ) {
    return PathType.structured_text
  }

  if (
    currentType === PathType.text &&
    typeof value === 'object' &&
    isColor(value)
  ) {
    return PathType.color
  }

  if (
    currentType === PathType.text &&
    typeof value === 'object' &&
    isImage(value)
  ) {
    return PathType.media
  }

  if (
    currentType === PathType.text &&
    typeof value === 'object' &&
    isSeo(value)
  ) {
    return PathType.seo
  }

  if (
    currentType !== PathType.color &&
    currentType !== PathType.structured_text &&
    currentType !== PathType.media &&
    currentType !== PathType.seo &&
    !isNaN(Date.parse(value))
  ) {
    return PathType.date
  }

  if (
    currentType !== PathType.color &&
    currentType !== PathType.structured_text &&
    currentType !== PathType.media &&
    currentType !== PathType.seo &&
    Number(value)
  ) {
    return PathType.number
  }

  return currentType
}

export function removePropertyFromArrayRecursively(
  value: any,
  propertyNames: string[]
): any {
  if (Array.isArray(value)) {
    return value.map((item: any) =>
      removePropertyFromArrayRecursively(item, propertyNames)
    )
  }

  if (typeof value === 'object' && value !== null) {
    const newObj: any = {}
    for (const [key, val] of Object.entries(value)) {
      if (!propertyNames.includes(key)) {
        newObj[key] = removePropertyFromArrayRecursively(val, propertyNames)
      }
    }
    return newObj
  }

  return value
}

export function isStructuredTextSlate(value: any): boolean {
  return (
    Boolean(value) &&
    !Array.isArray(value) &&
    Object.keys(value).length === 2 &&
    'children' in value &&
    'type' in value
  )
}

export function isImage(value: any): boolean {
  return (
    Boolean(value) &&
    !Array.isArray(value) &&
    'upload_id' in value &&
    'focal_point' in value &&
    'alt' in value
  )
}

export function isColor(value: any): boolean {
  return (
    Boolean(value) &&
    !Array.isArray(value) &&
    Object.keys(value).length === 4 &&
    'alpha' in value &&
    'blue' in value &&
    'green' in value &&
    'red' in value
  )
}

export function isSeo(value: any): boolean {
  return (
    Boolean(value) &&
    !Array.isArray(value) &&
    Object.keys(value).length === 4 &&
    'description' in value &&
    'image' in value &&
    'title' in value &&
    'twitter_card' in value
  )
}

export function isJsonString(value: any): boolean {
  try {
    JSON.parse(value)
  } catch (e) {
    return false
  }
  return true
}

export function structuredTextValueToDast(fieldValue: any, ctx: any) {
  const itemTypes: Record<string, any[]> = Object.values(ctx.itemTypes).reduce(
    (acc: Record<string, any[]>, itemType: any) => {
      const itemTypeFields = itemType.relationships.fields.data.map(
        (item: { id: string }) => {
          return ctx.fields[item.id]
        }
      )
      return { ...acc, [itemType.id]: [...itemTypeFields] }
    },
    {}
  )
  return slateToDast(fieldValue, itemTypes)
}

export function fieldHasFieldValue(fieldValue: any, ctx: any): boolean {
  const editor: Editor = ctx.field.attributes.appeareance?.editor as Editor
  const translationFormat: TranslationFormat = translationFormats[editor]
  switch (translationFormat) {
    case TranslationFormat.seo: {
      return Boolean(fieldValue?.title) || Boolean(fieldValue?.description)
    }
    case TranslationFormat.structuredText: {
      const dast = structuredTextValueToDast(fieldValue, ctx)
      return !isEmptyDocument(dast)
    }
    case TranslationFormat.richText: {
      return fieldValue.length > 0
    }
    default: {
      return Boolean(fieldValue)
    }
  }
}
