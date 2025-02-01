'use client'

import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { SideBarSection } from '@/components/features/SideBar/Section'

export default function ChannelsSidebar() {
  return (
    <>
      <Input placeholder="search channels" />
      <Link className="text-zinc-300" href="messages">
        Messages
      </Link>
      <SideBarSection title="Channels" onAdd={() => {}} />
    </>
  )
}
