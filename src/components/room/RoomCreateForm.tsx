import React, {useCallback, useState} from 'react'
import {Button, Form} from "react-bootstrap";

type RoomCreateFormProps = {
  initialRoomName?: string
  onSubmit: (data: RoomCreateFormData) => void
  isEdit?: boolean
}

export type RoomCreateFormData = {
  roomName: string
  file: File
}

export default function RoomCreateForm({
                                         initialRoomName,
                                         onSubmit,
                                         isEdit,
                                       }: RoomCreateFormProps) {
  const [roomName, setRoomName] = useState(initialRoomName ?? '')
  const [file, setFile] = useState<File | null>(null)
  const [imageSrc, setImageSrc] = useState('')
  const onChangeRoomName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRoomName(e.target.value)
    },
    [setRoomName],
  )
  const onClickHandle = useCallback(() => {
    if (!file) {
      return alert('썸네일을 업로드해주세요')
    }
    onSubmit?.({
      roomName,
      file,
    })
  }, [onSubmit, roomName, file])
  const encodeFileToBase64 = useCallback((file: File) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    return new Promise<string>((resolve) => {
      reader.onload = () => {
        resolve(reader.result as string)
      }
    })
  }, [])
  const onChangeFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        setFile(e.target.files[0])
        encodeFileToBase64(e.target.files[0]).then((src) => setImageSrc(src))
      }
    },
    [setFile, encodeFileToBase64],
  )
  return (
    <Form>

      <Form.Group className="mb-3" controlId="formId">
        <Form.Label htmlFor="formId">방 이름</Form.Label>
        <Form.Control type="text" value={roomName} onChange={onChangeRoomName}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formThumbnail">
        <Form.Label htmlFor="formThumbnail">
          <div className="mb-2">썸네일</div>
          {imageSrc ? (
            <img
              src={imageSrc}
              alt="썸네일 이미지"
              className="rounded-xl object-contain w-[10rem] h-[12rem]"
            />
          ) : (
            <div
              className="rounded-xl object-contain w-[10rem] h-[12rem] bg-stone-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
            </div>
          )}</Form.Label>
        <Form.Control type="file" accept="image/png, image/jpeg" onChange={onChangeFileInput} hidden={true}/>
      </Form.Group>

      <Button onClick={onClickHandle}>
        {isEdit ? '수정' : '확인'}
      </Button>
    </Form>
  )
}
