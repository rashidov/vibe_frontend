'use client'

const accountsLocalKey = 'vibe_accounts'

export const useLocalAccounts = () => {
  const getAccounts = () =>
    JSON.parse(localStorage.getItem(accountsLocalKey) || '[]') as string[]

  const setAccount = (name: string) => {
    const accounts = getAccounts().filter((account) => account !== name)
    localStorage.setItem(accountsLocalKey, JSON.stringify([...accounts, name]))
  }

  return { getAccounts, setAccount }
}
