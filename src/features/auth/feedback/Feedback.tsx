import authStyles from '@/features/screens/authPages/authPages.module.scss'
import style from './Feedback.module.scss'
import { Button } from '@/common/ui/button/Button'
import Image from 'next/image'

interface IFeedback {
  title: string
  info: string
  image: string
  actionBtnTitle?: string
  action?: () => void
}

const Feedback = ({ title, info, image, actionBtnTitle, action }: IFeedback) => {
  const { src, width, height } = image

  return (
    <div className={authStyles.authPage}>
      <div className={style.content}>
        <div className={style.info_content}>
          <h1>{title}</h1>
          <p>{info}</p>
          <div>
            <Button onClick={action}>{actionBtnTitle}</Button>
          </div>
        </div>
        <Image src={src} width={width} height={height} priority="false" alt="" />
      </div>
    </div>
  )
}

export default Feedback
