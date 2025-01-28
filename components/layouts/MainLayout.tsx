import { FC, ReactNode } from 'react'
import Header from '@/components/Header'

type Props = {
  children: ReactNode | ReactNode[]
}

const MainLayout: FC<Props> = ({ children }) => (
  <div className="flex flex-col h-full max-h-full">
    <Header />
    <div className="flex h-full max-h-full overflow-hidden mb-5">
      {children}
    </div>
  </div>
)

export default MainLayout
