import { Fields, Editor, TranslationFormat, TranslationService } from './types'

export const fieldsOptions = [
  { label: 'String fields', value: Fields.stringField },
  { label: 'Text fields', value: Fields.textField },
  { label: 'Structured text fields', value: Fields.structuredTextField },
  { label: 'Modular content fields', value: Fields.richTextField },
  { label: 'SEO fields', value: Fields.seo },
  { label: 'Slug fields', value: Fields.slug },
]

export const translationServiceOptions = [
  { label: 'Yandex translate', value: TranslationService.yandex },
  { label: 'DeepL API Pro', value: TranslationService.deepl },
  { label: 'DeepL API Free', value: TranslationService.deeplFree },
  { label: 'OpenAI', value: TranslationService.openAI },
]

export const translationFormats = {
  [Editor.html]: TranslationFormat.html,
  [Editor.markdown]: TranslationFormat.markdown,
  [Editor.singleLine]: TranslationFormat.plain,
  [Editor.structuredText]: TranslationFormat.structuredText,
  [Editor.richText]: TranslationFormat.richText,
  [Editor.textarea]: TranslationFormat.plain,
  [Editor.seo]: TranslationFormat.seo,
  [Editor.slug]: TranslationFormat.slug,
}
