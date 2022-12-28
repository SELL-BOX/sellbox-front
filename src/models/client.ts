import axios from 'axios'
import { HTTP_API_SERVER } from '../configs/appConfig'
import Cookies from 'js-cookie'

export const client = axios.create({
  baseURL: HTTP_API_SERVER,
})

client.interceptors.request.use((config) => {
  const jwt = Cookies.get('jwt')
  if (config.headers) config.headers['Authorization'] = jwt
  return config
})
