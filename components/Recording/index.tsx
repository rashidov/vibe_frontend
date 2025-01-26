// let mediaStream: MediaStream | null = null
import {useRef, useState} from "react";
import {socket} from "@/app/socket";

let mediaRecorder: MediaRecorder | null = null
let mediaChunks: Blob[] = []

const isRecordingStarted = () => !!mediaRecorder

const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({audio: true})
    // https://www.w3.org/TR/mediastream-recording/#mediarecorder-constructor
    // создаем экземпляр рекордера
    // mediaRecorder = new MediaRecorder(stream, { mimeType: `audio/webm` })
    mediaRecorder = new MediaRecorder(stream, { mimeType: `audio/webm` })
    // обрабатываем запись данных
    mediaRecorder.ondataavailable = ({ data }) => {
      mediaChunks.push(data)
      // console.log('--', data)
      // socket.emit('audio-data', data)
    }

    // запускаем запись
    mediaRecorder.start(250)
    console.log(mediaRecorder)
    // возвращаем поток
    return stream
  } catch (e) {
    console.warn('Failed to set media stream')
  }
}
const stopRecording = () => {
  if (!mediaRecorder)  return

  // останавливаем рекордер
  mediaRecorder!.stop()
  // останавливаем треки из потока
  mediaRecorder!.stream.getTracks().forEach((t) => {
    t.stop()
  })

  // https://w3c.github.io/FileAPI/#file-constructor
  // создаем новый файл
  const file = new File(mediaChunks, 'my_record.webm', {
    type: `audio/webm`
  })

  const blob = new Blob(mediaChunks, { type: 'audio/raw' })
  socket.emit('audio-data', blob)

  // без этого запись можно будет создать только один раз
  mediaRecorder!.ondataavailable = null
  // обнуляем рекордер
  mediaRecorder = null
  // очищаем массив с данными
  mediaChunks = []

  // возвращаем файл
  return file
}

export default function Recording() {
  const [recording, setRecording] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const start = async () => {
    setRecording(true)
    const stream = await startRecording()
    // if (videoRef.current) {
    //   // @ts-ignore
    //   videoRef.current?.srcObject = stream as any
    // }
  }
  const stop = () => {
    const file = stopRecording()
    console.log('file', file)
    setRecording(false)
  }

  return (
    <div className="mt-4 d-flex">
      <button
        type={'button'}
        onClick={!recording ? start : stop}
        className={"text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2.5 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"}
      >
        {!recording ? 'record' : 'recording... stop record'}
      </button>
      {/*<video ref={videoRef} autoPlay muted />*/}
    </div>
  )
}