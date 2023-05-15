import React, { ChangeEvent, FC } from 'react'
import styles from './TextAria.module.scss'
import TextField from '@mui/material/TextField'
import { addDescription } from '@/services/redux/createPostReducer'
import { useAppDispatch } from '@/services/redux/store'

export const TextArea: FC<PropsType> = ({ inputValue }) => {
  const dispatch = useAppDispatch()
  const maxLength = 500

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (value.length <= maxLength) {
      dispatch(addDescription(value))
    }
  }

  return (
    <form noValidate autoComplete="off">
      <div>
        <TextField
          value={inputValue}
          sx={stylesTextField}
          id="outlined-multiline-static"
          label="Add publication descriptions"
          multiline
          rows={4}
          variant="outlined"
          onChange={handleChange}
          inputProps={{ maxLength }}
        />
        <div className={styles.characterLimit}>{`${inputValue.length}/${maxLength}`}</div>
      </div>
    </form>
  )
}

type PropsType = {
  inputValue: string
}

const stylesTextField = {
  '& label, & .MuiInputBase-input': {
    color: '#BDC1C7',
    fontWeight: 'bold',
  },
  width: '403px',
  background: '#171717',
  margin: '24px 0 0 24px',
}
