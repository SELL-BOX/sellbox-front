import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <div>
      <Link href="/" className="font-bold">
        Home
      </Link>
      <div>
        <Link href={'/login'}>로그인</Link>
      </div>
    </div>
  )
}
