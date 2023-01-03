import TextInput from '../common/TextInput'
import Button from '../common/Button'
import React, { useCallback, useState } from 'react'

type RoomCreateFormProps = {
  initialRoomName?: string
  onSubmit: (data: RoomCreateFormData) => void
  isEdit?: boolean
}

type RoomCreateFormData = {
  roomName: string
}

export default function RoomCreateForm({
  initialRoomName,
  onSubmit,
  isEdit,
}: RoomCreateFormProps) {
  const [roomName, setRoomName] = useState(initialRoomName ?? '')
  const onChangeRoomName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRoomName(e.target.value)
    },
    [setRoomName],
  )
  const onClickHandle = useCallback(() => {
    onSubmit?.({
      roomName,
    })
  }, [onSubmit, roomName])
  return (
    <div className="flex flex-col space-y-2">
      <label>방 이름</label>
      <TextInput type="text" value={roomName} onChange={onChangeRoomName} />
      <Button onClick={onClickHandle}>
        {isEdit === true ? '방 생성' : '수정'}
      </Button>
    </div>
  )
}
