import s from '@/modules/profileSettings/components/accountManagement/AccountManagement.module.scss'
import React from 'react'

type AccountTypeListPropsType = {
  accountType: string
  setAccountType: (accountType: string) => void
  isDisabledPersonal: boolean
}

export const AccountTypeList = ({ accountType, setAccountType, isDisabledPersonal }: AccountTypeListPropsType) => {
  return (
    <div className={`${s.block} ${s.account_type_list_block}`}>
      <label className={isDisabledPersonal ? s.disabled : ''}>
        <input
          type={'checkbox'}
          disabled={isDisabledPersonal}
          className={s.checkbox}
          checked={accountType === 'Personal'}
          onChange={() => setAccountType('Personal')}
        />
        <span>Personal</span>
      </label>
      <label>
        <input
          type={'checkbox'}
          className={s.checkbox}
          checked={accountType === 'Business'}
          onChange={() => setAccountType('Business')}
        />
        <span>Business</span>
      </label>
    </div>
  )
}
