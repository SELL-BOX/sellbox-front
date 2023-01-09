import RoomCreateForm, {
  RoomCreateFormData,
} from '../../components/room/RoomCreateForm'
import { createRoom } from '../../models/room'
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import React from 'react'
import TitleText from '../../components/common/TitleText'

export default function NewRoomPage() {
  const router = useRouter()
  const onSubmit = (data: RoomCreateFormData) => {
    createRoom({ roomName: data.roomName }, data.file)
      .then((res) => {
        router.push(`/presenter?room=${res.data.id}`)
      })
      .catch((err) => {
        console.error(err)
        alert('방 생성에 실패했습니다')
      })
  }

  return (
    <>
      <Header />
      <div className="p-2 mx-auto w-full sm:w-1/2">
        <TitleText text={'방 생성'} />
        <RoomCreateForm onSubmit={onSubmit} />
      </div>
    </>
  )
}
