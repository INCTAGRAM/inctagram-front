import React, { useState } from 'react'
import s from './TopPanel.module.scss'

const TopPanel = () => {
  const [selected, setSelected] = useState('General information')

  const isDevicesSelected = selected === 'Devices'
  const isGeneralInformationSelected = selected === 'General information'
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
      </div>
      <div>
        <div>
          <div className={selected === 'Devices' ? s.opt2 : s.opt1}></div>
        </div>
      </div>
    </div>
  )
}

export default TopPanel
