'use client'

import {FC} from "react";
import {LOCAL, useWebRTC} from "@/hooks/useWebRTC";
import {Button} from "@/components/ui/button";

type Props = {
  roomId: string
  onDisconnect: () => void
}

const Room: FC<Props> = ({ roomId, onDisconnect }) => {
  const {clients, provideMediaRef} = useWebRTC(roomId)

  return (
    <div className="d-flex flex-col gap-3">
      <p>room: {roomId}</p>
      <div className="d-flex flex-col gap-2">
        {clients.map((client) => (
          <div key={client} className="d-flex gap-1">
            <p>client: {client}</p>
            <audio muted={client === LOCAL} ref={(instance) => provideMediaRef(client, instance)} />
          </div>
        ))}
        <Button size="sm" onClick={onDisconnect}>disconnect</Button>
      </div>
    </div>
  )
}

export default Room