import s from './TopPanel.module.scss'
import { useRouter } from 'next/router'

type TopPanelPropsType = {
  sectionName: string | string[] | Promise<boolean>
}

const TopPanel = ({ sectionName }: TopPanelPropsType) => {
  const isDevicesSelected = sectionName === 'devices'
  const isGeneralInformationSelected = sectionName === 'general_information'
  const isAccountManagementSelected = sectionName === 'account_management'
  const isPaymentsSelected = sectionName === 'payments'

  const { push } = useRouter()

  const underlineClassName = `
    ${sectionName === 'devices' ? s.opt2 : ''}
    ${sectionName === 'general_information' ? s.opt1 : ''}
    ${sectionName === 'account_management' ? s.opt3 : ''}
    ${sectionName === 'payments' ? s.opt4 : ''}
    `

  const onClickHandler = (sectionUrl: string) => {
    push(`/profile/settings?section=${sectionUrl}`, `/profile/settings/${sectionUrl}`)
  }

  return (
    <div className={s.top_panel}>
      <div>
        <h2
          className={`${isGeneralInformationSelected && s.selected}`}
          onClick={() => onClickHandler('general_information')}
        >
          General information
        </h2>
        <h2 className={`${isDevicesSelected && s.selected}`} onClick={() => onClickHandler('devices')}>
          Devices
        </h2>
        <h2
          className={`${isAccountManagementSelected && s.selected}`}
          onClick={() => onClickHandler('account_management')}
        >
          Account Management
        </h2>
        <h2 className={`${isPaymentsSelected && s.selected}`} onClick={() => onClickHandler('payments')}>
          Payments
        </h2>
      </div>
      <div>
        <div>
          <div className={underlineClassName}></div>
        </div>
      </div>
    </div>
  )
}

export default TopPanel
