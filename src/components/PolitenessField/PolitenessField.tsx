import { SelectField } from 'datocms-react-ui'

import { SettingOption, SupertextPolitness } from '../../lib/types'
import { supertextPolitenessOptions } from '../../lib/constants'

type Value = SettingOption<SupertextPolitness>

type PolitenessFieldProps = {
  value: Value
  onChange: (newValue: Value) => void
}

export default function PolitenessField({
  onChange,
  value,
}: PolitenessFieldProps) {
  return (
    <SelectField
      name="supertextPolitness"
      id="supertextPolitness"
      label="Supertext Politeness"
      hint="Politeness levels for translations"
      value={value}
      selectInputProps={{
        options: supertextPolitenessOptions,
      }}
      placeholder="Select a politeness"
      onChange={(newValue) => {
        onChange(newValue as Value)
      }}
    />
  )
}
