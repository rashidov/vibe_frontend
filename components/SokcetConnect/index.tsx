'use client'
import { AudioHTMLAttributes, useEffect, useRef, useState } from 'react'
import { useSocket } from '@/hooks/useSocket'
import Recording from '@/components/Recording'
import { Button } from '@/components/ui/button'
import Room from '@/components/Room'

export default function SocketConnect() {
  // const [isConnected, setIsConnected] = useState(false)
  // const [transport, setTransport] = useState("N/A")

  const { socket, isConnected, connect, disconnect, transport, rooms } =
    useSocket()
  const [activeRoomId, setActiveRoomId] = useState<null | string>(null)

  // const mediaStream = useRef<MediaStream | null>(null)
  // const setMedia = async () => {
  // try {
  //   mediaStream = await navigator.mediaDevices.getUserMedia({audio: true})
  //   //  const tracks = mediaStream.getTracks()
  //   //  const [firstTrack] = tracks
  //   // firstTrack -> тут можно получить название микрофона
  // } catch (e) {
  //   console.warn('Failed to set media stream')
  // }
  //  }
  // const stopMedia = () => {
  //   if (!mediaStream) return
  //   mediaStream?.getTracks().forEach((track) => {
  //     track.stop()
  //   })
  //   mediaStream = null
  // }

  useEffect(() => {
    // navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    //   const audioContext = new AudioContext();
    //   // const source = audioContext.createMediaStreamSource(stream);
    //   // const processor = audioContext.createScriptProcessor(4096, 1, 1);
    //
    //   // source.connect(processor);
    //   // processor.connect(audioContext.destination);
    //
    //   // processor.onaudioprocess = (e) => {
    //   //   const audioData = e.inputBuffer.getChannelData(0);
    //   //   // socket.emit("audio-data", audioData);
    //   // };
    // })
  }, [])

  return (
    <>
      <p>socket id: {socket?.id || '-'}</p>
      <p>
        status:{' '}
        {isConnected ? (
          <span className="text-green-700">connected</span>
        ) : (
          <span className="text-red-700">disconnected</span>
        )}
      </p>
      <p>transport: {transport}</p>
      <Button
        variant={!isConnected ? 'secondary' : 'destructive'}
        onClick={!isConnected ? connect : disconnect}
      >
        {!isConnected ? 'connect' : 'disconnect'}
      </Button>
      {/*<button*/}
      {/*  type={'button'}*/}
      {/*  onClick={!isConnected ? connect : disconnect}*/}
      {/*  className={"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"}*/}
      {/*>*/}
      {/*  {!isConnected ? 'connect' : 'disconnect'}*/}
      {/*</button>*/}

      {/*<Recording />*/}
      <div className="d-flex flex-col gap-2">
        {!activeRoomId &&
          rooms.map((room) => (
            <div key={room} className="d-flex flex-col gap-1">
              <p>{room}</p>
              <Button size="sm" onClick={() => setActiveRoomId(room)}>
                connect
              </Button>
            </div>
          ))}
      </div>

      {!!activeRoomId && (
        <Room
          key={activeRoomId}
          roomId={activeRoomId}
          onDisconnect={() => setActiveRoomId(null)}
        />
      )}
    </>
  )
}
