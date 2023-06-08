import React from 'react'
import s from '@/modules/profileSettings/components/accountManagement/components/AccountManagement.module.scss'
import { PriceListItemType } from '@/modules/profileSettings/components/accountManagement/types/PriceListItemType'

type OptionBlockPropsType = {
  priceList: PriceListItemType[]
  priceId: string
  setPriceId: (priceId: string) => void
}

export const PriceList = ({ priceList, priceId, setPriceId }: OptionBlockPropsType) => {
  return (
    <div className={`${s.block} ${s.price_list_block}`}>
      {priceList.map((p, i) => (
        <div key={i}>
          <input
            type={'checkbox'}
            className={s.checkbox}
            checked={(i === 0 && !priceId) || p.id === priceId}
            onChange={() => setPriceId(p.id)}
          />
          <span>{`${p.value}${p.currency} for ${p.period} ${p.periodType}`}</span>
        </div>
      ))}
    </div>
  )
}
