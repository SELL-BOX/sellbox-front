import { ReactNode } from 'react'
import Header from '../Header'

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <div className="p-2">{children}</div>
    </div>
  )
}
