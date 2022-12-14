import { useCallback, useEffect, useRef, useState } from 'react'
import SockJS from 'sockjs-client'
import { HTTP_API_SERVER } from '../configs/appConfig'
import { CompatClient, Stomp } from '@stomp/stompjs'
import { useRouter } from 'next/router'

type ChatListProps = {
  messages: ChatMessage[]
}

function ChatList({ messages }: ChatListProps) {
  return (
    <ul className="border">
      {messages.map((m, key) => (
        <li key={key}>
          <p className="whitespace-pre">{m.userId + ' : ' + m.message}</p>
        </li>
      ))}
    </ul>
  )
}

interface ChatMessage {
  roomId: string
  userId: string
  message: string
}

export function ChatView() {
  const router = useRouter()
  const [roomId, setRoomId] = useState<string>()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [username, setUsername] = useState<string>('')
  const [inputText, setInputText] = useState<string>('')
  const clientRef = useRef<CompatClient | null>(null)

  useEffect(() => {
    if (router.isReady) {
      const roomIdParam = router.query.room
      if (typeof roomIdParam === 'string') {
        setRoomId(roomIdParam)
      } else {
        alert('방 정보가 없습니다')
        router.push('/')
      }
    }
  }, [router, setRoomId])

  useEffect(() => {
    if (!roomId) return
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
    if (!roomId) {
      alert('방 정보가 없습니다')
      router.push('/')
      return
    }
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
  }, [username, roomId, inputText])
  return (
    <div>
      <ChatList messages={messages} />
      <div>
        <textarea
          value={inputText}
          className="border"
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={() => onSubmitClick()}>전송</button>
        <div>
          <label>사용자명</label>
          <input
            type="text"
            value={username}
            className="border"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
