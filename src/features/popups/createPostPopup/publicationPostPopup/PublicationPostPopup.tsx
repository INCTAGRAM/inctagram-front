import { Popup } from '@/common/ui/popup/Popup'
import Image from 'next/image'
import styles from './PublicationPostPopup.module.scss'
import React, { FC } from 'react'
import { TextArea } from './textArea/TextArea'
import { useAppDispatch, useAppSelector } from '@/services/redux/store'
import { addDescription, addImages, addImagesAfterFilters } from '@/services/redux/createPostReducer'
import { useAddPostProfileMutation, useCheckUserProfileQuery } from '@/services/profile/profileService'
import { PublicationPostSlider } from '@/features/popups/createPostPopup/publicationPostPopup/publicationPostSlider/PublicationPostSlider'
import IcomoonReact from 'icomoon-react'
import iconSet from '@/assets/icons/selection.json'

export const PublicationPostPopup: FC<PropsType> = ({
  setIsShowFilterPopup,
  setIsShowPublicationPopup,
  isShowPublicationPopup,
}) => {
  const [addPostProfile] = useAddPostProfileMutation()
  const { data: userData, isSuccess } = useCheckUserProfileQuery()

  const dispatch = useAppDispatch()
  const description = useAppSelector((state) => state.createPostReducer.description)
  const images = useAppSelector((state) => state.createPostReducer.imagesAfterFilters)
  const activeImage = useAppSelector((state) => state.createPostReducer.activeImage)

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

    console.log(formData.getAll('files'))
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
          <PublicationPostSlider direction={'back'} />
          {images?.map((image, index) => {
            const position = (index - activeImage) * 100
            return (
              <div
                key={index}
                className={activeImage ? `${styles.croppingImage} ${styles.active}` : styles.croppingImage}
                style={{ left: `${position}%` }}
              >
                <Image src={image} alt={'post'} width={500} height={500} />
              </div>
            )
          })}
          <PublicationPostSlider direction={'forward'} />
        </div>
        <div className={styles.wrapperDescription}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              {isSuccess && userData.avatar.previewUrl !== null ? (
                <Image src={userData.avatar.previewUrl} fill alt="avatar" unoptimized priority />
              ) : (
                <div className={styles.imageOutline}>
                  <IcomoonReact
                    iconSet={iconSet}
                    icon="image-outline"
                    color={'white'}
                    className={styles.icon}
                    size={36}
                  />
                </div>
              )}
            </div>
            <div className={styles.username}>{userData?.username}</div>
          </div>
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
