import React, { useEffect, useRef } from 'react'
import { FilterTabs } from '@/features/popups/filtersPhotoPopup/filtersPhotoComponents/FilterTabs'
import { InstaField } from '@/features/popups/filtersPhotoPopup/filtersPhotoComponents/InstaField'
import { Popup } from '@/common/ui/popup/Popup'
import domtoimage from 'dom-to-image'
import { ImageField } from '@/features/popups/filtersPhotoPopup/filtersPhotoComponents/imageField/ImageField'
import styles from './FilterPhotoPopup.module.scss'
import { IFiltersPhotoPopup } from '@/features/popups/filtersPhotoPopup/types'
import { useAppDispatch, useAppSelector } from '@/utils/reduxUtils'
import {
  addImagesAfterFilters,
  addPrevFilterParams,
  changeImageAfterFilters,
  resetFilterParams,
} from '@/services/redux/createPostReducer'
import { SliderForFilterPhoto } from '@/features/popups/filtersPhotoPopup/sliderControlElement/SliderForFilterPhoto'

export const FiltersPhotoPopup = ({
  isShowFilterPopup,
  setIsShowFilterPopup,
  setIsShowCroppingPhotoPopup,
}: IFiltersPhotoPopup) => {
  const dispatch = useAppDispatch()
  const images = useAppSelector((state) => state.createPostReducer.images)
  const imagesAfterFilters = useAppSelector((state) => state.createPostReducer.imagesAfterFilters)
  const activeIndexImage = useAppSelector((state) => state.createPostReducer.activeImage)
  const activeFilterImage = imagesAfterFilters[activeIndexImage]
  const filterParametrs = useAppSelector((state) => state.createPostReducer.filterParameters)
  const prevFilterParametrs = useAppSelector((state) => state.createPostReducer.prevFilterParameters)

  const filterClass = filterParametrs[activeIndexImage]
  const imgResultRef = useRef<HTMLImageElement>(null)

  const prevStateFilterClass = useRef<string | null>(null)
  const prevFilterClass = prevStateFilterClass.current

  useEffect(() => {
    prevStateFilterClass.current = filterClass
  }, [filterClass])

  useEffect(() => {
    dispatch(addPrevFilterParams({ imageIndex: activeIndexImage, filterClass: prevFilterClass as string }))
  }, [activeIndexImage, prevFilterClass])

  useEffect(() => {
    dispatch(addImagesAfterFilters(images))
  }, [dispatch, images])

  useEffect(() => {
    filterParametrs.map((item) => {
      if (filterParametrs[activeIndexImage] === '') {
        debugger
        dispatch(changeImageAfterFilters({ imageIndex: activeIndexImage, urlImage: images[activeIndexImage] }))
      }
    })
  }, [filterClass])

  const prevStep = () => {
    setIsShowFilterPopup(false)
    setIsShowCroppingPhotoPopup(true)
    dispatch(addImagesAfterFilters([]))
    dispatch(resetFilterParams())
  }

  const handleDownloadImage = async () => {
    return (
      imgResultRef.current !== null &&
      domtoimage
        .toBlob(imgResultRef.current)
        .then(function (blob) {
          const url = URL.createObjectURL(blob)
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
    if (imgResultRef.current && prevFilterParametrs[activeIndexImage] !== filterParametrs[activeIndexImage]) {
      debugger
      await handleDownloadImage()
    }
  }

  return (
    <Popup
      title="Filters"
      show={isShowFilterPopup}
      modalOnClick={setNextOnClick}
      onclickContent={'Next'}
      modalOnClickPrevStep={prevStep}
    >
      <div className={styles.container}>
        <div className={styles.containerImg}>
          <SliderForFilterPhoto direction={'back'} setImage={setImage} />
          <ImageField imageFile={activeFilterImage} ref={imgResultRef} />
          <SliderForFilterPhoto direction={'forward'} setImage={setImage} />
        </div>
        <div className={styles.containerSelect}>
          <FilterTabs />
          <InstaField />
        </div>
      </div>
    </Popup>
  )
}
