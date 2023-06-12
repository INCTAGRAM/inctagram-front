import styles from './Header.module.scss'
import Image from 'next/image'
import Inctagram from '../../../public/logo/Inctagram.svg'
import { useRouter } from 'next/router'
import { RouteNames } from '@/constants/routes'
import IcomoonReact from 'icomoon-react'
import LogOut from '@/assets/icons/selection.json'
import { authService, useLogoutMutation } from '@/modules/auth/services/authService'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { setInitialTokenState, stopRefresh } from '@/store/tokenSlice'
import LinearProgress from '@mui/material/LinearProgress'
import { SuccessSnackbar } from '@/common/ui/alertSnackbar/SuccessSnackbar'
import { ErrorSnackbar } from '@/common/ui/alertSnackbar/ErrorSnackbar'
import CircularProgress from '@mui/material/CircularProgress'
import { useEffect } from 'react'
import { createPostService } from '@/modules/createPost'
import { postsService } from '@/modules/posts'
import { profileService } from '@/modules/profile'
import { clearState } from '@/store/appSlice'
import { setInitialPostsState } from '@/modules/posts/store/postsSlice'

interface IHeader {
  showLogout: boolean
}

export const Header = ({ showLogout }: IHeader) => {
  const [logout, { isSuccess, isError }] = useLogoutMutation()
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector((state) => state.appReducer.isLoading)
  const isGlobalLoading = useAppSelector((state) => state.appReducer.isGlobalLoading)
  const isClearState = useAppSelector((state) => state.appReducer.isClearState)
  const successAlert = useAppSelector((state) => state.appReducer.successAlert)
  const errorAlert = useAppSelector((state) => state.appReducer.errorAlert)
  const { push } = useRouter()

  const logoutHandler = () => {
    logout()
    dispatch(stopRefresh(true))
  }

  useEffect(() => {
    if (isSuccess || isError) dispatch(clearState(true))
  }, [isSuccess, isError])

  useEffect(() => {
    if (isClearState) {
      push(RouteNames.LOGIN).then(() => {
        dispatch(authService.util.resetApiState())
        dispatch(createPostService.util.resetApiState())
        dispatch(postsService.util.resetApiState())
        dispatch(profileService.util.resetApiState())
        dispatch(setInitialPostsState())
        dispatch(setInitialTokenState())
        dispatch(clearState(false))
      })
    }
  }, [isClearState])

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
