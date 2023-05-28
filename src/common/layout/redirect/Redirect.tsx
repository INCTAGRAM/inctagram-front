import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useRefreshTokenMutation } from '@/modules/auth/services/authService'
import { PublicRoutes, RouteNames } from '@/constants/routes'
import { useAppDispatch } from '@/store/store'
import { addToken, stopRefresh } from '@/store/tokenSlice'
import styles from '@/common/header/Header.module.scss'
import CircularProgress from '@mui/material/CircularProgress'

export const Redirect: FC<PropsWithChildren> = ({ children }) => {
  const { push, pathname } = useRouter()
  const [isBlockContent, setIsBlockContent] = useState(true)
  const dispatch = useAppDispatch()
  const [refresh, { isError, isLoading, data, isSuccess }] = useRefreshTokenMutation()

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
    if (isError) push(RouteNames.LOGIN).then(() => setIsBlockContent(false))
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
