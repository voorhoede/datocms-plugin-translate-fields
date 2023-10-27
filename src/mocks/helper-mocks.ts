import { Editor } from '../lib/types'

export const metaArray = [
  {
    id: 'target',
    value: '_blank',
  },
]

export const array = [
  {
    id: '1',
    test: 'test',
    text: 'text',
  },
  {
    id: '2',
    test: 'test',
    children: [
      {
        id: '2-1',
        test: 'test',
        text: 'text',
        meta: metaArray,
      },
    ],
  },
]

export const arrayPaths = [
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
  {
    path: '1.children.0.meta',
    value: metaArray,
    key: 'meta',
    type: 'meta',
  },
]

export const arrayRemovedProperties = [
  {
    text: 'text',
  },
  {
    children: [
      {
        text: 'text',
        meta: metaArray,
      },
    ],
  },
]

export const object = {
  id: '1',
  test: 'test',
  text: 'text',
  meta: metaArray,
}

export const objectPaths = [
  { path: 'id', value: '1', key: 'id', type: 'id' },
  { path: 'test', value: 'test', key: 'test', type: 'text' },
  { path: 'text', value: 'text', key: 'text', type: 'text' },
  {
    path: 'meta',
    value: metaArray,
    key: 'meta',
    type: 'meta',
  },
]

export const objectRemovedProperties = {
  text: 'text',
  meta: [
    {
      value: '_blank',
    },
  ],
}

export const jsonString = JSON.stringify(object)

export const datoCmsCtx = {
  itemTypes: {},
  fields: {},
  editor: Editor.singleLine,
}
