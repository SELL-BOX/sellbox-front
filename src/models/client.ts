import axios from 'axios'
import { HTTP_API_SERVER } from '../configs/appConfig'

export const client = axios.create({
  baseURL: HTTP_API_SERVER,
})
