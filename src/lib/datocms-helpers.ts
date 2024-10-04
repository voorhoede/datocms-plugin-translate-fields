import { PathType } from './types'
import { isJsonString } from './helpers'
import { markdownRegexesArray, htmlRegex } from './regexes'

export const pathTypeIsObject = [
  PathType.structured_text,
  PathType.structured_text_block,
  PathType.structured_text_inline_item,
  PathType.structured_text_code,
  PathType.color,
  PathType.media,
  PathType.seo,
  PathType.meta,
]

export function isStructuredTextText(value: any): boolean {
  return (
    Boolean(value) &&
    !Array.isArray(value) &&
    ((Object.keys(value).length === 2 &&
      'children' in value &&
      'type' in value) ||
      (Object.keys(value).length === 3 &&
        'children' in value &&
        'type' in value &&
        'level' in value) ||
      (Object.keys(value).length === 3 &&
        'children' in value &&
        'type' in value &&
        'style' in value))
  )
}

export function isStructuredTextCode(value: any): boolean {
  return (
    Boolean(value) &&
    !Array.isArray(value) &&
    value.type === 'code' &&
    'children' in value
  )
}

export function isStructuredTextBlock(value: any): boolean {
  return (
    Boolean(value) &&
    !Array.isArray(value) &&
    value.type === 'block' &&
    'children' in value &&
    'blockModelId' in value
  )
}

export function isStructuredTextInlineItem(value: any): boolean {
  return (
    Boolean(value) &&
    !Array.isArray(value) &&
    value.type === 'inlineItem' &&
    'children' in value &&
    'item' in value &&
    'itemTypeId' in value
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

export function getValueType(
  key: string,
  value: any,
  currentType: PathType,
  excludedKeys?: string,
): PathType {
  if (excludedKeys) {
    const excludedKeysArray = excludedKeys.split(',').map((key) => key.trim())

    if (excludedKeysArray.includes(key)) {
      return PathType.exclude
    }
  }

  if (
    key === 'itemTypeId' ||
    key === 'itemId' ||
    key === 'upload_id' ||
    key === 'id' ||
    key === 'blockModelId' ||
    key === 'key'
  ) {
    return PathType.id
  }

  if (key === 'slug' || key === 'url') {
    return PathType.slug
  }

  if (key === 'meta') {
    return PathType.meta
  }

  if (typeof value === 'boolean') {
    return PathType.boolean
  }

  if (pathTypeIsObject.indexOf(currentType) === -1 && Number(value)) {
    return PathType.number
  }

  if (
    pathTypeIsObject.indexOf(currentType) === -1 &&
    !isNaN(Date.parse(value))
  ) {
    return PathType.date
  }

  if (isJsonString(value)) {
    return PathType.json
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
    isStructuredTextText(value[0])
  ) {
    return PathType.structured_text
  }

  if (
    currentType === PathType.text &&
    typeof value === 'object' &&
    isStructuredTextBlock(value)
  ) {
    return PathType.structured_text_block
  }

  if (
    currentType === PathType.text &&
    typeof value === 'object' &&
    isStructuredTextInlineItem(value)
  ) {
    return PathType.structured_text_inline_item
  }

  if (
    currentType === PathType.text &&
    typeof value === 'object' &&
    isStructuredTextCode(value)
  ) {
    return PathType.structured_text_code
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

  return currentType
}
