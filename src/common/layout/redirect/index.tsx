import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useRefreshTokenMutation } from '@/modules/auth/services/authService'
import { RouteNames } from '@/constants/routes'
import { useAppDispatch } from '@/store/store'
import { addToken, stopRefresh } from '@/store/tokenSlice'

const Redirect: FC<PropsWithChildren> = ({ children }) => {
  const { push } = useRouter()
  const dispath = useAppDispatch()
  const [edit, setEdit] = useState(false)

  const [refresh, { isError, isLoading, data, isSuccess }] = useRefreshTokenMutation()

  useEffect(() => {
    dispath(stopRefresh(true))
    refresh()
  }, [])

  useEffect(() => {
    if (data && isSuccess) {
      dispath(addToken(data.accessToken))
      setEdit(true)
    }
  }, [data])

  useEffect(() => {
    if (isError) push(RouteNames.LOGIN).then(() => setEdit(true))
  }, [isError])

  if (isLoading) return <h1>louding</h1>

  return edit ? <>{children}</> : null
}

export default Redirect
