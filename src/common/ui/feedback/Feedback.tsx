import style from './Feedback.module.scss'
import { Button } from '@/common/ui/button/Button'
import Image from 'next/image'
import { MouseEventHandler } from 'react'

interface IFeedback {
  title: string
  info: string
  image?: string
  actionBtnTitle?: string
  action?: MouseEventHandler<HTMLButtonElement>
}

const Feedback = ({ title, info, image, actionBtnTitle, action }: IFeedback) => {
  return (
    <div className={style.content}>
      <div className={style.info_content}>
        <h1>{title}</h1>
        <p>{info}</p>
        {action && (
          <div>
            <Button onClick={action}>{actionBtnTitle}</Button>
          </div>
        )}
      </div>
      {image && <Image src={image} alt="" />}
    </div>
  )
}

export default Feedback
