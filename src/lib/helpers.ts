import { isEmptyDocument } from 'datocms-structured-text-utils'
import { slateToDast } from 'datocms-structured-text-slate-utils'
import { Path, TranslationFormat, Editor } from './types'
import { translationFormats } from './constants'

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
  type: Path['type'] = 'text'
): Path[] {
  if (object) {
    return Object.keys(object).reduce((acc: any[], key: string) => {
      const path = `${prev}${prev ? `.${key}` : key}`
      const value = object[key]
      let valueType = type
      if (
        valueType === 'text' &&
        Array.isArray(value) &&
        isStructuredTextSlate(value[0])
      ) {
        valueType = 'structured_text'
      }

      if (
        valueType === 'text' &&
        typeof value === 'object' &&
        isImageSlate(value)
      ) {
        valueType = 'media'
      }

      if (
        key === 'itemTypeId' ||
        key === 'itemId' ||
        key === 'upload_id' ||
        key === 'id'
      ) {
        valueType = 'id'
      }

      if (Number(value)) {
        valueType = 'number'
      }

      if (typeof value === 'object') {
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

export function isStructuredTextSlate(value: any): boolean {
  return Boolean(value) && 'children' in value && 'type' in value
}

export function isImageSlate(value: any): boolean {
  return (
    Boolean(value) &&
    'upload_id' in value &&
    'focal_point' in value &&
    'alt' in value
  )
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
