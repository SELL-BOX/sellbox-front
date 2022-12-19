import Header from '../components/Header'
import React, { useState } from 'react'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { GOOGLE_OAUTH_CLIENT_ID } from '../configs/appConfig'

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
  return (
    <div>
      <Header />
      <div>
        <form>
          <label>아이디</label>
          <input type="text" />

          <label>패스워드</label>
          <input type="password" />
        </form>
        <GoogleOAuthProvider clientId={GOOGLE_OAUTH_CLIENT_ID}>
          <GoogleLoginButton />
        </GoogleOAuthProvider>
        ;
      </div>
    </div>
  )
}
