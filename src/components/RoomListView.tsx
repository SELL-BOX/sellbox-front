import { RoomInfo } from '../models/room'
import Link from 'next/link'

type RoomListViewProps = {
  rooms: RoomInfo[]
}

export default function RoomListView({ rooms }: RoomListViewProps) {
  return (
    <ul>
      {rooms.map((r) => (
        <li key={r.id}>
          <Link href={`/viewer?room=${r.id}`}>{r.roomName}</Link>
        </li>
      ))}
    </ul>
  )
}
