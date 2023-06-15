import s from './TopPanel.module.scss'
import { tabNames, tabQueryParams } from '@/modules/profileSettings/constants/tabRoutes'
import { Tab } from '@/modules/profileSettings/components/topPanel/tab/Tab'

type TopPanelPropsType = {
  sectionName: string | string[] | Promise<boolean>
}

export const TopPanel = ({ sectionName }: TopPanelPropsType) => {
  const isGeneralInformationSelected = sectionName === tabNames.GENERALE_INFORMATION
  const isDevicesSelected = sectionName === tabNames.DEVICES
  const isAccountManagementSelected = sectionName === tabNames.ACCOUNT_MANAGEMENT
  const isPaymentsSelected = sectionName === tabNames.PAYMENTS

  const underlineClassName = `
    ${sectionName === tabNames.GENERALE_INFORMATION ? s.opt1 : ''}
    ${sectionName === tabNames.DEVICES ? s.opt2 : ''}
    ${sectionName === tabNames.ACCOUNT_MANAGEMENT ? s.opt3 : ''}
    ${sectionName === tabNames.PAYMENTS ? s.opt4 : ''}
    `

  return (
    <div className={s.top_panel}>
      <div>
        <Tab
          tabName={'General information'}
          isSelected={isGeneralInformationSelected}
          tabQueryParam={tabQueryParams.GENERALE_INFORMATION}
        />
        <Tab tabName={'Devices'} isSelected={isDevicesSelected} tabQueryParam={tabQueryParams.DEVICES} />
        <Tab
          tabName={'Account Management'}
          isSelected={isAccountManagementSelected}
          tabQueryParam={tabQueryParams.ACCOUNT_MANAGEMENT}
        />
        <Tab tabName={'Payments'} isSelected={isPaymentsSelected} tabQueryParam={tabQueryParams.PAYMENTS} />
      </div>
      <div>
        <div>
          <div className={underlineClassName}></div>
        </div>
      </div>
    </div>
  )
}
