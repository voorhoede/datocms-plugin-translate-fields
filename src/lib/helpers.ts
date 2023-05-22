import { isEmptyDocument } from 'datocms-structured-text-utils'
import { slateToDast } from 'datocms-structured-text-slate-utils'
import { Path, TranslationFormat, Editor, PathType } from './types'
import { translationFormats } from './constants'
import { pathTypeIsObject, getValueType } from './datocms-helpers'

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
        pathTypeIsObject.indexOf(valueType) === -1 &&
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
  const editor: Editor = ctx.field.attributes.appearance?.editor as Editor
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
