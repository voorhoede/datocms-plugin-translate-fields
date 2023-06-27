import { TextField } from 'datocms-react-ui'
import { useState } from 'react'

type ApiTextFieldProps = {
  value: string
  onBlur: (newValue: string) => void
};

export default function GlossaryIdField({ value, onBlur }: ApiTextFieldProps) {
  const [glossaryId, setGlossaryId] = useState<string>(value)

  return (
    <TextField
      required
      name="deeplGlossaryId"
      id="deeplGlossaryId"
      label="DeepL glossary ID"
      value={glossaryId}
      placeholder="Enter glossary key"
      textInputProps={{
        onBlur: (e) => {
          onBlur(e.target.value);
        },
      }}
      onChange={(newValue) => setGlossaryId(newValue)}
    />
  );
}
