import React, { useState } from 'react'
import s from './TopPanel.module.scss'

type TopPanelPropsType = {
  selected: string
  setSelected: (v: string) => void
}

const TopPanel = ({ selected, setSelected }: TopPanelPropsType) => {
  //const [selected, setSelected] = useState('General information')

  const isDevicesSelected = selected === 'Devices'
  const isGeneralInformationSelected = selected === 'General information'
  const isAccountManagementSelected = selected === 'Account Management'

  const underlineClassName = `
    ${selected === 'Devices' ? s.opt2 : ''}
    ${selected === 'General information' ? s.opt1 : ''}
    ${selected === 'Account Management' ? s.opt3 : ''}
    `
  return (
    <div className={s.top_panel}>
      <div>
        <h2
          className={`${isGeneralInformationSelected && s.selected}`}
          onClick={() => setSelected('General information')}
        >
          General information
        </h2>
        <h2 className={`${isDevicesSelected && s.selected}`} onClick={() => setSelected('Devices')}>
          Devices
        </h2>
        <h2
          className={`${isAccountManagementSelected && s.selected}`}
          onClick={() => setSelected('Account Management')}
        >
          Account Management
        </h2>
      </div>
      <div>
        <div>
          <div className={/*selected === 'Devices' ? s.opt2 : s.opt1*/ underlineClassName}></div>
        </div>
      </div>
    </div>
  )
}

export default TopPanel
