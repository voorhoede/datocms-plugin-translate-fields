# DatoCMS plugin: Translate fields

**This DatoCMS plugin gives you the ability to translate `structured-text`, `rich-text`, `string`, `text`, `seo` and `slug` fields. This plugin is an addon which will add a translate button to all selected fields.**

![](https://github.com/voorhoede/datocms-plugin-translate-fields/raw/main/docs/translate-fields.png)

## Features

* Translate text and string fields
* Translate structured text fields
* Translate rich text fields (multiple and single)
* Translate SEO fields
* Translate Slug fields
* Translate to all languages with one button press
* Translate and copy text from the default language
* Exclude keys of fields to make sure not every field is translated

## Configuration

First add this plugin via DatoCMS Settings > Plugins > Add (`/admin/plugins/new`).

### Plugin settings

For this plugin you can configure global settings and configure the plugin per field. Choose to apply the plugin automatically to all string/text fields or add the plugin as addon per model/field. Settings set per model/field will always overwrite all global settings and empty settings for a model will be overwriten by global settings.

#### **Global Settings**

![](https://github.com/voorhoede/datocms-plugin-translate-fields/raw/main/docs/translate-fields-global-settings.png)

- **Auto apply to fields (switch)**: When enabled this will automatically apply the plugin to all `structured-text`, `rich-text`, `string`, `text` and `seo` fields.
By changing the following setting you can choose on which fields this plugin will be applied.

- **Show "Translate to all locales" button (switch)**: When enabled this will show a `Translate to all locales` button on for all English text to translate the field into all available languages.

- **Field where this plugin is enabled (multi select)**: You can choose to which fields the plugin will be applied.

> Options of `Field where this plugin is enabled`:
> * Structured-text fields
> * Rich-text fields
> * String fields
> * Text fields
> * SEO fields
> * Slug fields

#### **General Settings**

![](https://github.com/voorhoede/datocms-plugin-translate-fields/raw/main/docs/translate-fields-general-settings.png)

- **Translation service (multi select)**: You can choose which service will be used to translate. The chosen service will be used and an option to add an api key will be presented automatically. Some translation services require some extra settings. These will be shown when a `Translation service` is selected.

> Options of `Translation service`:
> * Yandex translate
> * DeepL API Pro
> * DeepL API Free
> * OpenAI

- **API key of `[selected translation service]` (text field)**: Add the API key of the translation service that you have selected. The plugin will give errors if the API key isn't added or if the translation service serves an error.

- **Exclude key (text field)**: Add a comma separated list of keys of fields you don't want to translate. This can be usefull for rich text components where certain fields have fixed keys (i.e. choosing a theme or have fixed variants). If you translate a field that is included in the list it will skip the field and copy the content 'as is' in the translated field.

## Contributing

See [contributing.md](https://github.com/voorhoede/datocms-plugin-translate-fields/blob/main/contributing.md).
