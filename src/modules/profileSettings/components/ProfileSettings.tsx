import React, { useState } from 'react'
import TopPanel from '@/modules/profileSettings/components/generalInfo/components/topPanel/TopPanel'
import { GeneralInfo } from '@/modules/profileSettings/components/generalInfo'
import s from './ProfileSettings.module.scss'
import { AccountManagement } from '@/modules/profileSettings/components/accountManagement/components/AccountManagement'

const ProfileSettings = () => {
  const [selected, setSelected] = useState('General information')

  return (
    <div className={s.container}>
      <TopPanel selected={selected} setSelected={setSelected} />
      {selected === 'Account Management' ? <AccountManagement /> : <GeneralInfo />}
    </div>
  )
}

export default ProfileSettings
