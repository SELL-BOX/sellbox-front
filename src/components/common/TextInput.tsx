import React from 'react'

type TextInputProps = {
  placeholder?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  value?: string
  [key: string]: any
}

export default function TextInput({ ...otherProps }: TextInputProps) {
  return (
    <input type="text" className="border bg-gray-100 px-1" {...otherProps} />
  )
}
