import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useRefreshTokenMutation } from '@/modules/auth/services/authService'
import { alwaysAvailableRoutes, RouteNames } from '@/constants/routes'
import { useAppDispatch } from '@/store/store'
import { addToken, stopRefresh } from '@/store/tokenSlice'
import styles from '@/common/header/Header.module.scss'
import CircularProgress from '@mui/material/CircularProgress'

export const Redirect: FC<PropsWithChildren> = ({ children }) => {
  const { push, pathname } = useRouter()
  const [blockContent, setBlockContent] = useState(false)
  const dispath = useAppDispatch()
  const [refresh, { isError, isLoading, data, isSuccess }] = useRefreshTokenMutation()

  useEffect(() => {
    if (alwaysAvailableRoutes.findIndex((route) => route === pathname)) {
      dispath(stopRefresh(true))
      refresh()
    } else {
      setBlockContent(true)
    }
  }, [])

  useEffect(() => {
    if (data && isSuccess) {
      dispath(addToken(data.accessToken))
      setBlockContent(true)
    }
  }, [data])

  useEffect(() => {
    if (isError) push(RouteNames.LOGIN).then(() => setBlockContent(true))
  }, [isError])

  if (isLoading) {
    return (
      <div className={styles.globalLoading}>
        <CircularProgress size={80} />
      </div>
    )
  }

  return blockContent ? <>{children}</> : <div></div>
}
