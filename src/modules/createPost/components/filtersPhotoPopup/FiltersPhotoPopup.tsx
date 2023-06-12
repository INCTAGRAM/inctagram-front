import React, { useEffect, useRef } from 'react'
import { InstaField } from '@/modules/createPost/components/filtersPhotoPopup/filtersPhotoComponents/InstaField'
import { Popup } from '@/common/ui/popup/Popup'
import domtoimage from 'dom-to-image'
import { ImageField } from '@/modules/createPost/components/filtersPhotoPopup/filtersPhotoComponents/imageField/ImageField'
import styles from './FilterPhotoPopup.module.scss'
import { IFiltersPhotoPopup } from '@/modules/createPost/components/filtersPhotoPopup/types'
import {
  addImagesAfterFilters,
  addPrevFilterParams,
  changeImageAfterFilters,
  resetFilterParams,
} from '@/modules/createPost/store/createPostSlice'
import { SliderForFilterPhoto } from '@/modules/createPost/components/filtersPhotoPopup/sliderControlElement/SliderForFilterPhoto'
import { useAppDispatch, useAppSelector } from '@/store/store'

export const FiltersPhotoPopup = ({
  isShowFilterPopup,
  setIsShowFilterPopup,
  setIsShowCroppingPhotoPopup,
  setIsShowPublicationPopup,
}: IFiltersPhotoPopup) => {
  const dispatch = useAppDispatch()
  const images = useAppSelector((state) => state.createPostReducer.images)
  const activeIndexImage = useAppSelector((state) => state.createPostReducer.activeImage)
  const filterParametrs = useAppSelector((state) => state.createPostReducer.filterParameters)
  const prevFilterParametrs = useAppSelector((state) => state.createPostReducer.prevFilterParameters)

  const filterClass = filterParametrs[activeIndexImage]
  const imgResultRef = useRef<HTMLImageElement>(null)

  const prevStateFilterClass = useRef<string | null>(null)

  useEffect(() => {
    prevStateFilterClass.current = filterClass
  }, [filterClass])

  const prevFilterClass = prevStateFilterClass.current

  useEffect(() => {
    dispatch(addPrevFilterParams({ imageIndex: activeIndexImage, filterClass: prevFilterClass as string }))
  }, [activeIndexImage, prevFilterClass])

  useEffect(() => {
    dispatch(addImagesAfterFilters(images))
  }, [dispatch, images])

  useEffect(() => {
    filterParametrs.map(() => {
      if (filterParametrs[activeIndexImage] === '') {
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
        .toJpeg(imgResultRef.current)
        .then(function (dataUrl) {
          console.log(dataUrl)
          dispatch(changeImageAfterFilters({ imageIndex: activeIndexImage, urlImage: dataUrl }))
        })
        .catch(function (error) {
          console.error('ooops, something went wrong!', error)
        })
    )
  }

  const setNextOnClick = () => {
    handleDownloadImage().then(() => {
      setIsShowFilterPopup(false)
      setIsShowPublicationPopup(true)
    })
  }

  const setImage = async () => {
    if (imgResultRef.current && prevFilterParametrs[activeIndexImage] !== filterParametrs[activeIndexImage]) {
      await handleDownloadImage()
    }
  }

  return (
    <Popup
      className={styles.createPostPopup}
      title="Filters"
      show={isShowFilterPopup}
      modalOnClick={setNextOnClick}
      onclickContent={'Next'}
      modalOnClickPrevStep={prevStep}
    >
      <div className={styles.container}>
        <div className={styles.containerImg}>
          <SliderForFilterPhoto direction={'back'} setImage={setImage} />
          {images.map((img, i) => {
            const position = (i - activeIndexImage) * 100
            if (i === activeIndexImage) {
              return <ImageField key={i} imageFile={img} position={position} ref={imgResultRef} />
            } else {
              return <ImageField key={i} imageFile={img} position={position} />
            }
          })}
          <SliderForFilterPhoto direction={'forward'} setImage={setImage} />
        </div>
        <div className={styles.containerSelect}>
          <InstaField imgFile={images[activeIndexImage]} />
        </div>
      </div>
    </Popup>
  )
}
