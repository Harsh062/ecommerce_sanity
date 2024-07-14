import React from 'react'
import { useFormValue } from '@sanity/react-hooks'

const DefaultVariantSelector = ({ type, value, onChange }) => {
  const variations = useFormValue(['variations']) || []

  const handleChange = (event) => {
    onChange(event.target.value ? event.target.value : undefined)
  }

  return (
    <select value={value} onChange={handleChange}>
      <option value="">Select Default Variant</option>
      {variations.map((variant, index) => (
        <option key={index} value={variant._key}>
          {`${variant.type}: ${variant.value}`}
        </option>
      ))}
    </select>
  )
}

export default DefaultVariantSelector
