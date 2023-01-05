import React from 'react'

type TitleTextProps = {
  text: string
}

export default function TitleText({ text }: TitleTextProps) {
  return <h1 className="font-bold text-2xl mb-4">{text}</h1>
}
