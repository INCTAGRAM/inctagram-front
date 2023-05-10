import React, { createContext, useLayoutEffect, useRef, useState } from 'react'
import { FilterTabs } from '@/features/popups/filtersPhotoPopup/filtersPhotoComponents/FilterTabs'
import { InstaFitler } from '@/features/popups/filtersPhotoPopup/filtersPhotoComponents/InstaField'
import { CustomFilter } from '@/features/popups/filtersPhotoPopup/filtersPhotoComponents/CustomFilter'
import { Popup } from '@/common/ui/popup/Popup'
import domtoimage from 'dom-to-image'
import { ImageField } from '@/features/popups/filtersPhotoPopup/filtersPhotoComponents/imageField/ImageField'
import styles from './FilterPhotoPopup.module.scss'
import { CustomFilterType, IFiltersPhotoPopup, ValueType } from '@/features/popups/filtersPhotoPopup/types'
import { useAppDispatch, useAppSelector } from '@/utils/reduxUtils'
import { addImagesAfterFilters, changeImageAfterFilters } from '@/services/redux/createPostReducer'
import { SliderForFilterPhoto } from '@/features/popups/filtersPhotoPopup/sliderControlElement/SliderForFilterPhoto'

export const FilterContext = createContext<ValueType>({} as ValueType)

export const FiltersPhotoPopup = ({
  isShowFilterPopup,
  setIsShowFilterPopup,
  setIsShowCroppingPhotoPopup,
}: IFiltersPhotoPopup) => {
  const images = useAppSelector((state) => state.createPostReducer.images)
  const imagesAfterFilters = useAppSelector((state) => state.createPostReducer.imagesAfterFilters)
  const activeIndexImage = useAppSelector((state) => state.createPostReducer.activeImage)
  const dispatch = useAppDispatch()
  const activeFilterImage = imagesAfterFilters[activeIndexImage]

  const [tabFilter, setTabFilter] = useState('instaFilter')
  const [filterClass, setFilterClass] = useState('')

  // const [imageFile, setImageFile] = useState(activeFilterImage)
  const imgResultRef = useRef(null)

  // useLayoutEffect(() => {
  //   setImageFile(activeFilterImage)
  // }, [activeFilterImage])

  useLayoutEffect(() => {
    dispatch(addImagesAfterFilters(images))
  }, [dispatch, images, imagesAfterFilters])

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
    setIsShowFilterPopup(false)
    setIsShowCroppingPhotoPopup(true)
    dispatch(addImagesAfterFilters([]))
  }

  const handleDownloadImage = async () => {
    return (
      imgResultRef.current !== null &&
      domtoimage
        .toBlob(imgResultRef.current)
        .then(function (blob) {
          // saveAs(blob, 'result.png')
          const url = URL.createObjectURL(blob)
          // setPost({ ...post, images: [...images, url] })
          dispatch(changeImageAfterFilters({ imageIndex: activeIndexImage, urlImage: url }))
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

  const setImage = async () => {
    await handleDownloadImage()
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
          <SliderForFilterPhoto direction={'back'} setImage={setImage} />
          <div className={styles.containerImg}>
            <ImageField imageFile={activeFilterImage} ref={imgResultRef} />
          </div>
          <SliderForFilterPhoto direction={'forward'} setImage={setImage} />
          <div className={styles.containerSelect}>
            <FilterTabs />
            {tabFilter === 'instaFilter' ? <InstaFitler /> : <CustomFilter />}
          </div>
        </div>
      </Popup>
    </FilterContext.Provider>
  )
}
