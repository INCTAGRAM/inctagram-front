import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import style from './Button.module.scss'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonPropsType = DefaultButtonPropsType & {
  color?: 'primary' | 'secondary'
  variant?: 'contained' | 'outlined'
  className?: string
}

export const Button: React.FC<ButtonPropsType> = ({ color, variant, className, ...restProps }) => {
  const colorClass = color ?? 'primary'
  const variantClass = variant ?? 'contained'

  const finalClassName = `${style.button} ${className} ${style[colorClass]} ${style[variantClass]}`

  return <button className={finalClassName} {...restProps} />
}
