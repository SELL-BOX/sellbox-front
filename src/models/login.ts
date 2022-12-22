import { client } from './client'

interface LoginRequest {
  userId: string
  password: string
}

export function login(request: LoginRequest) {
  return client.post<LoginRequest>('/api/v1/login', request)
}
