import { useEffect, useState } from 'react'
// import {socket} from "@/app/socket";
import { ACTIONS } from '@/lib/constants'

import { io } from 'socket.io-client'

export const socket = io(`http://${window?.location.hostname}:3001`, {
  transports: ['websocket'],
  autoConnect: false,
})

export function useSocket() {
  const [isConnected, setIsConnected] = useState(false)
  const [transport, setTransport] = useState('N/A')
  const [rooms, setRooms] = useState<string[]>([])

  const onConnect = () => {
    setIsConnected(true)
    setTransport(socket.io.engine.transport.name)
  }
  const onDisconnect = () => {
    setIsConnected(false)
    setTransport('N/A')
  }
  const onShareRooms = ({ rooms }: { rooms: string[] }) => {
    setRooms(rooms)
  }

  const connect = () => {
    socket.connect()
  }
  const disconnect = () => {
    socket.disconnect()
    onDisconnect()
  }

  useEffect(() => {
    socket.on('connect', onConnect)
    socket.on(ACTIONS.SHARE_ROOMS, onShareRooms)
    socket.on('disconnect', onDisconnect)
  }, [])

  return { socket, rooms, connect, disconnect, isConnected, transport }
}
