import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <div className="flex space-x-1 mb-2 justify-between">
      <Link href="/" className="font-bold">
        Home
      </Link>
      <div className="flex space-x-2">
        <div>
          <Link href={'/signup'}>회원가입</Link>
        </div>
        <div>
          <Link href={'/login'}>로그인</Link>
        </div>
      </div>
    </div>
  )
}
