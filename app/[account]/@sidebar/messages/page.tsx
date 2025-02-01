'use client'

import { Input } from '@/components/ui/input'
import { SideBarSection } from '@/components/features/SideBar/Section'
import Link from 'next/link'

export default function MessagesSidebar() {
  return (
    <>
      <Input placeholder="search friends" />
      <Link className="text-zinc-300" href="channels">
        Channels
      </Link>
      <SideBarSection title="Messages" onAdd={() => {}} />
    </>
  )
}
