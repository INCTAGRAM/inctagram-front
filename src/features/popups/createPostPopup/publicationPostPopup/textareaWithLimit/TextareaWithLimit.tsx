import React, { FC } from 'react'
import styles from './TextareaWithLimit.module.scss'
import { addDescription } from '@/services/redux/createPostReducer'
import { useAppDispatch } from '@/services/redux/store'
import { Textarea } from '@/common/ui/textarea/Textarea'

export const TextareaWithLimit: FC<PropsType> = ({ label, inputValue, maxLength }) => {
  const dispatch = useAppDispatch()

  const handleChange = (value: string) => {
    if (value.length <= maxLength) {
      dispatch(addDescription(value))
    }
  }

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor="inputField">
        {label}
      </label>
      <Textarea
        id={'inputField'}
        onChangeText={handleChange}
        className={styles.textarea}
        placeholder={'some description...'}
      />
      <div className={styles.characterLimit}>{`${inputValue.length}/${maxLength}`}</div>
    </div>
  )
}

type PropsType = {
  inputValue: string
  maxLength: number
  label?: string
}
