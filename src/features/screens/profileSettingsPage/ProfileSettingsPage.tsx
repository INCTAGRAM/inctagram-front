import React, { useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/common/ui/button/Button'
import profilePhotoExample from '@/../public/blank-profile-picture-973460_1280 (1).webp'
import s from './profileSettingsPage.module.scss'

import ProfileForm from './Form/Form'
import { decode } from 'jsonwebtoken'
import { getBaseLayout } from '@/common/layout/baseLayout/BaseLayout'
const ProfileSettingsPage = () => {
  useEffect(() => {
    console.log()
  })
  return (
    <div>
      <div className={s.content}>
        <h1>Create profile</h1>
        <div className={s.line}></div>
        <div className={s.container}>
          <div>
            <Image src={profilePhotoExample} alt={''} width={192} height={192} className={s.Image} />
            <Button className={s.button}>Add a Profile Photo</Button>
          </div>
          <ProfileForm />
        </div>
        <div style={{ position: 'relative', bottom: '75px' }} className={s.line}></div>
      </div>
    </div>
  )
}
ProfileSettingsPage.getBaseLayout = getBaseLayout

export default ProfileSettingsPage
