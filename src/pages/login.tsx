import Header from '../components/Header'
import React, { useCallback, useState } from 'react'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import TextInput from '../components/common/TextInput'
import Button from '../components/common/Button'
import { login } from '../models/user'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import TitleText from '../components/common/TitleText'

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
      password,
    })
      .then((res) => {
        Cookies.set('jwt', res.data)
        router.push('/')
      })
      .catch((err) => console.error(err))
  }, [username, password])
  return (
    <div>
      <Header />
      <div className="container mx-auto w-1/4">
        <div className="flex flex-col space-y-2 mb-3">
          <TitleText text={'로그인'} />
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
          <Button onClick={handleClick}>로그인</Button>
        </div>
        <GoogleOAuthProvider clientId={'GOOGLE_OAUTH_CLIENT_ID'}>
          <GoogleLoginButton />
        </GoogleOAuthProvider>
      </div>
    </div>
  )
}
