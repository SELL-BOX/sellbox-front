import TextInput from '../common/TextInput'
import Button from '../common/Button'
import React, { useCallback, useState } from 'react'

type RoomSettingFormProps = {
  initialRoomName?: string
  onSubmit: (data: RoomSettingFormData) => void
}

type RoomSettingFormData = {
  roomName: string
}

export default function RoomSettingForm({
  initialRoomName,
  onSubmit,
}: RoomSettingFormProps) {
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
      <label htmlFor="thumbnail">썸네일</label>
      <input id="thumbnail" type="file" className="hidden" />
      <Button onClick={onClickHandle}>방 생성</Button>
    </div>
  )
}
