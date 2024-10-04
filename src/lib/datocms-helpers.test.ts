import {
  structuredTextBlockSlate,
  structuredTextCodeSlate,
  structuredTextInlineItemSlate,
  structuredTextSlate,
} from '../mocks/structured-text-mock'
import { metaArray } from '../mocks/helper-mocks'
import { getValueType } from './datocms-helpers'
import { PathType } from './types'

describe('getValueType', () => {
  it('should return excluded when key is included in excluded key', () => {
    expect(getValueType('test', 'text', PathType.text, 'test')).toBe(
      PathType.exclude,
    )
  })
  it('should return excluded when key is included in comma separated list', () => {
    expect(getValueType('test', 'text', PathType.text, 'test, test2')).toBe(
      PathType.exclude,
    )
  })
  it('should return id when key is itemTypeId', () => {
    expect(getValueType('itemTypeId', 'text', PathType.text)).toBe(PathType.id)
  })
  it('should return id when key is itemId', () => {
    expect(getValueType('itemId', 'text', PathType.text)).toBe(PathType.id)
  })
  it('should return id when key is upload_id', () => {
    expect(getValueType('upload_id', 'text', PathType.text)).toBe(PathType.id)
  })
  it('should return id when key is id', () => {
    expect(getValueType('id', 'text', PathType.text)).toBe(PathType.id)
  })
  it('should return id when key is blockModelId', () => {
    expect(getValueType('blockModelId', 'text', PathType.text)).toBe(
      PathType.id,
    )
  })
  it('should return id when key is key', () => {
    expect(getValueType('key', 'text', PathType.text)).toBe(PathType.id)
  })
  it('should return slug when key is slug', () => {
    expect(getValueType('slug', 'text', PathType.text)).toBe(PathType.slug)
  })
  it('should return slug when key is url', () => {
    expect(getValueType('url', 'text', PathType.text)).toBe(PathType.slug)
  })
  it('should return meta when key is meta', () => {
    expect(getValueType('meta', metaArray, PathType.meta)).toBe(PathType.meta)
  })
  it('should return meta when current key is meta', () => {
    expect(getValueType('value', '_blank', PathType.meta)).toBe(PathType.meta)
  })
  it('should return boolean when value is boolean', () => {
    expect(getValueType('boolean', true, PathType.text)).toBe(PathType.boolean)
  })
  it('should return markdown when value is markdown', () => {
    expect(getValueType('markdown', '## markdown', PathType.text)).toBe(
      PathType.markdown,
    )
  })
  it('should return html when value is html', () => {
    expect(getValueType('html', '<p>html</p>', PathType.text)).toBe(
      PathType.html,
    )
  })
  it('should return structured_text when value is a structured text slate', () => {
    expect(
      getValueType('structured_text', structuredTextSlate, PathType.text),
    ).toBe(PathType.structured_text)
  })
  it('should return structured_text_block when value is a block inside a structured text slate', () => {
    expect(
      getValueType(
        'structured_text_block',
        structuredTextBlockSlate,
        PathType.text,
      ),
    ).toBe(PathType.structured_text_block)
  })
  it('should return structured_text_inline_item when value is an inline item inside a structured text slate', () => {
    expect(
      getValueType(
        'structured_text_inline_item',
        structuredTextInlineItemSlate,
        PathType.text,
      ),
    ).toBe(PathType.structured_text_inline_item)
  })
  it('should return structured_text_code when value is a code block inside a structured text slate', () => {
    expect(
      getValueType(
        'structured_text_code',
        structuredTextCodeSlate,
        PathType.text,
      ),
    ).toBe(PathType.structured_text_code)
  })
  it('should return color when value is a color', () => {
    expect(
      getValueType(
        'color',
        { red: 0, green: 0, blue: 0, alpha: 0 },
        PathType.text,
      ),
    ).toBe(PathType.color)
  })
  it('should return media when value is a media', () => {
    expect(
      getValueType(
        'media',
        { upload_id: '1', focal_point: '1', alt: '' },
        PathType.text,
      ),
    ).toBe(PathType.media)
  })
  it('should return seo when value is a seo', () => {
    expect(
      getValueType(
        'seo',
        {
          title: 'title',
          description: 'description',
          image: '1',
          twitter_card: 'summary',
        },
        PathType.text,
      ),
    ).toBe(PathType.seo)
  })
  it('should return number when value is a number', () => {
    expect(getValueType('number', 1, PathType.text)).toBe(PathType.number)
  })
  it('should return date when value is a date', () => {
    expect(getValueType('date', '2021-01-01', PathType.text)).toBe(
      PathType.date,
    )
  })
  it('should return json when value is json string', () => {
    expect(getValueType('json string', '["test","test"]', PathType.text)).toBe(
      PathType.json,
    )
  })
  it('should return text when value is string', () => {
    expect(getValueType('text', 'text', PathType.text)).toBe(PathType.text)
  })
})
