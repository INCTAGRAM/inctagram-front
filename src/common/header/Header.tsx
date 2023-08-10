import styles from './Header.module.scss'
import Image from 'next/image'
import Inctagram from '../../../public/logo/Inctagram.svg'
import IcomoonReact from 'icomoon-react'
import LogOut from '@/assets/icons/selection.json'
import { useLogoutMutation } from '@/modules/auth/services/authService'
import { useAppDispatch, useAppSelector } from '@/store/store'
import LinearProgress from '@mui/material/LinearProgress'
import { SuccessSnackbar } from '@/common/ui/alertSnackbar/SuccessSnackbar'
import { ErrorSnackbar } from '@/common/ui/alertSnackbar/ErrorSnackbar'
import CircularProgress from '@mui/material/CircularProgress'
import { useEffect } from 'react'
import { clearStateAndRedirectLogin } from '@/store/appSlice'

interface IHeader {
  showLogout: boolean
}

export const Header = ({ showLogout }: IHeader) => {
  const [logout, { isSuccess, isError }] = useLogoutMutation()
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector((state) => state.appReducer.isLoading)
  const isGlobalLoading = useAppSelector((state) => state.appReducer.isGlobalLoading)
  const successAlert = useAppSelector((state) => state.appReducer.successAlert)
  const errorAlert = useAppSelector((state) => state.appReducer.errorAlert)

  const logoutHandler = () => {
    logout()
  }

  useEffect(() => {
    if (isSuccess || isError) dispatch(clearStateAndRedirectLogin(true))
  }, [isSuccess, isError])

  return (
    <>
      {isGlobalLoading && (
        <div className={styles.globalLoading}>
          <CircularProgress size={80} />
        </div>
      )}
      <div className={styles.headerContainer}>
        <div className={styles.linerLoading}>{isLoading ? <LinearProgress /> : ''}</div>
        <Image src={Inctagram} alt={'logo'} className={styles.logo} />
        {showLogout && (
          <div onClick={logoutHandler} className={styles.logout}>
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
