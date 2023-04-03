import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import style from './Button.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonPropsType = DefaultButtonPropsType & {
  className?: string
}

export const Button: React.FC<ButtonPropsType> = ({ className, ...restProps }) => {
  const finalClassName = `${style.button} ${className}`

  return <button className={finalClassName} {...restProps} />
}
