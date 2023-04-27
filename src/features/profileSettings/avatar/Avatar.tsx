import React, { useState } from 'react'
import Image from 'next/image'
import s from '@/features/screens/profileSettingsPage/ProfileSettingsPage.module.scss'
import { Button } from '@/common/ui/button/Button'
import { AddPhotoPopup } from '@/features/popups/addPhotoPopup/AddPhotoPopup'

interface IAvatarProps {
  userAvatarUrl: string | null
}

const Avatar = ({ userAvatarUrl }: IAvatarProps) => {
  const [isShowPopup, setIsShowPopup] = useState(false)

  const defaultPhotoUrl =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'

  const onClickHandler = (boolean: boolean) => {
    setIsShowPopup(boolean)
  }

  return (
    <div>
      <Image src={userAvatarUrl ?? defaultPhotoUrl} alt={''} width={192} height={192} className={s.Image} />
      <Button className={s.button} onClick={() => onClickHandler(true)}>
        Add a Profile Photo
      </Button>
      <AddPhotoPopup isShowPopup={isShowPopup} setIsShowPopup={setIsShowPopup} />
    </div>
  )
}

export default Avatar
