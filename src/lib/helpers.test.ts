import {
  paths,
  removePropertyRecursively,
  isJsonString,
  structuredTextValueToDast,
  fieldHasFieldValue,
} from './helpers'
import {
  structuredTextDast,
  structuredTextSlate,
  emptyStructuredTextSlate,
} from '../mocks/structured-text-mock'
import { array, object, jsonString, datoCmsCtx } from '../mocks/helper-mocks'

import { Editor } from './types'

describe('paths', () => {
  it('should return paths from array', () => {
    const result = [
      { path: '0.id', value: '1', key: 'id', type: 'id' },
      { path: '0.test', value: 'test', key: 'test', type: 'text' },
      { path: '0.text', value: 'text', key: 'text', type: 'text' },
      { path: '1.id', value: '2', key: 'id', type: 'id' },
      { path: '1.test', value: 'test', key: 'test', type: 'text' },
      { path: '1.children.0.id', value: '2-1', key: 'id', type: 'id' },
      {
        path: '1.children.0.test',
        value: 'test',
        key: 'test',
        type: 'text',
      },
      {
        path: '1.children.0.text',
        value: 'text',
        key: 'text',
        type: 'text',
      },
    ]
    expect(paths(array)).toStrictEqual(result)
  })

  it('should return paths from object', () => {
    const result = [
      { path: 'id', value: '1', key: 'id', type: 'id' },
      { path: 'test', value: 'test', key: 'test', type: 'text' },
      { path: 'text', value: 'text', key: 'text', type: 'text' },
    ]
    expect(paths(object)).toStrictEqual(result)
  })
})

describe('removePropertyRecursively', () => {
  it('should remove properties from array', () => {
    const result = [
      {
        text: 'text',
      },
      {
        children: [
          {
            text: 'text',
          },
        ],
      },
    ]
    expect(removePropertyRecursively(array, ['test', 'id'])).toStrictEqual(
      result
    )
  })

  it('should remove properties from object', () => {
    const result = {
      text: 'text',
    }
    expect(removePropertyRecursively(object, ['test', 'id'])).toStrictEqual(
      result
    )
  })
})

describe('isJsonString', () => {
  it('should return false if not a json string', () => {
    expect(isJsonString('test')).toBeFalsy()
  })
  it('should return true if json string', () => {
    expect(isJsonString(jsonString)).toBeTruthy()
  })
})

describe('structuredTextValueToDast', () => {
  it('should convert slate to dast', () => {
    expect(
      structuredTextValueToDast(structuredTextSlate, datoCmsCtx)
    ).toStrictEqual(structuredTextDast)
  })
})

describe('fieldHasFieldValue', () => {
  it('should return true if field has string value', () => {
    expect(fieldHasFieldValue('test', datoCmsCtx)).toBeTruthy()
  })

  it('should return false if field has no string value', () => {
    expect(fieldHasFieldValue('', datoCmsCtx)).toBeFalsy()
  })

  it('should return true if field has seo value', () => {
    const extendedDatoCmsCtx = {
      ...datoCmsCtx,
      editor: Editor.seo,
    }
    expect(
      fieldHasFieldValue(
        {
          title: 'test',
          description: 'test',
        },
        extendedDatoCmsCtx
      )
    ).toBeTruthy()
  })

  it('should return false if field has no seo value', () => {
    const extendedDatoCmsCtx = {
      ...datoCmsCtx,
      editor: Editor.seo,
    }
    expect(fieldHasFieldValue({}, extendedDatoCmsCtx)).toBeFalsy()
  })

  it('should return true if field has structured text value', () => {
    const extendedDatoCmsCtx = {
      ...datoCmsCtx,
      editor: Editor.structuredText,
    }
    expect(
      fieldHasFieldValue(structuredTextSlate, extendedDatoCmsCtx)
    ).toBeTruthy()
  })

  it('should return false if field has no structured text value', () => {
    const extendedDatoCmsCtx = {
      ...datoCmsCtx,
      editor: Editor.structuredText,
    }
    expect(
      fieldHasFieldValue(emptyStructuredTextSlate, extendedDatoCmsCtx)
    ).toBeFalsy()
  })

  it('should return true if field has rich text value', () => {
    const extendedDatoCmsCtx = {
      ...datoCmsCtx,
      editor: Editor.richText,
    }
    expect(fieldHasFieldValue([{ id: '1' }], extendedDatoCmsCtx)).toBeTruthy()
  })

  it('should return false if field has no rich text value', () => {
    const extendedDatoCmsCtx = {
      ...datoCmsCtx,
      editor: Editor.richText,
    }
    expect(fieldHasFieldValue([], extendedDatoCmsCtx)).toBeFalsy()
  })
})
