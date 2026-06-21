import type { Room } from '../types'
import api from './client'

export const getRooms = (): Promise<Room[]> =>
  api.get<Room[]>('/rooms').then((r) => r.data)

export const getRoom = (slug: string): Promise<Room> =>
  api.get<Room>(`/rooms/${slug}`).then((r) => r.data)
