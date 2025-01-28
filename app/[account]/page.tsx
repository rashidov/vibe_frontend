import MainLayout from '@/components/layouts/MainLayout'
import SideBar from '@/components/features/SideBar'

export default function Main() {
  return (
    <MainLayout>
      <SideBar />
      <div className="mx-4"></div>
    </MainLayout>
  )
}
