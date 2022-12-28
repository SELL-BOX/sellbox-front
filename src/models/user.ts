import { client } from './client'

interface LoginRequest {
  userId: string
  password: string
}

export function login(request: LoginRequest) {
  return client.post<string>('/api/v1/user/login', request)
}

interface SignupRequest {
  userId: string
  userPw: string
  email: string
}

export function signup(request: SignupRequest) {
  return client.post('/api/v1/user', request)
}
