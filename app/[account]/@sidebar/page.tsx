'use client'

import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function SideBar() {
  const params = useParams()
  return (
    <>
      <Input placeholder="search friends or channels" />
      <div className="flex flex-col gap-4">
        <Link className="text-zinc-300" href={`${params.account}/messages`}>
          Messages
        </Link>
        <Link className="text-zinc-300" href={`${params.account}/channels`}>
          Channels
        </Link>
      </div>
    </>
  )
}
