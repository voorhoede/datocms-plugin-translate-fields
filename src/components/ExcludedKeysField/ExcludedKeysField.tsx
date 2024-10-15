import { TextField } from 'datocms-react-ui'
import { useState } from 'react'

type ExcludedKeysFieldProps = {
  value: string
  onBlur: (newValue: string) => void
}

export default function ExcludedFields({
  value,
  onBlur,
}: ExcludedKeysFieldProps) {
  const [excludedKeys, setExcludedKeys] = useState<string>(value)

  return (
    <TextField
      name="excludedKeys"
      id="excludedKeys"
      label="Exclude keys"
      hint="Please enter a comma-separated list of the keys of fields that you want to exclude from translation."
      value={excludedKeys}
      placeholder="Example: theme, variant"
      textInputProps={{
        onBlur: (e) => {
          onBlur(e.target.value)
        },
      }}
      onChange={(newValue) => setExcludedKeys(newValue)}
    />
  )
}
