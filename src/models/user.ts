import { client } from './client'

interface LoginRequest {
  userId: string
  password: string
}

export function login(request: LoginRequest) {
  const params = new URLSearchParams()
  params.append('userId', request.userId)
  params.append('password', request.password)
  return client.post('/api/v1/login', params)
}

interface SignupRequest {
  userId: string
  userPw: string
  email: string
}

export function signup(request: SignupRequest) {
  return client.post('/api/v1/user', request)
}
