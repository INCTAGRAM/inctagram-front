import styles from './GitHubPage.module.scss'
import { useSignInGitHubMutation } from '@/modules/auth/services/authService'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { RouteNames } from '@/constants/routes'
import { useAppDispatch } from '@/store/store'
import { addToken } from '@/store/tokenSlice'
import CircularProgress from '@mui/material/CircularProgress'

export const GitHubPage = () => {
  const dispatch = useAppDispatch()
  const [signInGitHub, { data, isSuccess }] = useSignInGitHubMutation()
  const { query, push } = useRouter()

  useEffect(() => {
    if (typeof query.code === 'string') {
      signInGitHub({ code: query.code })
    }
  }, [query])

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(addToken(data.accessToken))
      push(RouteNames.PROFILE)
    }
  }, [isSuccess])

  return (
    <div className={styles.loading}>
      <CircularProgress size={80} />
    </div>
  )
}
