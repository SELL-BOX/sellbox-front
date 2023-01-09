import { RoomInfo } from '../models/room'
import Link from 'next/link'

type RoomListViewProps = {
  rooms: RoomListViewItem[]
}

interface RoomListViewItem {
  id: number
  name: string
  thumbnail: string
}

export default function RoomListView({ rooms }: RoomListViewProps) {
  return (
    <div className="flex space-x-2">
      {rooms.map((r) => (
        <div key={r.id}>
          <Link href={`/viewer?room=${r.id}`}>
            <img
              src={r.thumbnail}
              alt=""
              className="rounded-xl object-contain max-w-[10rem] max-h-[12rem]"
            />
            <div className="px-1">
              <p className="text-sm">{r.name}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}
