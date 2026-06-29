export const structuredTextParagraphSlate = {
  type: 'paragraph',
  children: [
    {
      text: 'Test',
    },
  ],
}

export const structuredTextEmptyParagraphSlate = {
  type: 'paragraph',
  children: [
    {
      text: '',
    },
  ],
}

export const structuredTextBlockSlate = {
  blockModelId: '1',
  type: 'block',
  children: [
    {
      text: 'Test',
    },
  ],
}

export const structuredTextInlineItemSlate = {
  item: '1',
  itemTypeId: '1',
  type: 'inlineItem',
  children: [
    {
      text: 'Test',
    },
  ],
}

export const structuredTextInlineBlockSlate = {
  blockModelId: '1',
  type: 'inlineBlock',
  children: [
    {
      text: 'Test',
    },
  ],
}

export const structuredTextLinkSlate = {
  type: 'link',
  url: 'https://example.com',
  children: [
    {
      text: 'Test',
    },
  ],
}

export const structuredTextItemLinkSlate = {
  type: 'itemLink',
  item: '1',
  itemTypeId: '1',
  children: [
    {
      text: 'Test',
    },
  ],
}

export const structuredTextCodeSlate = {
  type: 'code',
  children: [
    {
      text: 'Test',
    },
  ],
}

export const structuredTextSlate = [structuredTextParagraphSlate]

export const emptyStructuredTextSlate = [structuredTextEmptyParagraphSlate]

export const structuredTextDast = {
  schema: 'dast',
  document: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [
          {
            marks: undefined,
            type: 'span',
            value: 'Test',
          },
        ],
      },
    ],
  },
}

export const emptyStructuredTextDast = {
  schema: 'dast',
  document: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'span',
            value: '',
          },
        ],
      },
    ],
  },
}
