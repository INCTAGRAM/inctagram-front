import React, { PropsWithChildren } from 'react'
import s from './Form.module.scss'

interface IFormProps {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
}

const Form = ({ onSubmit, children }: PropsWithChildren<IFormProps>) => {
  return (
    <form className={s.form} onSubmit={onSubmit}>
      {children}
    </form>
  )
}

export default Form
