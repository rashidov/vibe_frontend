import { CSSProperties, FC } from 'react'
import { Plus } from 'lucide-react'

const style: {
  wrapper: CSSProperties
  content: CSSProperties
} = {
  wrapper: { maxHeight: '50%' },
  content: { maxHeight: '100%' },
}

type TitleProps = {
  title: string
  onAdd: () => void
}

const Title: FC<TitleProps> = ({ title, onAdd }) => (
  <div className="absolute top-0 h-6 w-full bg-zinc-950 flex justify-end gap-3 text-zinc-500 text-mono text-md">
    <div
      onClick={onAdd}
      className="flex items-center gap-3 hover:text-purple-500 select-none cursor-pointer duration-150"
    >
      <p>{title}</p>
      <Plus size={20} />
    </div>
  </div>
)

const Item = () => (
  <div className="px-4 h-9 min-h-9 flex items-center overflow-hidden duration-150 bg-primary hover:bg-slate-800 text-stone-400 hover:text-sky-600 text-md font-semibold rounded-md cursor-pointer select-none">
    <p>account</p>
  </div>
)

const TopBgGradientDivider = () => (
  <div className="absolute top-6 w-full bg-gradient-to-b from-zinc-950 min-h-3" />
)
const BottomBgGradientDivider = () => (
  <div className="absolute bottom-0 w-full bg-gradient-to-t from-zinc-950 min-h-3" />
)

const TopFakeItem = () => <div className="min-h-8" />
const BottomFakeItem = () => <div className="min-h-1" />

type Props = {
  title: string
  onAdd: () => void
}

export const SideBarSection: FC<Props> = ({ title, onAdd }) => {
  return (
    <div
      className="relative flex flex-col gap-2 overflow-hidden"
      style={style.wrapper}
    >
      <Title title={title} onAdd={onAdd} />
      <TopBgGradientDivider />
      <div className="flex flex-col gap-2 overflow-auto" style={style.content}>
        <TopFakeItem />
        <Item />
        <BottomFakeItem />
      </div>
      <BottomBgGradientDivider />
    </div>
  )
}
