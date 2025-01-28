'use client'

import { useCallback } from 'react'

const accountsLocalKey = 'vibe_accounts'

export const useLocalAccounts = () => {
  const getAccounts: () => string[] = useCallback(
    () =>
      typeof window === 'undefined'
        ? []
        : JSON.parse(localStorage.getItem(accountsLocalKey) || '[]'),
    [],
  )

  const setAccount = (name: string) => {
    const accounts = getAccounts().filter((account) => account !== name)
    localStorage.setItem(accountsLocalKey, JSON.stringify([...accounts, name]))
  }

  return { getAccounts, setAccount }
}
