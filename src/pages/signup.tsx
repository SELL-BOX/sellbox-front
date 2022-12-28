import Header from '../components/Header'
import React, { useCallback, useState } from 'react'
import TextInput from '../components/common/TextInput'
import Button from '../components/common/Button'
import { signup } from '../models/user'
import { useRouter } from 'next/router'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleClick = useCallback(() => {
    signup({
      email,
      userId: username,
      userPw: password,
    })
      .then((res) => {
        alert('회원 가입이 완료됬습니다')
        router.push('/login')
      })
      .catch((err) => console.error(err))
  }, [username, password])
  return (
    <div>
      <Header />
      <div className="container mx-auto w-1/4">
        <div className="flex flex-col space-y-2 mb-3">
          <label>이메일</label>
          <TextInput
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>아이디</label>
          <TextInput
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>패스워드</label>
          <TextInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick}>회원가입</Button>
        </div>
      </div>
    </div>
  )
}
