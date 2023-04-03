import React, { ChangeEvent, DetailedHTMLProps, forwardRef, InputHTMLAttributes, KeyboardEvent, useState } from 'react'
import style from './InputPassword.module.css'
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

    const [inpValue, setInpValue] = useState('')
    const [fieldNameTop, setFieldNameTop] = useState(false)
    const [showPass, setShowPass] = useState(false)

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e)
      onChangePassword && onChangePassword(e.currentTarget.value)
      setInpValue(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown && onKeyDown(e)
      onEnter && e.key === 'Enter' && onEnter()
    }

    const onFocusHandler = () => setFieldNameTop(true)

    const onBlurHandler = () => {
      if (!inpValue.length) {
        setFieldNameTop(false)
      }
    }

    const finalSpanClassName = `${style.error} ${spanClassName ? spanClassName : ''}`
    const finalInputClassName = `${style.inputPassword} ${error && style.errorInput} ${className}`

    return (
      <>
        <label className={`${style.inputContainer} ${finalInputClassName}`}>
          <input
            ref={ref}
            type={showPass ? 'text' : 'password'}
            onChange={onChangeCallback}
            onKeyDown={onKeyPressCallback}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            {...restProps}
          />
          {fieldName && (
            <span className={fieldNameTop ? `${style.fieldName} ${style.fieldNameTop}` : style.fieldName}>
              {fieldName}
            </span>
          )}
          <span onClick={() => setShowPass(!showPass)}>
            {showPass ? (
              <IcomoonReact className={style.icon} iconSet={iconSet} icon={'eye-off-outline'} size={24} />
            ) : (
              <IcomoonReact className={style.icon} iconSet={iconSet} icon={'eye-outline'} size={24} />
            )}
          </span>
        </label>
        {error && <span className={finalSpanClassName}>{error}</span>}
      </>
    )
  }
)
