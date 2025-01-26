import {useCallback, useEffect, useRef, useState} from "react";
import {useStateWithCb, UseStateWithCbCallback} from "@/hooks/useStateWithCb";
// import {socket} from "@/app/socket";
import {ACTIONS} from "@/lib/constants";
// @ts-ignore
import freeice  from 'freeice'
import {socket} from "@/hooks/useSocket";

export const LOCAL = 'LOCAL'

type PeerConnection = Record<string,  RTCPeerConnection>
type SessionDescriptionSocketPayload = {
  peerId: string,
  sessionDescription: RTCSessionDescriptionInit
}
type IceCandidateSocketPayload = {
  peerId: string
  iceCandidate: RTCIceCandidate
}
type RemovePeerSocketPayload = {
  peerId: string
}

export const useWebRTC = (roomId: string) => {
  const { state: clients, updateState: updateClients } = useStateWithCb<string[]>([])

  // all peer connections
  const peerConnectionsRef = useRef<PeerConnection>({})
  // our video & audio streams
  const localMediaStreamRef = useRef<MediaStream | null>(null)
  // refs to all media tags
  const peerMediaElements = useRef<Record<string, HTMLAudioElement | null>>({
    [LOCAL]: null,
  })

  const addNewClient = useCallback((newClient: string, cb: UseStateWithCbCallback<string[]>) => {
    if (!clients.includes(newClient)) return
    updateClients((prev) => [...prev, newClient], cb)
  }, [clients, updateClients])

  const startCapture = async () => {
    localMediaStreamRef.current = await navigator.mediaDevices.getUserMedia({
      audio: true,
    })

    addNewClient(LOCAL, () => {
      const localVideoElement: any = peerMediaElements.current[LOCAL]
      if (localVideoElement) {
        localVideoElement.volume = 0
        localVideoElement.srcObject = localMediaStreamRef.current
      }
    })
  }

  const provideMediaRef = useCallback((id: string, node: HTMLAudioElement | null ) => {
    peerMediaElements.current[id] = node
  }, [])

  const addNewPeer = async ({ peerId, createOffer  }: {peerId: string, createOffer: boolean}) => {
    if (peerConnectionsRef.current?.[peerId]) {
      return console.warn('Already connected to peer', peerId)
    }

    // @ts-ignore
    // peerConnectionsRef.current[peerId] = null


    /**
     * Создаем RTCPeerConnection
     */
    peerConnectionsRef.current![peerId] = new RTCPeerConnection({
      iceServers: freeice()
    })

    console.log('add new peer', peerConnectionsRef.current)

    /**
     * Обработчик на вызов setLocalDescription
     */
    peerConnectionsRef.current![peerId].onicecandidate = ({candidate}) => {
      if (candidate) socket.emit(ACTIONS.ROOM_RELAY_ICE, { peerId, iceCandidate: candidate })
    }
    let tracksNum = 0

    /**
     * Добавляем клиента и транслируем медиа
     */
    peerConnectionsRef.current![peerId].ontrack = ({ streams: [remoteStream] }) => {
      // ...it`s audio stream
      tracksNum++;
      // ...here should check two streams [audio, video]
      addNewClient(peerId, () => {
        peerMediaElements.current![peerId]!.srcObject = remoteStream
      })
    }

    /**
     * Добавляем треки из localMediaStream к peerConnections
     */
    localMediaStreamRef.current?.getTracks().forEach((track) => {
      peerConnectionsRef.current![peerId].addTrack(track, localMediaStreamRef.current!)
    })

    /**
     * Если есть createOffer, тогда создаем offer и прикрепляется к peer соединению
     */
    if(createOffer) {
      const offer = await peerConnectionsRef.current![peerId].createOffer()
      await peerConnectionsRef.current![peerId].setLocalDescription(offer)

      socket.emit(ACTIONS.ROOM_RELAY_SDP, {
        peerId,
        sessionDescription: offer,
      })
    }
  }

  const setRemoteMedia = async ({ peerId, sessionDescription }: SessionDescriptionSocketPayload) => {
    /**
     * Прикрепляем SPD данные
     */
    await peerConnectionsRef.current![peerId]?.setRemoteDescription(
      new RTCSessionDescription(sessionDescription)
    )

    /**
     * Если пришел offer, тогда создаем answer
     */
    if (sessionDescription.type === 'offer') {
      console.log('offer', peerConnectionsRef.current![peerId])
      const answer = await peerConnectionsRef.current![peerId].createAnswer()
      await peerConnectionsRef.current![peerId].setLocalDescription(answer)

      socket.emit(ACTIONS.ROOM_RELAY_SDP, {
        peerId,
        sessionDescription: answer,
      })
    }
  }

  const iceCandidate = async ({ peerId, iceCandidate }: IceCandidateSocketPayload) => {
    await peerConnectionsRef.current![peerId].addIceCandidate(
      new RTCIceCandidate(iceCandidate)
    )
  }

  const removePeer = ({ peerId }: RemovePeerSocketPayload) => {
    /**
     * Закрываем соединение
     */
    if (peerConnectionsRef.current?.[peerId]) {
      peerConnectionsRef.current![peerId].close()
    }

    /**
     * Удаляем из peerConnectionsRef и peerMediaElements
     */
    delete peerConnectionsRef.current![peerId]
    delete peerMediaElements.current![peerId]
    updateClients((prev) => prev.filter((client) => client !== peerId))
  }

  useEffect(() => {
    socket.on(ACTIONS.ROOM_REMOVE_PEER, removePeer)
  }, [])

  useEffect(() => {
    socket.on(ACTIONS.ROOM_ICE_CANDIDATE, iceCandidate)
  }, [])

  useEffect(() => {
    socket.on(ACTIONS.ROOM_SESSION_DESCRIPTION, setRemoteMedia)
    return () => {
      socket.off(ACTIONS.ROOM_SESSION_DESCRIPTION)
    }
  }, [])

  useEffect(() => {
    socket.on(ACTIONS.ROOM_ADD_PEER, addNewPeer)
  }, [])

  useEffect(() => {
    startCapture()
      .then(() => socket.emit(ACTIONS.ROOM_JOIN, { room: roomId }))
      .catch(() => console.warn('Error getting user media'))

    return () => {
      if (localMediaStreamRef.current?.getTracks()) {
        localMediaStreamRef.current?.getTracks().forEach((track) => track.stop())
        socket.emit(ACTIONS.ROOM_LEAVE)
      }
    }
  }, [roomId])

  return { clients, provideMediaRef }
}