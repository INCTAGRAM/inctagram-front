import style from './RegistrationSuccessful.module.css'
import { Button } from '@/common/ui/button/Button'
import Image from 'next/image'
import bro from '@/public/bro.png'

export const RegistrationSuccessful = () => {
  return (
    <div className={style.congratulations}>
      <div className={style.row}>
        <h1>Registration Successful!</h1>
        <p>Your email has been confirmed</p>
        <Button className={style.signInBtn}>Sing In</Button>
        <Image src={bro} alt="Registration Successful!" width={432} height={300} />
      </div>
    </div>
  )
}
