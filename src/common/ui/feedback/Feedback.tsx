import style from './Feedback.module.scss'
import { Button } from '@/common/ui/button/Button'
import Image from 'next/image'

interface IFeedback {
  title: string
  info: string
  image: any
  actionBtnTitle?: string
  action?: () => void
}

const Feedback = ({ title, info, image, actionBtnTitle, action }: IFeedback) => {
  const { src, width, height } = image

  return (
    <div className={style.content}>
      <div className={style.info_content}>
        <h1>{title}</h1>
        <p>{info}</p>
        <div>
          <Button onClick={action}>{actionBtnTitle}</Button>
        </div>
      </div>
      <Image src={src} width={width} height={height} alt="" />
    </div>
  )
}

export default Feedback
