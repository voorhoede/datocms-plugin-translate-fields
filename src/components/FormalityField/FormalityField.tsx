import { SelectField } from 'datocms-react-ui'

import { DeeplFormalityLevel, SettingOption } from '../../lib/types'
import { deeplFormalityLevelOptions } from '../../lib/constants'

type Value = SettingOption<DeeplFormalityLevel>

type FormalityFieldProps = {
  value: Value
  onChange: (newValue: Value) => void
}

export default function FormalityField({
  onChange,
  value,
}: FormalityFieldProps) {
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
        onChange(newValue as Value)
      }}
    />
  )
}
