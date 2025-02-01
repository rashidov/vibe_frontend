import { Metadata } from 'next'
import { ReactNode } from 'react'
import MainLayout from '@/components/layouts/MainLayout'
import SideBar from '@/components/features/SideBar'
import { Input } from '@/components/ui/input'
import { SideBarSection } from '@/components/features/SideBar/Section'

export const metadata: Metadata = {
  title: 'Vibe messages',
  description: 'User messages',
}

export default function AccountLayout({
  sidebar,
  content,
}: Readonly<{ sidebar: ReactNode; content: ReactNode }>) {
  return (
    <MainLayout>
      <SideBar>{sidebar}</SideBar>
      <div className="w-full mx-4">{content}</div>
    </MainLayout>
  )
}
