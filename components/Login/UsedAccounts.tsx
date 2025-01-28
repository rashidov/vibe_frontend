'use client'
import { FC } from 'react'
import { useLocalAccounts } from '@/components/Login/hooks'
import { redirect } from 'next/navigation'

const Account: FC<{ account: string }> = ({ account }) => {
  return (
    <div
      className="flex justify-center py-2 bg-slate-800 hover:bg-slate-900 transition duration-150 font-semibold rounded-md text-sky-500 text-md cursor-pointer select-none"
      onClick={() => redirect(`/${account}`)}
    >
      <span>@{account}</span>
    </div>
  )
}

export const UsedAccounts = () => {
  const { getAccounts } = useLocalAccounts()
  const accounts = getAccounts()
  return (
    !!accounts.length && (
      <>
        <p className="text-sky-500 text-center">or use a prev you accounts</p>
        <div className="flex flex-col gap-2">
          {getAccounts().map((account) => (
            <Account key={account} account={account} />
          ))}
        </div>
      </>
    )
  )
}
