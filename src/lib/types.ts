export enum Fields {
  stringField = 'string',
  textField = 'text',
  richTextField = 'rich_text',
  structuredTextField = 'structured_text',
  seo = 'seo',
}

export enum Editor {
  html = 'wysiwyg',
  markdown = 'markdown',
  singleLine = 'single_line',
  structuredText = 'structured_text',
  richText = 'rich_text',
  textarea = 'textarea',
  seo = 'seo',
}

export enum TranslationFormat {
  html = 'html',
  markdown = 'markdown',
  structuredText = 'structured_text',
  richText = 'rich_text',
  plain = 'plain',
  seo = 'seo',
}

export enum TranslationService {
  yandex = 'yandex',
  deepl = 'deepl',
  deeplFree = 'deeplFree',
  openAI = 'openAI',
}

export enum TranslationServiceKey {
  yandexKey = 'yandexApiKey',
  deeplApiKey = 'deeplApiKey',
  deeplFreeApiKey = 'deeplFreeApiKey',
  openAIKey = 'openAIApiKey',
}

export enum OpenAIDefaultValues {
  model = 'text-davinci-003',
  temperature = 0,
  maxTokens = 100,
  topP = 0,
}

export type Parameters = {
  translationService?: SettingOption
  model?: SettingOption
  temperature?: number
  maxTokens?: number
  topP?: number
  [TranslationServiceKey.yandexKey]?: string
  [TranslationServiceKey.deeplApiKey]?: string
  [TranslationServiceKey.deeplFreeApiKey]?: string
  [TranslationServiceKey.openAIKey]?: string
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
  openAIOptions: {
    model: string
    temperature: number
    maxTokens: number
    topP: number
  }
}

export type Path = {
  path: string
  value: string
  key: string
  type?: PathType
}

export enum PathType {
  text = 'text',
  structured_text = 'structured_text',
  structured_text_block = 'structured_text_block',
  structured_text_inline_item = 'structured_text_inline_item',
  structured_text_code = 'structured_text_code',
  media = 'media',
  id = 'id',
  number = 'number',
  date = 'date',
  boolean = 'boolean',
  color = 'color',
  html = 'html',
  markdown = 'markdown',
  json = 'json',
  seo = 'seo',
  slug = 'slug',
}

export type Models = Array<{ id: string }>
