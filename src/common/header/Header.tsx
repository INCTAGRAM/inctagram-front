import styles from './Header.module.scss'
import Image from 'next/image'
import Inctagram from '../../../public/logo/Inctagram.svg'
import { useRouter } from 'next/navigation'
import { RouteNames } from '@/constants/routes'
import IcomoonReact from 'icomoon-react'
import LogOut from '@/assets/icons/selection.json'
import { useLogoutMutation } from '@/modules/auth/services/authService'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { addToken } from '@/store/tokenSlice'
import LinearProgress from '@mui/material/LinearProgress'
import { SuccessSnackbar } from '@/common/ui/alertSnackbar/SuccessSnackbar'
import { ErrorSnackbar } from '@/common/ui/alertSnackbar/ErrorSnackbar'
import CircularProgress from '@mui/material/CircularProgress'
import { useEffect } from 'react'

interface IHeader {
  showLogout: boolean
}

export const Header = ({ showLogout }: IHeader) => {
  const [logout, { isSuccess }] = useLogoutMutation()
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector((state) => state.appReducer.isLoading)
  const isGlobalLoading = useAppSelector((state) => state.appReducer.isGlobalLoading)
  const successAlert = useAppSelector((state) => state.appReducer.successAlert)
  const errorAlert = useAppSelector((state) => state.appReducer.errorAlert)
  const { push } = useRouter()
  const handler = () => {
    logout()
  }

  useEffect(() => {
    if (isSuccess) {
      push(RouteNames.LOGIN)
      dispatch(addToken(null))
    }
  }, [isSuccess])

  return (
    <>
      {isGlobalLoading && (
        <div className={styles.globalLoading}>
          <CircularProgress size={80} />
        </div>
      )}
      <div className={styles.headerContainer}>
        <div className={styles.linerLoading}>{isLoading && <LinearProgress />}</div>
        <Image src={Inctagram} alt={'logo'} className={styles.logo} />
        {showLogout && (
          <div onClick={handler} className={styles.logout}>
            <IcomoonReact iconSet={LogOut} icon={'log-out'} size={16} className={styles.icon} color={'white'} />
            Log Out
          </div>
        )}
        {successAlert && <SuccessSnackbar message={successAlert} />}
        {errorAlert && <ErrorSnackbar error={errorAlert} />}
      </div>
    </>
  )
}
