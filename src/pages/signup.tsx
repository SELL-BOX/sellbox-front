import React, { useCallback, useState } from 'react'
import { signup } from '../models/user'
import { useRouter } from 'next/router'
import TitleText from '../components/common/TitleText'
import CenterLayout from '../components/layout/CenterLayout'
import MainLayout from '../components/layout/MainLayout'
import { Button, Form } from 'react-bootstrap'

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
      role: 'presenter',
    })
      .then((res) => {
        alert('회원 가입이 완료됬습니다')
        router.push('/login')
      })
      .catch((err) => console.error(err))
  }, [username, password, router, email])
  return (
    <MainLayout>
      <CenterLayout>
        <Form>
          <TitleText text={'회원가입'} />
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label htmlFor="formEmail">이메일</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formId">
            <Form.Label htmlFor="formId">아이디</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label htmlFor="formPassword">패스워드</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button onClick={handleClick}>회원가입</Button>
        </Form>
      </CenterLayout>
    </MainLayout>
  )
}
