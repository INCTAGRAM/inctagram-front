import { useConfirmationMutation } from '@/modules/auth/services/authService'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { RouteNames } from '@/constants/routes'
import { IErrorResponse } from '@/modules/auth/services/types'
import { RegistrationSuccess } from '@/modules/auth'

export const Confirmation = () => {
  const [confirmation, { isSuccess, isError, error }] = useConfirmationMutation()
  const { push, query } = useRouter()

  useEffect(() => {
    if (typeof query.code === 'string' && typeof query.email === 'string') {
      confirmation({ code: query.code })
    }
  }, [query])

  useEffect(() => {
    if (isError && error) {
      const err = error as IErrorResponse
      if (err.data.statusCode === 410 && typeof query.email === 'string') {
        push({ pathname: RouteNames.RECOVERY_EXPIRED, query: { email: query.email } })
      } else {
        push(RouteNames.LOGIN)
      }
    }
  }, [error])

  if (isSuccess) {
    return <RegistrationSuccess />
  }

  return null
}
