'use client'

import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { Button } from '@/components/ui/button'
import { init } from '@/lib/features/messages/messages.sliece'

export default function Content() {
  const messages = useAppSelector((state) => state.messagesSlice.messages)
  const dispatch = useAppDispatch()
  return (
    <div>
      <Button onClick={() => dispatch(init())}>initialize</Button>
      {messages.map((message) => (
        <p key={message}>{message}</p>
      ))}
    </div>
  )
}
