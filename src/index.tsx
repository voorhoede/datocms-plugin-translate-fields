import {
  connect,
  Field,
  RenderFieldExtensionCtx,
  RenderManualFieldExtensionConfigScreenCtx,
  FieldIntentCtx,
} from 'datocms-plugin-sdk'

import ConfigScreen from './entrypoints/ConfigScreen/ConfigScreen'
import FieldAddon from './entrypoints/FieldAddon/FieldAddon'
import FieldAddonConfigScreen from './entrypoints/FieldAddonConfigScreen/FieldAddonConfigScreen'

import { fieldsOptions } from './lib/constants'
import { GlobalParameters, SettingOption, Fields } from './lib/types'
import { render } from './lib/render'

import 'datocms-react-ui/styles.css'
import './styles/index.css'

const extensionId = 'translate'

connect({
  renderConfigScreen(ctx) {
    return render(<ConfigScreen ctx={ctx} />)
  },
  manualFieldExtensions() {
    return [
      {
        id: extensionId,
        name: 'Translate',
        type: 'addon',
        fieldTypes: [
          Fields.textField,
          Fields.stringField,
          Fields.structuredTextField,
          Fields.seo,
        ],
        configurable: true,
      },
    ]
  },
  renderManualFieldExtensionConfigScreen(
    _,
    ctx: RenderManualFieldExtensionConfigScreenCtx
  ) {
    return render(<FieldAddonConfigScreen ctx={ctx} />)
  },
  overrideFieldExtensions(field: Field, ctx: FieldIntentCtx) {
    const pluginGlobalParameters: GlobalParameters =
      ctx.plugin.attributes.parameters

    const fieldsSettings: SettingOption[] =
      pluginGlobalParameters?.fieldsToEnable || fieldsOptions

    const fieldIsLocalized: boolean = field.attributes.localized

    const hasPlugin: boolean = field.attributes.appearance.addons.some(
      (addon) => addon.field_extension === extensionId
    )
    const showOnThisFieldType: boolean = fieldsSettings.some(
      (setting: SettingOption) => setting.value === field.attributes.field_type
    )

    if (
      pluginGlobalParameters?.autoApply &&
      !hasPlugin &&
      showOnThisFieldType &&
      fieldIsLocalized
      ) {
      return {
        addons: [{ id: extensionId }],
      }
    }
  },
  renderFieldExtension(_, ctx: RenderFieldExtensionCtx) {
    render(<FieldAddon ctx={ctx} />)
  },
})
