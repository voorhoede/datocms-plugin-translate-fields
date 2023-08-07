import {
  Fields,
  Editor,
  TranslationFormat,
  TranslationService,
  DeeplFormalityLevel,
  TSettingOption,
} from './types'

export const fieldsOptions = [
  { label: 'String fields', value: Fields.stringField },
  { label: 'Text fields', value: Fields.textField },
  { label: 'Structured text fields', value: Fields.structuredTextField },
  { label: 'Modular content fields', value: Fields.richTextField },
  { label: 'SEO fields', value: Fields.seo },
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
}

export const deeplFormalityLevelOptions: TSettingOption<DeeplFormalityLevel>[] =
  [
    { label: 'Default', value: DeeplFormalityLevel.default },
    { label: 'More formal', value: DeeplFormalityLevel.more },
    { label: 'Less formal', value: DeeplFormalityLevel.less },
    {
      label: 'Prefer more formal if available',
      value: DeeplFormalityLevel.preferMore,
    },
    {
      label: 'Prefer less formal if available',
      value: DeeplFormalityLevel.preferLess,
    },
  ]
