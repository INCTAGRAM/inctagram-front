import TopPanel from '@/modules/profileSettings/components/generalInfo/topPanel/TopPanel'
import s from './ProfileSettings.module.scss'
import { AccountManagement } from '@/modules/profileSettings/components/accountManagement/components/AccountManagement'
import { useRouter } from 'next/router'
import { Payments } from '@/modules/profileSettings/components/payments/components/Payments'
import { Devices } from '@/modules/profileSettings/components/devices/Devices'
import { GeneralInfo } from '@/modules/profileSettings/components/generalInfo/GeneralInfo'

const ProfileSettings = () => {
  const { push, query } = useRouter()

  const sectionName =
    query.section ?? push('/profile/settings?section=general_information', '/profile/settings/general_information')

  return (
    <div className={s.container}>
      <TopPanel sectionName={sectionName} />
      {sectionName === 'account_management' && <AccountManagement />}
      {sectionName === 'general_information' && <GeneralInfo />}
      {sectionName === 'payments' && <Payments />}
      {sectionName === 'devices' && <Devices />}
    </div>
  )
}

export default ProfileSettings
