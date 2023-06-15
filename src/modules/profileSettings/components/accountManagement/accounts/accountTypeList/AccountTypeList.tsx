import s from '@/modules/profileSettings/components/accountManagement/AccountManagement.module.scss'
import React from 'react'

type AccountTypeListPropsType = {
  accountType: string
  setAccountType: (accountType: string) => void
}

export const AccountTypeList = ({ accountType, setAccountType }: AccountTypeListPropsType) => {
  return (
    <div className={`${s.block} ${s.account_type_list_block}`}>
      <div>
        <input
          type={'checkbox'}
          className={s.checkbox}
          checked={accountType === 'Personal'}
          onChange={() => setAccountType('Personal')}
        />
        <span>Personal</span>
      </div>
      <div>
        <input
          type={'checkbox'}
          className={s.checkbox}
          checked={accountType === 'Business'}
          onChange={() => setAccountType('Business')}
        />
        <span>Business</span>
      </div>
    </div>
  )
}
