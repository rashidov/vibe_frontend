'use client'
import { LoginForm } from '@/components/Login/LoginForm'
import { UsedAccounts } from '@/components/Login/UsedAccounts'

export default function Login() {
  return (
    <div className="w-full mt-40 flex justify-center">
      <div className="w-96 flex flex-col gap-8">
        <LoginForm />
        <UsedAccounts />
      </div>
    </div>
  )
}
