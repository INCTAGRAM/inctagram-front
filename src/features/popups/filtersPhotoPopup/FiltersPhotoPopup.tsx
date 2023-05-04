import React, { createContext, useLayoutEffect, useRef, useState } from 'react'
import { FilterTabs } from '@/features/popups/filtersPhotoPopup/filtersPhotoComponents/FilterTabs'
import { InstaFitler } from '@/features/popups/filtersPhotoPopup/filtersPhotoComponents/InstaField'
import { CustomFilter } from '@/features/popups/filtersPhotoPopup/filtersPhotoComponents/CustomFilter'
import { Popup } from '@/common/ui/popup/Popup'
import domtoimage from 'dom-to-image'
import { IPost } from '@/features/popups/createPostPopup/types'
import { ImageField } from '@/features/popups/filtersPhotoPopup/filtersPhotoComponents/imageField/ImageField'
import styles from './FilterPhotoPopup.module.scss'

interface IAddPhotoPopup {
  post: IPost
  setPost: (images: IPost) => void
  isShowFilterPopup: boolean
  setIsShowFilterPopup: (arg: boolean) => void
  setIsShowCroppingPhotoPopup: (arg: boolean) => void
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

export const FiltersPhotoPopup = ({
  isShowFilterPopup,
  setIsShowFilterPopup,
  setIsShowCroppingPhotoPopup,
  post,
  setPost,
}: IAddPhotoPopup) => {
  const { images } = post
  const imageFileFromCropping = images[0]
  const [tabFilter, setTabFilter] = useState('instaFilter')
  const [filterClass, setFilterClass] = useState('')
  const [imageFile, setImageFile] = useState(imageFileFromCropping)
  const imgResultRef = useRef(null)

  useLayoutEffect(() => {
    setImageFile(imageFileFromCropping)
  }, [imageFileFromCropping])

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

  const prevStep = () => {
    setPost({ ...post, images: [] })
    setIsShowFilterPopup(false)
    setIsShowCroppingPhotoPopup(true)
  }

  const handleDownloadImage = async () => {
    return (
      imgResultRef.current !== null &&
      domtoimage
        .toBlob(imgResultRef.current)
        .then(function (blob) {
          // saveAs(blob, 'result.png')
          const url = URL.createObjectURL(blob)
          setPost({ ...post, images: [url] })
        })
        .catch(function (error) {
          console.error('ooops, something went wrong!', error)
        })
    )
  }

  const setNextOnClick = () => {
    handleDownloadImage().then(() => {
      setIsShowFilterPopup(false)
    })
  }

  return (
    <FilterContext.Provider value={value}>
      <Popup
        title="Filters"
        show={isShowFilterPopup}
        modalOnClick={setNextOnClick}
        onclickContent={'Next'}
        modalOnClickPrevStep={prevStep}
      >
        <div className={styles.container}>
          <div className={styles.containerImg}>
            <ImageField imageFile={imageFile} ref={imgResultRef} />
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
