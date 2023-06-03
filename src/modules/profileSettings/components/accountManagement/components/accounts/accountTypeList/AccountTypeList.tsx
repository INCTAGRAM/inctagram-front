import s from '@/modules/profileSettings/components/accountManagement/components/AccountManagement.module.scss'
import React from 'react'

type AccountTypeListPropsType = {
  accountType: string
  setAccountType: (accountType: string) => void
}

export const AccountTypeList = ({ accountType, setAccountType }: AccountTypeListPropsType) => {
  return (
    <div className={s.block}>
      <div>
        <input type={'checkbox'} checked={accountType === 'Personal'} onChange={() => setAccountType('Personal')} />
        <span>Personal</span>
      </div>
      <div>
        <input type={'checkbox'} checked={accountType === 'Business'} onChange={() => setAccountType('Business')} />
        <span>Business</span>
      </div>
    </div>
  )
}
