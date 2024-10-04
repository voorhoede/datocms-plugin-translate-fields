export enum DatoFieldType {
  stringField = 'string',
  textField = 'text',
  richTextField = 'rich_text',
  structuredTextField = 'structured_text',
  seo = 'seo',
  slug = 'slug',
  singleBlock = 'single_block',
}

export enum Editor {
  html = 'wysiwyg',
  markdown = 'markdown',
  singleLine = 'single_line',
  structuredText = 'structured_text',
  framedSingleBlock = 'framed_single_block',
  framelessSingleBlock = 'frameless_single_block',
  richText = 'rich_text',
  textarea = 'textarea',
  seo = 'seo',
  slug = 'slug',
}

export enum TranslationFormat {
  html = 'html',
  markdown = 'markdown',
  structuredText = 'structured_text',
  singleBlock = 'single_block',
  richText = 'rich_text',
  plain = 'plain',
  seo = 'seo',
  slug = 'slug',
}

export enum TranslationService {
  yandex = 'yandex',
  deepl = 'deepl',
  deeplFree = 'deeplFree',
  openAI = 'openAI',
  mock = 'mock',
}

export enum TranslationServiceKey {
  yandexKey = 'yandexApiKey',
  deeplApiKey = 'deeplApiKey',
  deeplFreeApiKey = 'deeplFreeApiKey',
  openAIKey = 'openAIApiKey',
  mockKey = 'mockApiKey',
}

export enum OpenAIDefaultValues {
  model = 'text-davinci-003',
  temperature = 0,
  maxTokens = 100,
  topP = 0,
}

export enum DeeplFormalityLevel {
  default = 'default',
  more = 'more',
  less = 'less',
  preferMore = 'prefer_more',
  preferLess = 'prefer_less',
}

export type Parameters = {
  translationService?: SettingOption<TranslationService>
  model?: SettingOption<string>
  temperature?: number
  maxTokens?: number
  topP?: number
  deeplGlossaryId?: string
  deeplFormalityLevel?: SettingOption<DeeplFormalityLevel>
  excludedKeys?: string
  [TranslationServiceKey.yandexKey]?: string
  [TranslationServiceKey.deeplApiKey]?: string
  [TranslationServiceKey.deeplFreeApiKey]?: string
  [TranslationServiceKey.openAIKey]?: string
  [TranslationServiceKey.mockKey]?: string
}

export interface GlobalParameters extends Parameters {
  autoApply?: boolean
  fieldsToEnable?: SettingOption<DatoFieldType>[]
}

export type SettingOption<T> = {
  value: T
  label: string
}

export type TranslationOptions = {
  fromLocale: string
  toLocale: string
  format: TranslationFormat
  translationService: TranslationService
  apiKey: string
  deeplOptions?: {
    glossaryId?: string
    formality?: DeeplFormalityLevel
  }
  openAIOptions: {
    model: string
    temperature: number
    maxTokens: number
    topP: number
  }
  excludedKeys?: string
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
  meta = 'meta',
  exclude = 'exclude',
}

export type Models = Array<{ id: string }>
