import styles from './GitHub.module.scss'
import { useSignInGitHubMutation } from '@/modules/auth/services/authService'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { RouteNames } from '@/constants/routes'
import { useAppDispatch } from '@/store/store'
import { addToken } from '@/store/tokenSlice'
import CircularProgress from '@mui/material/CircularProgress'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { Popup } from '@/common/ui/popup/Popup'
import { Button } from '@/common/ui/button/Button'

export const GitHub = () => {
  const dispatch = useAppDispatch()
  const [showPopupAboutMerge, setShowPopupAboutMerge] = useState(false)
  const [email, setEmail] = useState('')
  const [signInGitHub, { data, isSuccess, isError, error }] = useSignInGitHubMutation()
  const { query, push } = useRouter()

  useEffect(() => {
    if (typeof query.code === 'string') {
      signInGitHub({ code: query.code })
    }
  }, [query])

  useEffect(() => {
    if (data && data.accessToken) {
      dispatch(addToken(data.accessToken))
      push(RouteNames.PROFILE)
    }
  }, [isSuccess, data])

  useEffect(() => {
    if (error) {
      const err = error as FetchBaseQueryError
      if (err.data instanceof Object && 'email' in err.data && typeof err.data.email === 'string') {
        setEmail(err.data.email)
      }
      setShowPopupAboutMerge(true)
    }
  }, [isError, error])

  const closePopup = () => {
    setShowPopupAboutMerge(false)
    push(RouteNames.LOGIN)
  }

  return showPopupAboutMerge ? (
    <Popup title={'Email sent'} modalOnClick={closePopup} show={showPopupAboutMerge}>
      <div className={styles.popupContent}>
        <p>We have sent a link to confirm your email to {email}</p>
        <div>
          <Button onClick={closePopup}>OK</Button>
        </div>
      </div>
    </Popup>
  ) : (
    <div className={styles.loading}>
      <CircularProgress size={80} />
    </div>
  )
}
