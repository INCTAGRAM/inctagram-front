import styles from './MergeAccount.module.scss'
import { useRouter } from 'next/router'
import { Button } from '@/common/ui/button/Button'
import image from '@/../public/auth/bro1.png'
import Image from 'next/image'
import { useEffect } from 'react'
import { useMergeAccountMutation } from '@/modules/auth/services/authService'
import { useAppDispatch } from '@/store/store'
import { addToken } from '@/store/tokenSlice'
import { RouteNames } from '@/constants/routes'

export const MergeAccount = () => {
  const dispatch = useAppDispatch()
  const [merge, { data, isSuccess }] = useMergeAccountMutation()
  debugger
  const { query, push } = useRouter()

  useEffect(() => {
    if (isSuccess && data) {
      debugger
      dispatch(addToken(data.accessToken))
      push(RouteNames.PROFILE)
    }
  }, [data?.accessToken, isSuccess])

  const yesHandler = () => {
    if (typeof query.code === 'string') {
      debugger
      merge({ code: query.code })
    }
  }

  const noHandler = () => {
    debugger
    push(RouteNames.LOGIN)
  }

  return (
    <div className={styles.mergeBlock}>
      <h1>Merger of Accounts</h1>
      <p>The user with this email is already in the system. Could we merge this accounts?</p>
      <Button variant={'outlined'} onClick={yesHandler}>
        Yes, merge
      </Button>
      <Button variant={'outlined'} onClick={noHandler}>
        No
      </Button>
      <Image src={image} alt="" />
    </div>
  )
}
