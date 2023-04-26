import style from './Header.module.scss'
import Image from 'next/image'
import Inctagram from './../../assets/image/Inctagram.svg'
import { authService } from '@/services/auth/authService'

interface IHeader {
  logout: boolean
}

const Header = ({ logout }: IHeader) => {
  const handler = () => {
    authService.logout()
  }
  return (
    <div className={style.headerContainer}>
      <Image src={Inctagram} alt={'logo'} className={style.logo} />
      {!logout && <button onClick={handler}>logout</button>}
    </div>
  )
}

export default Header
