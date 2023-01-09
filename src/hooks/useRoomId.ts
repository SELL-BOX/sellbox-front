import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { enterRoom } from '../models/room'

export default function useRoomId() {
  const router = useRouter()
  const [roomId, setRoomId] = useState<number>()

  const noRoomInfoCallback = useCallback(() => {
    alert('방 정보가 없습니다')
    router.push('/')
  }, [router])

  useEffect(() => {
    if (router.isReady) {
      const roomIdParam = router.query.room
      if (typeof roomIdParam === 'string') {
        enterRoom(+roomIdParam)
          .then((res) => {
            if (res.data) {
              setRoomId(res.data.id)
            } else {
              noRoomInfoCallback()
            }
          })
          .catch((err) => {
            console.error(err)
            noRoomInfoCallback()
          })
      } else {
        noRoomInfoCallback()
      }
    }
  }, [router, noRoomInfoCallback, setRoomId])

  return [roomId]
}
