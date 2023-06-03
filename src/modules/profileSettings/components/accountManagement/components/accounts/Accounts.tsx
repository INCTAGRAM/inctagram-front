import s from '@/modules/profileSettings/components/accountManagement/components/AccountManagement.module.scss'
import React from 'react'
import { AccountTypeList } from './accountTypeList/AccountTypeList'

type AccountTypesPropsType = {
  accountType: string
  setAccountType: (accountType: string) => void
}

export const AccountTypes = ({ accountType, setAccountType }: AccountTypesPropsType) => {
  return (
    <div className={s.container_item}>
      <h2>Account Type:</h2>
      <AccountTypeList accountType={accountType} setAccountType={setAccountType} />
    </div>
  )
}
