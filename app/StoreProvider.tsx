'use client'
import { ReactNode, useRef } from 'react'
import { Provider } from 'react-redux'
import { AppStore, setupStore } from '@/lib/store'

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore>(undefined)
  if (!storeRef.current) {
    storeRef.current = setupStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}
