import { FormHTMLAttributes, forwardRef } from 'react'

export const Form = forwardRef<
  HTMLFormElement,
  FormHTMLAttributes<HTMLFormElement>
>((props, ref) => {
  return <form className="flex flex-col gap-3" ref={ref} {...props} />
})
