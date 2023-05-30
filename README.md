# DatoCMS plugin: Translate fields

**This DatoCMS plugin gives you the ability to translate `structured-text`, `rich-text`, `string`, `text` and `seo` fields. This plugin is an addon which will add a translate button to all selected fields.**

![](https://github.com/voorhoede/datocms-plugin-translate-fields/raw/main/docs/translate-fields.png)

## Features

* Translate text and string fields
* Translate structured text fields
* Translate rich text fields
* Translate SEO fields
* Translate to all languages with one button press
* Translate and copy text from the default language

## Configuration

First add this plugin via DatoCMS Settings > Plugins > Add (`/admin/plugins/new`).

### Plugin settings

For this plugin you can configure global settings and configure the plugin per field. Choose to apply the plugin automatically to all string/text fields or add the plugin as addon per model/field. Settings set per model/field will always overwrite all global settings.

#### **Global Settings**

![](https://github.com/voorhoede/datocms-plugin-translate-fields/raw/main/docs/translate-fields-global-settings.png)

- **Auto apply to fields (switch)**: When enabled this will automatically apply the plugin to all `structured-text`, `rich-text`, `string`, `text` and `seo` fields.
By changing the following setting you can choose on which fields this plugin will be applied.

- **Field where this plugin is enabled (multi select)**: You can choose to which fields the plugin will be applied.

> Options of `Field where this plugin is enabled`:
> * Structured-text fields
> * Rich-text fields
> * String fields
> * Text fields
> * SEO fields

#### **General Settings**

![](https://github.com/voorhoede/datocms-plugin-translate-fields/raw/main/docs/translate-fields-general-settings.png)

- **Translation service**: You can choose which service will be used to translate. The chosen service will be used and an option to add an api key will be presented automatically.

> Options of `Translation service`:
> * Yandex translate
> * DeepL API Pro
> * DeepL API Free
> * OpenAI

- **API key of `[selected translation service]`**: Add the API key of the translation service that you have selected. The plugin will give errors if the API key isn't added or if the translation service serves an error.

## Contributing

See [contributing.md](https://github.com/voorhoede/datocms-plugin-translate-fields/blob/main/contributing.md).
