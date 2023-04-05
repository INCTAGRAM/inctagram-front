import React from 'react'
import { FieldValues, SubmitHandler, useForm, UseFormReturn } from 'react-hook-form'

type FormProps<TFormValues extends FieldValues> = {
  onSubmit: SubmitHandler<TFormValues>
  LoginSchema: any
  children: (method: UseFormReturn<TFormValues>) => React.ReactNode
}

export const Form = <TFormValues extends FieldValues>({ onSubmit, LoginSchema, children }: FormProps<TFormValues>) => {
  const method = useForm<TFormValues>()
  return <form onSubmit={method.handleSubmit(onSubmit)}>{children(method)}</form>
}
