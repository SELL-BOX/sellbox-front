import { ChatMessage } from './ChatView'
import { useState } from 'react'
import useRandomColor from '../hooks/useRandomColor'

type ChatListProps = {
  messages: ChatMessage[]
}

export function ChatList({ messages }: ChatListProps) {
  const [userByColor, setUserByColor] = useState(new Map<string, string>())
  const [generate] = useRandomColor()
  const getUserColor = (userId: string): string => {
    if (!userByColor.has(userId)) {
      userByColor.set(userId, generate())
    }
    return userByColor.get(userId)!!
  }
  return (
    <ul>
      {messages.map((m, key) => (
        <li key={key}>
          <span style={{ color: getUserColor(m.userId) }}>{m.userId}</span>
          <span className="whitespace-pre">{': ' + m.message}</span>
        </li>
      ))}
    </ul>
  )
}
