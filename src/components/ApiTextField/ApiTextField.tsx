import { TextField } from 'datocms-react-ui'
import { useState } from 'react'

import { SettingOption } from '../../lib/types'

type ApiTextFieldProps = {
  option: SettingOption<string>
  value: string
  onBlur: (newValue: string) => void
}

export default function ApiTextField({
  option,
  value,
  onBlur,
}: ApiTextFieldProps) {
  const [apiKey, setApiKey] = useState<string>(value)

  return (
    <TextField
      key={option.value}
      required
      name={`${option.value}ApiKey`}
      id={`${option.value}ApiKey`}
      label={`API key of ${option.label}`}
      value={apiKey}
      placeholder="Enter API key"
      textInputProps={{
        onBlur: (e) => {
          onBlur(e.target.value)
        },
      }}
      onChange={(newValue) => setApiKey(newValue)}
    />
  )
}
