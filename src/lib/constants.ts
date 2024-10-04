import {
  DatoFieldType,
  Editor,
  TranslationFormat,
  TranslationService,
  DeeplFormalityLevel,
  SettingOption,
} from './types'

export const fieldsOptions: SettingOption<DatoFieldType>[] = [
  { label: 'String fields', value: DatoFieldType.stringField },
  { label: 'Text fields', value: DatoFieldType.textField },
  { label: 'Structured text fields', value: DatoFieldType.structuredTextField },
  {
    label: 'Modular content fields (multiple)',
    value: DatoFieldType.richTextField,
  },
  {
    label: 'Modular content fields (single)',
    value: DatoFieldType.singleBlock,
  },
  { label: 'SEO fields', value: DatoFieldType.seo },
  { label: 'Slug fields', value: DatoFieldType.slug },
]

export const translationServiceOptions: SettingOption<TranslationService>[] = [
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
  [Editor.framedSingleBlock]: TranslationFormat.singleBlock,
  [Editor.framelessSingleBlock]: TranslationFormat.singleBlock,
  [Editor.richText]: TranslationFormat.richText,
  [Editor.textarea]: TranslationFormat.plain,
  [Editor.seo]: TranslationFormat.seo,
  [Editor.slug]: TranslationFormat.slug,
}

export const deeplFormalityLevelOptions: SettingOption<DeeplFormalityLevel>[] =
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
