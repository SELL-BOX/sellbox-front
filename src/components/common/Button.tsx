import React from 'react'

type ButtonProps = {
  primary: boolean
  children: React.ReactNode
  onClick?: () => void
}

export default function Button({ primary, children, onClick }: ButtonProps) {
  return (
    <button
      className={`${
        primary
          ? 'bg-blue-400 text-white'
          : 'bg-white border border-blue-400 text-blue-400'
      } rounded py-1 px-2`}
      onClick={() => onClick?.()}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  primary: true,
}
