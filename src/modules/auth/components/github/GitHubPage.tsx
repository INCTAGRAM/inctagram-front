import { useSignInGitHubMutation } from '@/modules/auth/services/authService'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { RouteNames } from '@/constants/routes'
import { useAppDispatch } from '@/store/store'
import { addToken } from '@/store/tokenSlice'
import { Button } from '@/common/ui/button/Button'

export const GitHubPage = () => {
  const dispatch = useAppDispatch()
  const [signInGitHub, { data, isSuccess }] = useSignInGitHubMutation()
  const { query, push } = useRouter()

  // useEffect(() => {
  //   console.log(typeof query.code)
  //   if (typeof query.code === 'string') {
  //     signInGitHub({ code: query.code })
  //   }
  // }, [query])

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(addToken(data.accessToken))
      push(RouteNames.PROFILE)
    }
  }, [isSuccess])

  const onClickHandler = () => {
    if (typeof query.code === 'string') {
      signInGitHub({ code: query.code })
    }
  }

  return <Button onClick={onClickHandler}>signup</Button>
}
