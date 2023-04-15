import style from './Header.module.scss'
import Image from 'next/image'
import Inctagram from './../../assets/image/Inctagram.svg'

interface IHeader {
  logout: boolean
}

const Header = ({ logout }: IHeader) => {
  return (
    <div className={style.headerContainer}>
      <Image src={Inctagram} alt={'logo'} className={style.logo} />
    </div>
  )
}

export default Header
