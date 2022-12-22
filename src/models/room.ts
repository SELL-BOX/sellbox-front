import { client } from './client'

export interface RoomInfo {
  roomId: string
  roomName: string
  hostId: string
}

interface CreateRoomDto {
  roomName: string
}

export function createRoom(room: CreateRoomDto) {
  return client.post<RoomInfo>('/api/v1/rooms', room)
}

export function getRooms() {
  return client.get<RoomInfo[]>('/api/v1/rooms')
}

export function enterRoom(roomId: string) {
  return client.get<RoomInfo>(`/api/v1/rooms/${roomId}`)
}
