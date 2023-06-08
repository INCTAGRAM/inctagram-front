import React, { useState } from 'react'
import TopPanel from '@/modules/profileSettings/components/generalInfo/components/topPanel/TopPanel'
import { GeneralInfo } from '@/modules/profileSettings/components/generalInfo'
import s from './ProfileSettings.module.scss'
import { AccountManagement } from '@/modules/profileSettings/components/accountManagement/components/AccountManagement'
import { useRouter } from 'next/router'

const ProfileSettings = () => {
  const { push, query } = useRouter()

  const sectionName =
    query.section ?? push('/profile/settings?section=general_information', '/profile/settings/general_information')

  return (
    <div className={s.container}>
      <TopPanel sectionName={sectionName} />
      {sectionName === 'account_management' && <AccountManagement />}
      {sectionName === 'general_information' && <GeneralInfo />}
    </div>
  )
}

export default ProfileSettings
