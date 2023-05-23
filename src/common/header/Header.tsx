import styles from './Header.module.scss'
import Image from 'next/image'
import Inctagram from './../../assets/image/Inctagram.svg'
import { useRouter } from 'next/navigation'
import { RouteNames } from '@/constants/routes'
import IcomoonReact from 'icomoon-react'
import LogOut from '@/assets/icons/selection.json'
import { useLogoutMutation } from '@/services/auth/authService'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { addToken } from '@/store/tokenReducer'
import LinearProgress from '@mui/material/LinearProgress'

interface IHeader {
  showLogout: boolean
}

const Header = ({ showLogout }: IHeader) => {
  const [logout, { isSuccess }] = useLogoutMutation()
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector((state) => state.appReducer.isLoading)
  const { push } = useRouter()
  const handler = () => {
    logout()
  }

  if (isSuccess) {
    push(RouteNames.LOGIN)
    dispatch(addToken(null))
  }

  return (
    <div className={styles.headerContainer}>
      <div className={styles.linerLoading}>{isLoading && <LinearProgress />}</div>
      <Image src={Inctagram} alt={'logo'} className={styles.logo} />
      {showLogout && (
        <div onClick={handler} className={styles.logout}>
          <IcomoonReact iconSet={LogOut} icon={'log-out'} size={16} className={styles.icon} color={'white'} />
          Log Out
        </div>
      )}
    </div>
  )
}

export default Header
