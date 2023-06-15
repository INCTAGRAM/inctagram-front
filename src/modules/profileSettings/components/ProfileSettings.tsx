import { TopPanel } from '@/modules/profileSettings/components/topPanel/TopPanel'
import s from './ProfileSettings.module.scss'
import { AccountManagement } from '@/modules/profileSettings/components/accountManagement/AccountManagement'
import { useRouter } from 'next/router'
import { Payments } from '@/modules/profileSettings/components/payments/components/Payments'
import { Devices } from '@/modules/profileSettings/components/devices/Devices'
import { GeneralInfo } from '@/modules/profileSettings/components/generalInfo/GeneralInfo'
import { useEffect } from 'react'
import { RouteNames } from '@/constants/routes'
import { tabNames, tabQueryParams } from '@/modules/profileSettings/constants/tabRoutes'

export const ProfileSettings = () => {
  const { push, query } = useRouter()

  useEffect(() => {
    if (!query.section) {
      push(`${RouteNames.PROFILE_SETTINGS}${tabQueryParams.GENERALE_INFORMATION}`)
    }
  }, [query])

  return (
    <div className={s.container}>
      <TopPanel sectionName={query.section ?? ''} />
      {query.section === tabNames.GENERALE_INFORMATION && <GeneralInfo />}
      {query.section === tabNames.ACCOUNT_MANAGEMENT && <AccountManagement />}
      {query.section === tabNames.PAYMENTS && <Payments />}
      {query.section === tabNames.DEVICES && <Devices />}
    </div>
  )
}
