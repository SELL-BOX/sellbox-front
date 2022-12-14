import { useCallback, useEffect, useState } from 'react'
import { createRoom, getRooms, RoomInfo } from './model/room'
import { useRouter } from 'next/router'
import Link from 'next/link'

type RoomListViewProps = {
  rooms: RoomInfo[]
}

export function RoomListView({ rooms }: RoomListViewProps) {
  return (
    <ul>
      {rooms.map((r) => (
        <li key={r.roomId}>
          <Link href={`/viewer?room=${r.roomId}`}>{r.roomId}</Link>
        </li>
      ))}
    </ul>
  )
}

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
        roomId: roomName,
      })
        .then((res) => {
          router.push(`/presenter?room=${res.data.roomId}`)
        })
        .catch((err) => {
          console.error(err)
          alert('방 생성에 실패했습니다')
        })
    }
  }, [router])
  return (
    <>
      <h1 className="font-bold">Home</h1>
      <div>
        <button className="cursor-pointer" onClick={() => onClickCreateRoom()}>
          방 추가
        </button>
        <h2>방 목록</h2>
        <RoomListView rooms={rooms}></RoomListView>
      </div>
    </>
  )
}
