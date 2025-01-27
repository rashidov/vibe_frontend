'use client'
import { useForm } from 'react-hook-form'
import { z, ZodType } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/Form'
import { FormInputField } from '@/components/Form/InputField'
import { useLocalAccounts } from '@/components/Login/hooks'
import { redirect } from 'next/navigation'

type LoginFormData = {
  login: string
}

const LoginFormSchema: ZodType<LoginFormData> = z.object({
  login: z.string().min(3).max(10),
})

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
  })
  const { setAccount } = useLocalAccounts()

  const submit = (data: LoginFormData) => {
    const account = data.login.replace(/@/g, '')
    setAccount(account)
    redirect(`/${account}`)
  }

  return (
    <>
      <Form onSubmit={handleSubmit(submit)}>
        <FormInputField<LoginFormData>
          name="login"
          register={register}
          error={errors.login}
          placeholder="@login"
        />
        <Button type="submit" className="font-semibold">
          login
        </Button>
      </Form>
    </>
  )
}
