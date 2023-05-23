import { Field, ItemType } from 'datocms-plugin-sdk'
import { isEmptyDocument } from 'datocms-structured-text-utils'
import { slateToDast } from 'datocms-structured-text-slate-utils'

import { Path, TranslationFormat, Editor, PathType } from './types'
import { translationFormats } from './constants'
import { pathTypeIsObject, getValueType } from './datocms-helpers'

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

export function removePropertyRecursively(
  value: any,
  propertyNames: string[]
): any {
  if (Array.isArray(value)) {
    return value.map((item: any) =>
      removePropertyRecursively(item, propertyNames)
    )
  }

  if (typeof value === 'object' && value !== null) {
    const newObj: any = {}
    for (const [key, val] of Object.entries(value)) {
      if (!propertyNames.includes(key)) {
        newObj[key] = removePropertyRecursively(val, propertyNames)
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

type structuredTextFieldType = {
  itemTypes: Partial<Record<string, ItemType>>
  fields: Partial<Record<string, Field>>
}

interface ctxFieldsType extends structuredTextFieldType {
  editor: Editor
}

export function structuredTextValueToDast(
  fieldValue: any,
  structuredTextField: structuredTextFieldType
) {
  const itemTypes = Object.values(structuredTextField.itemTypes).reduce(
    (acc, itemType?: ItemType) => {
      if (!itemType?.relationships?.fields) return acc
      const itemTypeFields = itemType.relationships.fields.data.map(
        (item: { id: string }) => {
          return structuredTextField.fields[item.id]
        }
      )
      return { ...acc, [itemType.id]: [...itemTypeFields] }
    },
    {}
  )
  return slateToDast(fieldValue, itemTypes || {})
}

export function fieldHasFieldValue(
  fieldValue: any,
  ctxFields: ctxFieldsType
): boolean {
  const editor: Editor = ctxFields.editor as Editor
  const translationFormat: TranslationFormat = translationFormats[editor]
  switch (translationFormat) {
    case TranslationFormat.seo: {
      return Boolean(fieldValue?.title) || Boolean(fieldValue?.description)
    }
    case TranslationFormat.structuredText: {
      const dast = structuredTextValueToDast(fieldValue, ctxFields)
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
