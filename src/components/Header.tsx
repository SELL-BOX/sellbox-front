import Link from 'next/link'
import React from 'react'
import Button from './common/Button'
import Cookies from 'js-cookie'

export default function Header() {
  function handleClick() {
    Cookies.remove('jwt')
  }

  return (
    <div className="flex space-x-1 mb-2 justify-between p-2">
      <Link href="/" className="font-bold text-xl">
        SellBox
      </Link>
      <div className="flex space-x-2">
        <div>
          <Link href={'/signup'}>회원가입</Link>
        </div>
        <div>
          <Link href={'/login'}>로그인</Link>
        </div>
        <div>
          <Button onClick={handleClick}>로그아웃</Button>
        </div>
      </div>
    </div>
  )
}
