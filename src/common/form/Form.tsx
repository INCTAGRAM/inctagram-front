import React from 'react'
import { FieldValues, SubmitHandler, useForm, UseFormReturn } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

type FormProps<TFormValues extends FieldValues> = {
  onSubmit: SubmitHandler<TFormValues>
  children: (method: UseFormReturn<TFormValues>) => React.ReactNode
  classname: string
  schema: any
}

export const Form = <TFormValues extends FieldValues>({
  onSubmit,
  schema,
  classname,
  children,
}: FormProps<TFormValues>) => {
  const method = useForm<TFormValues>({ resolver: yupResolver(schema) })
  return (
    <form className={classname} onSubmit={method.handleSubmit(onSubmit)}>
      {children(method)}
    </form>
  )
}
