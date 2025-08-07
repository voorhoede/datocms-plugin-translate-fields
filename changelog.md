# Changelog
All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and follows [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.14.0] - 2025-08-07
### Added
- Option for Deepl to preverve formatting (no & to &amp)
- Option to hide the "Translate to all locales" button
- Display locales with their full name if possible

## [1.13.2] - 2025-04-28
### Added
- Deepl language support (`en-EU` and `en-IE`)
### Fixed
- Translation test by using our own fetch mock

## [1.13.1] - 2025-04-11
### Fixed
- Add a proxy in the Deepl request to bypass CORS issues

## [1.13.0] - 2025-03-31
### Added
- HTML handling for Deepl
- Ability to customize prompt for OpenAI
### Fixed
- Show button with locale if there are only two locales
- OpenAI config screen issues (saving and editing)

## [1.12.0] - 2024-10-04
### Added
- Excluded keys options to exclude certain fields from translating
- Single block translations (single modular content block)
### Fixed
- Make sure you can change specific settings of rich text fields
### Security
- Update all dependencies to their latest version

## [1.11.2] - 2024-06-25
### Fixed
- OpenAI API calls request parameter

## [1.11.1] - 2024-06-24
### Fixed
- OpenAI API calls, thanks to @marcelofinamorvieira

## [1.11.0] - 2023-10-27
### Fixed
- Translation with `meta` field will keep content instead of removing `id`
### Security
- Update all dependencies to their latest version

## [1.10.1] - 2023-08-10
### Added
- Some documentation about the `Translation service` settings
### Changed
- Github workflow test to node version 18
### Security
- Update all dependencies to their latest version

## [1.10.0] - 2023-08-10
### Added
- Ability to use Deepl formality of the translation by adding "Formality level" in the plugin settings
- Ability to translate slug fields
### Changed
- Scripts for prettier and a pre-commit hook so code styling is consistent

## [1.9.0] - 2023-06-27
### Added
- Ability to use Deepl Glossaries by adding a glossary_id in the plugin settings

## [1.8.1] - 2023-05-30
### Changed
- Publish package signed with npm package provenance.

## [1.2.1] - 2022-11-08
### Fixed
- Translation beyond first block in structured text
- Saving copied structured text due to invalid block ID

[1.14.0]: https://github.com/voorhoede/datocms-plugin-translate-fields/compare/v1.13.2...v1.14.0
[1.13.2]: https://github.com/voorhoede/datocms-plugin-translate-fields/compare/v1.13.1...v1.13.2
[1.13.1]: https://github.com/voorhoede/datocms-plugin-translate-fields/compare/v1.13.0...v1.13.1
[1.13.0]: https://github.com/voorhoede/datocms-plugin-translate-fields/compare/v1.12.0...v1.13.0
[1.12.0]: https://github.com/voorhoede/datocms-plugin-translate-fields/compare/v1.11.2...v1.12.0
[1.11.2]: https://github.com/voorhoede/datocms-plugin-translate-fields/compare/v1.11.1...v1.11.2
[1.11.1]: https://github.com/voorhoede/datocms-plugin-translate-fields/compare/v1.11.0...v1.11.1
[1.11.0]: https://github.com/voorhoede/datocms-plugin-translate-fields/compare/v1.10.1...v1.11.0
[1.10.1]: https://github.com/voorhoede/datocms-plugin-translate-fields/compare/v1.10.0...v1.10.1
[1.10.0]: https://github.com/voorhoede/datocms-plugin-translate-fields/compare/v1.9.0...v1.10.0
[1.9.0]: https://github.com/voorhoede/datocms-plugin-translate-fields/compare/v1.8.1...v1.9.0
[1.8.1]: https://github.com/voorhoede/datocms-plugin-translate-fields/compare/a186a4caf740191472193d1395811b3ca060be41...v1.8.1
[1.2.1]: https://github.com/voorhoede/datocms-plugin-translate-fields/compare/f1407d57e0f2a50b410ab56e3175d31ba8fe4e67...v1.2.1
