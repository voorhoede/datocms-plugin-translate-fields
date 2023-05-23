import { Editor } from '../lib/types'

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
      },
    ],
  },
]

export const object = {
  id: '1',
  test: 'test',
  text: 'text',
}

export const jsonString = JSON.stringify(object)

export const datoCmsCtx = {
  itemTypes: {},
  fields: {},
  editor: Editor.singleLine,
}
