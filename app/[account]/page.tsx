import Header from '@/components/Header'

export default function UserHome() {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex h-full mb-5">
        <div className="w-96 border-r border-solid border-zinc-800 pr-4"></div>
        <div className="mx-4"></div>
      </div>
    </div>
  )
}
