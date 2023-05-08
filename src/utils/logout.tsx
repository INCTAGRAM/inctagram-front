import { useLogoutMutation } from '@/services/auth/authService'
import { ErrorSnackbar } from '@/common/alertSnackbar/ErrorSnackbar'
import { IErrorResponse } from '@/services/auth/types'

export const Logout = () => {
  const [logout, { error, isError }] = useLogoutMutation()
  logout({})
  localStorage.removeItem('accessToken')
  return isError ? <ErrorSnackbar error={error as IErrorResponse} /> : null
}
