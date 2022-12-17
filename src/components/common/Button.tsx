import React from 'react'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
}

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      className="rounded-full p-1 bg-blue-400 text-white text-xl"
      onClick={() => onClick}
    >
      {children}
    </button>
  )
}
