import React, { useCallback, useState } from 'react'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { login } from '../models/user'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import TitleText from '../components/common/TitleText'
import CenterLayout from '../components/layout/CenterLayout'
import MainLayout from '../components/layout/MainLayout'
import { Button, Form } from 'react-bootstrap'

function GoogleLoginButton() {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        console.log(credentialResponse)
      }}
      onError={() => {
        console.log('Login Failed')
      }}
    />
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleClick = useCallback(() => {
    login({
      userId: username,
      userPw: password,
    })
      .then((res) => {
        Cookies.set('jwt', res.data)
        router.push('/')
      })
      .catch((err) => console.error(err))
  }, [username, password, router])
  return (
    <MainLayout>
      <CenterLayout>
        <Form>
          <TitleText text={'로그인'} />
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
          <Button onClick={handleClick}>로그인</Button>
        </Form>
        <GoogleOAuthProvider clientId={'GOOGLE_OAUTH_CLIENT_ID'}>
          <GoogleLoginButton />
        </GoogleOAuthProvider>
      </CenterLayout>
    </MainLayout>
  )
}
