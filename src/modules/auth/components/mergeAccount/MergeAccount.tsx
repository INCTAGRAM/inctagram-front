import styles from './MergeAccount.module.scss'
import { useRouter } from 'next/router'
import { Button } from '@/common/ui/button/Button'
import image from '@/../public/auth/bro1.png'
import Image from 'next/image'
import { useEffect } from 'react'
import { useMergeAccountMutation } from '@/modules/auth/services/authService'
import { useAppDispatch } from '@/store/store'
import { RouteNames } from '@/constants/routes'
import { addToken } from '@/store/appSlice'

export const MergeAccount = () => {
  const dispatch = useAppDispatch()
  const [merge, { data, isSuccess }] = useMergeAccountMutation()
  const { query, push } = useRouter()

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(addToken(data.accessToken))
      push(RouteNames.PROFILE)
    }
  }, [data, isSuccess, push])

  const yesHandler = () => {
    if (typeof query.code === 'string') {
      merge({ code: query.code })
    }
  }

  const noHandler = () => {
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
