import style from './Header.module.scss'
import Image from 'next/image'
import Inctagram from './../../assets/image/Inctagram.svg'
import { Logout } from '@/utils'
import { useRouter } from 'next/navigation'
import { RouteNames } from '@/constants/routes'
import IcomoonReact from 'icomoon-react'
import LogOut from '@/assets/icons/selection.json'

interface IHeader {
  logout: boolean
}

const Header = ({ logout }: IHeader) => {
  const { push } = useRouter()

  const handler = () => {
    Logout().then(() => push(RouteNames.LOGIN))
  }

  return (
    <div className={style.headerContainer}>
      <Image src={Inctagram} alt={'logo'} className={style.logo} />
      {!logout && (
        <div onClick={handler} className={style.logout}>
          <IcomoonReact iconSet={LogOut} icon={'log-out'} size={16} className={style.icon} color={'white'} />
          Log Out
        </div>
      )}
    </div>
  )
}

export default Header
