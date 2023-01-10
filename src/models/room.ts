import { client } from './client'
import FormData from 'form-data'

export interface RoomInfo {
  id: number
  roomName: string
  hostId: string
  thumbnailId: string
}

interface CreateRoomDto {
  roomName: string
}

export function createRoom(room: CreateRoomDto, imgFile: File) {
  const form = new FormData()
  form.append(
    'room',
    new Blob([JSON.stringify(room)], { type: 'application/json' }),
  )
  form.append('imgFile', imgFile)
  return client.post('/api/v1/rooms', form)
}

export function getRooms() {
  return client.get<RoomInfo[]>('/api/v1/rooms')
}

export function enterRoom(id: number) {
  return client.get<RoomInfo>(`/api/v1/rooms/${id}`)
}
