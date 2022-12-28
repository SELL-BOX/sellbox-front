import { client } from './client'

export interface RoomInfo {
  id: number
  roomName: string
  hostId: string
}

interface CreateRoomDto {
  roomName: string
}

export function createRoom(room: CreateRoomDto) {
  return client.post<number>('/api/v1/rooms', room)
}

export function getRooms() {
  return client.get<RoomInfo[]>('/api/v1/rooms')
}

export function enterRoom(id: number) {
  return client.get<RoomInfo>(`/api/v1/rooms/${id}`)
}
