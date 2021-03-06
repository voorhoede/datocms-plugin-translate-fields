import { Fields, Editor, TranslationFormat, TranslationService } from './types'

export const fieldsOptions = [
  { label: 'String fields', value: Fields.stringField },
  { label: 'Text fields', value: Fields.textField },
  { label: 'Structured text fields', value: Fields.structuredTextField },
]

export const translationServiceOptions = [
  { label: 'Yandex translate', value: TranslationService.yandex },
  { label: 'DeepL API Pro', value: TranslationService.deepl },
  { label: 'DeepL API Free', value: TranslationService.deeplFree },
]

export const translationFormats = {
  [Editor.html]: TranslationFormat.html,
  [Editor.markdown]: TranslationFormat.markdown,
  [Editor.singleLine]: TranslationFormat.plain,
  [Editor.structuredText]: TranslationFormat.structuredText,
  [Editor.richText]: TranslationFormat.richText,
  [Editor.textarea]: TranslationFormat.plain,
}
