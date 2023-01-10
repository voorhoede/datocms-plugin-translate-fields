export enum Fields {
  stringField = 'string',
  textField = 'text',
  richTextField = 'rich_text',
  structuredTextField = 'structured_text',
  seo = 'seo'
}

export enum Editor {
  html = 'wysiwyg',
  markdown = 'markdown',
  singleLine = 'single_line',
  structuredText = 'structured_text',
  richText = 'rich_text',
  textarea = 'textarea',
  seo = 'seo'
}

export enum TranslationFormat {
  html = 'html',
  markdown = 'markdown',
  structuredText = 'structured_text',
  richText = 'rich_text',
  plain = 'plain',
  seo = 'seo'
}

export enum TranslationService {
  yandex = 'yandex',
  deepl = 'deepl',
  deeplFree = 'deeplFree',
  gpt3 = 'gpt3'
}

export enum TranslationServiceKey {
  yandexKey = 'yandexApiKey',
  deeplApiKey = 'deeplApiKey',
  deeplFreeApiKey = 'deeplFreeApiKey',
  gpt3ApiKey = 'gpt3ApiKey',
}

export type Parameters = {
  translationService?: SettingOption
  [TranslationServiceKey.yandexKey]?: string
  [TranslationServiceKey.deeplApiKey]?: string
  [TranslationServiceKey.deeplFreeApiKey]?: string
  [TranslationServiceKey.gpt3ApiKey]?: string
}

export interface GlobalParameters extends Parameters {
  autoApply?: boolean
  fieldsToEnable?: SettingOption[]
}

export type SettingOption = {
  value: string
  label: string
}

export type TranslationOptions = {
  fromLocale: string
  toLocale: string
  format: TranslationFormat
  translationService: TranslationService
  apiKey: string
}

export interface PathTranslationOptions extends TranslationOptions {
  arrayKey: string
  translatingKey: string
  paths?: Path[]
}

export type Path = {
  path: string
  value: string
  key: string
}
