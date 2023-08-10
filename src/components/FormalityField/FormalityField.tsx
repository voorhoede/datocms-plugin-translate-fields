import { SelectField } from 'datocms-react-ui'
import { RenderConfigScreenCtx } from 'datocms-plugin-sdk'

import {
  DeeplFormalityLevel,
  GlobalParameters,
  SettingOption,
} from '../../lib/types'
import { deeplFormalityLevelOptions } from '../../lib/constants'

type FormalityFieldProps = {
  ctx: RenderConfigScreenCtx
  value: SettingOption<DeeplFormalityLevel>
}

export default function FormalityField({ ctx, value }: FormalityFieldProps) {
  const pluginParameters: GlobalParameters = ctx.plugin.attributes.parameters

  return (
    <SelectField
      name="deeplFormalityLevel"
      id="deeplFormalityLevel"
      label="DeepL formality level"
      hint="Level of formality that Deepl uses for translations. Keep in mind not all languages support this feature"
      value={value}
      selectInputProps={{
        options: deeplFormalityLevelOptions,
      }}
      placeholder="Select a formality level"
      onChange={(newValue) => {
        ctx.updatePluginParameters({
          ...pluginParameters,
          deeplFormalityLevel: newValue,
        })
        ctx.notice('Settings updated successfully!')
      }}
    />
  )
}
