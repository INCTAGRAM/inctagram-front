import React, { ChangeEvent, DetailedHTMLProps, forwardRef, InputHTMLAttributes, KeyboardEvent, useState } from 'react'
import style from './InputPassword.module.scss'
import IcomoonReact from 'icomoon-react'
import iconSet from '@/assets/icons/selection.json'

// Пропсы стандартного инпута
type DefaultInputPasswordPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputPasswordPropsType = DefaultInputPasswordPropsType & {
  fieldName?: string
  onChangePassword?: (value: string) => void
  onEnter?: () => void
  error?: string
  spanClassName?: string
}

type Ref = HTMLInputElement

export const InputPassword = forwardRef<Ref, InputPasswordPropsType>(
  (
    { type, fieldName, onChange, onChangePassword, onKeyDown, onEnter, error, className, spanClassName, ...restProps },
    ref
  ) => {
    InputPassword.displayName = 'InputText'

    const [showPass, setShowPass] = useState(false)

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e)
      onChangePassword && onChangePassword(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown && onKeyDown(e)
      onEnter && e.key === 'Enter' && onEnter()
    }

    const finalSpanClassName = `${style.error} ${spanClassName ? spanClassName : ''}`
    const finalInputClassName = `${style.inputPassword} ${error && style.errorInput} ${className}`

    return (
      <>
        <label className={`${style.inputContainer} ${finalInputClassName}`}>
          {fieldName && <span className={style.fieldName}>{fieldName}</span>}
          <input
            ref={ref}
            type={showPass ? 'text' : 'password'}
            onChange={onChangeCallback}
            onKeyDown={onKeyPressCallback}
            {...restProps}
          />
          <span onClick={() => setShowPass(!showPass)}>
            {showPass ? (
              <IcomoonReact className={style.icon} iconSet={iconSet} icon={'eye-off-outline'} size={24} />
            ) : (
              <IcomoonReact className={style.icon} iconSet={iconSet} icon={'eye-outline'} size={24} />
            )}
          </span>
          {error && <span className={finalSpanClassName}>{error}</span>}
        </label>
      </>
    )
  }
)
