import style from './Header.module.scss'
import Image from 'next/image'
import Inctagram from './../../assets/image/Inctagram.svg'
import { useRouter } from 'next/navigation'
import { RouteNames } from '@/constants/routes'
import IcomoonReact from 'icomoon-react'
import LogOut from '@/assets/icons/selection.json'
import { useLogoutMutation } from '@/services/auth/authService'
import { useAppDispatch } from '@/services/redux/store'
import { addToken } from '@/services/redux/tokenReducer'

interface IHeader {
  showLogout: boolean
}

const Header = ({ showLogout }: IHeader) => {
  const [logout, { isSuccess }] = useLogoutMutation()
  const dispatch = useAppDispatch()
  const { push } = useRouter()
  const handler = () => {
    logout()
  }

  if (isSuccess) {
    push(RouteNames.LOGIN)
    dispatch(addToken(null))
  }

  return (
    <div className={style.headerContainer}>
      <Image src={Inctagram} alt={'logo'} className={style.logo} />
      {showLogout && (
        <div onClick={handler} className={style.logout}>
          <IcomoonReact iconSet={LogOut} icon={'log-out'} size={16} className={style.icon} color={'white'} />
          Log Out
        </div>
      )}
    </div>
  )
}

export default Header
