import { Popup } from '@/common/ui/popup/Popup'
import styles from './PublicationPostPopup.module.scss'
import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { addDescription, addImages, addImagesAfterFilters } from '@/modules/createPost/store/createPostReducer'
import { useCheckUserProfileQuery } from '@/modules/profile/services/profileService'
import { TextareaWithLimit } from '@/modules/createPost/components/publicationPostPopup/textareaWithLimit/TextareaWithLimit'
import { convertBlobToFile } from '@/modules/createPost/helpers/convertBlobToFile'
import { UserInfo } from '@/modules/createPost/components/publicationPostPopup/userInfo/UserInfo'
import { PublicationPostSlider } from '@/modules/createPost/components/publicationPostPopup/publicationPostSlider/PublicationPostSlider'
import { BodySlider } from '@/modules/createPost/components/publicationPostPopup/publicationPostSlider/bodySlider/BodySlider'
import { refetchPosts } from '@/modules/posts/store/postsReducer'
import { useAddPostProfileMutation } from '@/modules/posts/services/postsService'

export const PublicationPostPopup: FC<PropsType> = ({
  setIsShowFilterPopup,
  setIsShowPublicationPopup,
  isShowPublicationPopup,
}) => {
  const [addPostProfile, { isSuccess }] = useAddPostProfileMutation()
  const { data: userData, isSuccess: isSuccessUserData } = useCheckUserProfileQuery()

  const dispatch = useAppDispatch()
  const description = useAppSelector((state) => state.createPostReducer.description)
  const images = useAppSelector((state) => state.createPostReducer.imagesAfterFilters)
  const activeImage = useAppSelector((state) => state.createPostReducer.activeImage)

  useEffect(() => {
    if (isSuccess) {
      dispatch(refetchPosts(true))
    }
  }, [isSuccess])

  const stateCleanUp = () => {
    dispatch(addDescription(''))
    dispatch(addImages([]))
    dispatch(addImagesAfterFilters([]))
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
          <PublicationPostSlider direction={'back'} />
          <BodySlider images={images} activeImage={activeImage} />
          <PublicationPostSlider direction={'forward'} />
        </div>
        <div className={styles.wrapperDescription}>
          {isSuccessUserData && <UserInfo userData={userData} />}
          <TextareaWithLimit label={'Add publication descriptions'} inputValue={description} maxLength={500} />
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
