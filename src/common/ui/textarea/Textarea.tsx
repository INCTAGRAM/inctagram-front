import React, { ChangeEvent, DetailedHTMLProps, forwardRef, KeyboardEvent, TextareaHTMLAttributes } from 'react'

import s from './Textarea.module.scss'

type DefaultTextareaPropsType = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>

type TextareaPropsType = DefaultTextareaPropsType & {
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: string
  spanClassName?: string
}

type Ref = HTMLTextAreaElement

export const Textarea = forwardRef<Ref, TextareaPropsType>(
  ({ onChange, onChangeText, onKeyDown, onEnter, error, className, spanClassName, ...restProps }, ref) => {
    Textarea.displayName = 'Textarea'

    const onChangeCallback = (e: ChangeEvent<HTMLTextAreaElement>) => {
      onChange && onChange(e)
      onChangeText && onChangeText(e.currentTarget.value)
    }

    const onKeyPressCallback = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      onKeyDown && onKeyDown(e)
      onEnter && e.key === 'Enter' && onEnter()
    }

    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''}`
    const finalTextareaClassName = `${s.textarea} ${error && s.errorTextarea} ${className}` // need to fix with (?:) and s.superInput

    return (
      <>
        <textarea
          ref={ref}
          onChange={onChangeCallback}
          onKeyDown={onKeyPressCallback}
          className={finalTextareaClassName}
          {...restProps}
        ></textarea>
        {error && <span className={finalSpanClassName}>{error}</span>}
      </>
    )
  }
)
