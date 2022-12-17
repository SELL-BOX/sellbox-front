import { ChatMessage } from './ChatView'

type ChatListProps = {
  messages: ChatMessage[]
}

export function ChatList({ messages }: ChatListProps) {
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
