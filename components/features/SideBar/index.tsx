import { ReactNode } from 'react'

export default function SideBar({ children }: { children: ReactNode }) {
  return (
    <div className="w-96 border-r border-solid border-zinc-800 pr-4 flex flex-col gap-8 h-full">
      {children}
      {/*<Input placeholder="search friends" />*/}
      {/*<SideBarSection title="Messages" onAdd={() => {}} />*/}
      {/*<SideBarSection title="Channels" onAdd={() => {}} />*/}
      {/*/!*<div>adsadasds</div>*!/*/}
    </div>
  )
}
