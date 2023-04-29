import React, { createContext, useState } from 'react'
import Popup from '@/common/ui/popup/Popup'
import styles from './FilterPhotoPopup.module.scss'
import { FilterTabs } from '@/features/popups/filtersPhotoPopup/filtersPhotoComponents/FilterTabs'
import { InstaFitler } from '@/features/popups/filtersPhotoPopup/filtersPhotoComponents/InstaField'
import { CustomFilter } from '@/features/popups/filtersPhotoPopup/filtersPhotoComponents/CustomFilter'
import { ImageField } from '@/features/popups/filtersPhotoPopup/filtersPhotoComponents/imageField/ImageField'

interface IAddPhotoPopup {
  isShowPopup: boolean
  setIsShowPopup: (arg: boolean) => void
}

export type CustomFilterType = {
  contrast: number
  brightness: number
  saturate: number
  sepia: number
  gray: number
}

type ValueType = {
  tabFilter: string
  setTabFilter: (tabFilter: string) => void
  filterClass: string
  setFilterClass: (filterClass: string) => void
  customFilter: CustomFilterType
  setCustomFilter: ({}: CustomFilterType) => void
}

export const FilterContext = createContext<ValueType>({} as ValueType)

export const FiltersPhotoPopup = ({ isShowPopup, setIsShowPopup }: IAddPhotoPopup) => {
  const [tabFilter, setTabFilter] = useState('instaFilter')
  const [filterClass, setFilterClass] = useState('')
  const [customFilter, setCustomFilter] = useState<CustomFilterType>({
    contrast: 100,
    brightness: 100,
    saturate: 100,
    sepia: 0,
    gray: 0,
  })

  const value = {
    tabFilter,
    setTabFilter,
    filterClass,
    setFilterClass,
    customFilter,
    setCustomFilter,
  }

  const closePopup = () => setIsShowPopup(false)

  return (
    <FilterContext.Provider value={value}>
      <Popup title="Filters" show={isShowPopup} modalOnClick={closePopup} photoPopup={true}>
        <div className={styles.container}>
          <div className={styles.containerImg}>
            <ImageField />
          </div>
          <div className={styles.containerSelect}>
            <FilterTabs />
            {tabFilter === 'instaFilter' ? <InstaFitler /> : <CustomFilter />}
          </div>
        </div>
      </Popup>
    </FilterContext.Provider>
  )
}
