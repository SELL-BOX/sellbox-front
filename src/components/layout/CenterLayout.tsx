import React, { ReactNode } from 'react'

export default function CenterLayout({ children }: { children: ReactNode }) {
  return <div className="p-2 mx-auto w-full sm:w-1/3">{children}</div>
}
