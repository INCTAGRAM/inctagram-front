import { Popup } from '@/common/ui/popup/Popup'
import Image from 'next/image'
import styles from './PublicationPostPopup.module.scss'
import React, { FC } from 'react'
import { TextArea } from './textArea/TextArea'
import { useAppDispatch, useAppSelector } from '@/services/redux/store'
import { addDescription, addImages, addImagesAfterFilters } from '@/services/redux/createPostReducer'
import { useAddPostProfileMutation } from '@/services/profile/profileService'

export const PublicationPostPopup: FC<PropsType> = ({
  setIsShowFilterPopup,
  setIsShowPublicationPopup,
  isShowPublicationPopup,
}) => {
  const [addPostProfile, { isLoading }] = useAddPostProfileMutation()

  const dispatch = useAppDispatch()
  const description = useAppSelector((state) => state.createPostReducer.description)
  const images = useAppSelector((state) => state.createPostReducer.imagesAfterFilters)

  const stateCleanUp = () => {
    dispatch(addDescription(''))
    dispatch(addImages([]))
    dispatch(addImagesAfterFilters([]))
  }

  const convertBlobToFile = async (image: RequestInfo | URL, index: number) => {
    try {
      const response = await fetch(image)
      const blob = await response.blob()
      return new File([blob], `image${index + 1}.jpg`, { type: blob.type })
    } catch (error) {
      console.error(error)
    }
  }

  const appendFile = async (images: Array<RequestInfo | URL>, formData: FormData) => {
    for (let i = 0; i < images.length; i++) {
      const file = await convertBlobToFile(images[i], i)
      formData.append('files', file as File)
    }
  }

  const handlePublicationPost = async () => {
    const formData = new FormData()
    formData.append('description', description)
    await appendFile(images, formData)

    addPostProfile(formData)

    stateCleanUp()
    setIsShowPublicationPopup(false)
  }

  const prevStep = () => {
    setIsShowPublicationPopup(false)
    setIsShowFilterPopup(true)
    dispatch(addDescription(''))
  }

  return (
    <Popup
      title={'Publication'}
      show={isShowPublicationPopup}
      onclickContent={'Publish'}
      modalOnClickPrevStep={prevStep}
      modalOnClick={handlePublicationPost}
    >
      <div className={styles.wrapperPopup}>
        <div className={styles.wrapperImages}>
          <Image src={images[0]} alt={'post'} width={500} height={500} />
        </div>
        <div>
          <TextArea inputValue={description} />
        </div>
      </div>
    </Popup>
  )
}

type PropsType = {
  setIsShowFilterPopup: (arg: boolean) => void
  setIsShowPublicationPopup: (arg: boolean) => void
  isShowPublicationPopup: boolean
}
