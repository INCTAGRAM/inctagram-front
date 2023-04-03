import React, { ChangeEvent, DetailedHTMLProps, forwardRef, InputHTMLAttributes, KeyboardEvent, useState } from 'react'
import style from './InputText.module.css'

// Пропсы стандартного инпута
type DefaultInputTextPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputTextPropsType = DefaultInputTextPropsType & {
  fieldName?: string
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: string
  spanClassName?: string
}

type Ref = HTMLInputElement

export const InputText = forwardRef<Ref, InputTextPropsType>(
  (
    { type, fieldName, onChange, onChangeText, onKeyDown, onEnter, error, className, spanClassName, ...restProps },
    ref
  ) => {
    InputText.displayName = 'InputText'

    const [inpValue, setInpValue] = useState('')
    const [fieldNameTop, setFieldNameTop] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      onChange && onChange(e)
      onChangeText && onChangeText(e.currentTarget.value)
      setInpValue(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
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
    const finalInputClassName = `${style.inputText} ${error && style.errorInput} ${className}`

    return (
      <>
        <label className={`${style.inputContainer} ${finalInputClassName}`}>
          <input
            ref={ref}
            type={'text'}
            onChange={onChangeHandler}
            onKeyDown={onKeyPressHandler}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            {...restProps}
          />
          {fieldName && (
            <span className={fieldNameTop ? `${style.fieldName} ${style.fieldNameTop}` : style.fieldName}>
              {fieldName}
            </span>
          )}
        </label>
        {error && <span className={finalSpanClassName}>{error}</span>}
      </>
    )
  }
)
