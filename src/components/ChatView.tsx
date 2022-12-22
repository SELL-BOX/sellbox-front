import React, { useCallback, useEffect, useRef, useState } from 'react'
import SockJS from 'sockjs-client'
import { HTTP_API_SERVER } from '../configs/appConfig'
import { CompatClient, Stomp } from '@stomp/stompjs'
import { useRouter } from 'next/router'
import { ChatList } from './ChatList'
import Button from './common/Button'
import TextInput from './common/TextInput'

export interface ChatMessage {
  roomId: string
  userId: string
  message: string
}

type ChatViewProps = {
  roomId: string
}

export function ChatView({ roomId }: ChatViewProps) {
  const router = useRouter()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [username, setUsername] = useState<string>('')
  const [inputText, setInputText] = useState<string>('')
  const clientRef = useRef<CompatClient | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  // 새로운 채팅이 생길때 채팅창 맨 아래로 이동
  useEffect(() => {
    const scroll = scrollRef.current
    if (scroll) {
      scroll.scrollTop = scroll.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    const socket = new SockJS(`${HTTP_API_SERVER}/ws`)
    const client = Stomp.over(socket)
    clientRef.current = client

    client.connect({}, () => {
      client.subscribe(`/chat/room/${roomId}`, (res) => {
        const message = JSON.parse(res.body) as ChatMessage
        setMessages((prev) => {
          return [...prev, message]
        })
      })
    })

    return () => client.disconnect()
  }, [roomId])

  const sendMessage = useCallback(
    (message: ChatMessage) => {
      const client = clientRef.current
      if (client) {
        client.publish({
          destination: `/chatBox/${message.roomId}`,
          body: JSON.stringify(message),
        })
      }
    },
    [clientRef, roomId],
  )
  const onSubmitClick = useCallback(() => {
    if (username.trim() === '') {
      alert('사용자명을 입력하세요')
      return
    }
    if (inputText.trim() === '') {
      alert('메시지를 입력하세요')
      return
    }
    sendMessage({
      roomId,
      userId: username,
      message: inputText,
    })
    setInputText('')
  }, [username, roomId, inputText])
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onSubmitClick()
      }
    },
    [onSubmitClick],
  )
  return (
    <div className="flex flex-col absolute right-0 top-0 h-screen border-l p-2 pb-5 space-y-1">
      <div className="grow overflow-y-auto" ref={scrollRef}>
        <ChatList messages={messages} />
      </div>
      <div className="flex space-x-1">
        <TextInput
          value={inputText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputText(e.target.value)
          }
          onKeyDown={onKeyDown}
        />
        <Button onClick={() => onSubmitClick()}>전송</Button>
      </div>
      <div>
        <label className="mr-1">이름</label>
        <input
          type="text"
          value={username}
          className="border-2"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
    </div>
  )
}
