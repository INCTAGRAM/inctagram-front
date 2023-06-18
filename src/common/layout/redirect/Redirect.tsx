import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useRefreshTokenMutation } from '@/modules/auth/services/authService'
import { PublicRoutes, RouteNames } from '@/constants/routes'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { addToken, stopRefresh } from '@/store/tokenSlice'
import styles from '@/common/header/Header.module.scss'
import CircularProgress from '@mui/material/CircularProgress'
import { clearAllState } from '@/store/appSlice'

export const Redirect: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch()
  const isClearStateAndRedirectLogin = useAppSelector((state) => state.appReducer.isClearStateAndRedirectLogin)
  const { push, pathname } = useRouter()
  const [isBlockContent, setIsBlockContent] = useState(true)
  const [refresh, { isError, isLoading, data, isSuccess }] = useRefreshTokenMutation()

  useEffect(() => {
    if (isClearStateAndRedirectLogin)
      push(RouteNames.LOGIN).then(() => {
        dispatch(clearAllState())
      })
  }, [isClearStateAndRedirectLogin])

  useEffect(() => {
    if (!PublicRoutes.find((route) => route === pathname)) {
      dispatch(stopRefresh(true))
      refresh()
    } else {
      setIsBlockContent(false)
    }
  }, [])

  useEffect(() => {
    if (data && isSuccess) {
      dispatch(addToken(data.accessToken))
      setIsBlockContent(false)
    }
  }, [data])

  useEffect(() => {
    if (isError) {
      push(RouteNames.LOGIN).then(() => {
        dispatch(clearAllState())
        setIsBlockContent(false)
      })
    }
  }, [isError])

  if (isLoading) {
    return (
      <div className={styles.globalLoading}>
        <CircularProgress size={80} />
      </div>
    )
  }

  return isBlockContent ? null : <>{children}</>
}
