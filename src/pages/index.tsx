import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { createRoom, getRooms, RoomInfo } from '../models/room'
import RoomListView from '../components/RoomListView'
import Button from '../components/common/Button'
import Header from '../components/Header'

export default function Home() {
  const router = useRouter()
  const [rooms, setRooms] = useState<RoomInfo[]>([])
  useEffect(() => {
    getRooms()
      .then((res) => {
        setRooms(res.data)
      })
      .catch((err) => {
        console.error(err)
        alert('방 목록을 불러오지 못했습니다')
      })
  }, [])
  const onClickCreateRoom = useCallback(() => {
    const roomName = prompt('방 이름을 입력하세요')
    if (roomName) {
      createRoom({
        roomName: roomName,
      })
        .then((res) => {
          router.push(`/presenter?room=${res.data}`)
        })
        .catch((err) => {
          console.error(err)
          alert('방 생성에 실패했습니다')
        })
    }
  }, [router])
  return (
    <>
      <Header />
      <div>
        <div className="flex space-x-2">
          <h2>방 목록</h2>
          <Button onClick={onClickCreateRoom}>방 추가</Button>
        </div>
        <RoomListView rooms={rooms} />
      </div>
    </>
  )
}
