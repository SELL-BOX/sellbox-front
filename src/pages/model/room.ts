import { fetch } from 'next/dist/compiled/@edge-runtime/primitives/fetch'
import { HTTP_API_SERVER } from '../config/appConfig'
import axios from 'axios'

export interface RoomInfo {
  roomId: string
}

const client = axios.create({
  baseURL: HTTP_API_SERVER,
})

export function createRoom(room: RoomInfo) {
  return client.post<RoomInfo>('/rooms/create', room)
}

export function getRooms() {
  return client.get<RoomInfo[]>('/rooms/')
}

export function enterRoom(roomId: string) {
  return client.get<RoomInfo>(`/rooms/${roomId}`)
}
