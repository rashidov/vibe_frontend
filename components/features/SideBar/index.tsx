'use client'
import { Input } from '@/components/ui/input'
import { SideBarSection } from '@/components/features/SideBar/Section'

const SideBar = () => {
  return (
    <div className="w-96 border-r border-solid border-zinc-800 pr-4 flex flex-col gap-8 h-full">
      <Input placeholder="search friends" />
      <SideBarSection title="Messages" onAdd={() => {}} />
      <SideBarSection title="Channels" onAdd={() => {}} />
      {/*<div>adsadasds</div>*/}
    </div>
  )
}

export default SideBar
