import { Input } from '@/components/ui/input'
import { FieldError, Path, UseFormRegister } from 'react-hook-form'

export type FormInputFieldProps<
  FormData extends Record<string, string | number>,
> = {
  type?: string
  placeholder?: string
  name: Path<FormData>
  register: UseFormRegister<FormData>
  error: FieldError | undefined
  valueAsNumber?: boolean
}

export const FormInputField = <
  FormData extends Record<string, string | number>,
>({
  type = 'text',
  name,
  error,
  placeholder,
  register,
}: FormInputFieldProps<FormData>) => {
  return (
    <div className="flex flex-col gap-2">
      <Input type={type} placeholder={placeholder} {...register(name)} />
      {error && <span className="text-sm text-pink-700">{error.message}</span>}
    </div>
  )
}
