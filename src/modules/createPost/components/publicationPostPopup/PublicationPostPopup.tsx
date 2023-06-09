import { Popup } from '@/common/ui/popup/Popup'
import styles from './PublicationPostPopup.module.scss'
import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { setInitialPostState } from '@/modules/createPost/store/createPostSlice'
import { useGetSelfProfileQuery } from '@/modules/profile/services/profileService'
import { TextareaWithLimit } from '@/modules/createPost/components/publicationPostPopup/textareaWithLimit/TextareaWithLimit'
import { convertBlobToFile } from '@/modules/createPost/helpers/convertBlobToFile'
import { UserInfo } from '@/modules/createPost/components/publicationPostPopup/userInfo/UserInfo'
import { PublicationPostSlider } from '@/modules/createPost/components/publicationPostPopup/publicationPostSlider/PublicationPostSlider'
import { BodySlider } from '@/modules/createPost/components/publicationPostPopup/publicationPostSlider/bodySlider/BodySlider'
import { useAddPostProfileMutation } from '@/modules/createPost/services/createPostService'
import { deleteIndexedDBData, postDraftDBConfig } from '@/modules/createPost/helpers/indexedDBHelpers'
import { useRouter } from 'next/router'
import { useLazyGetSelfPostsProfileQuery } from '@/modules/posts'
import { RouteNames } from '@/constants/routes'

type Props = {
  setIsShowFilterPopup: (arg: boolean) => void
  setIsShowPublicationPopup: (arg: boolean) => void
  isShowPublicationPopup: boolean
}

export const PublicationPostPopup: FC<Props> = ({
  setIsShowFilterPopup,
  setIsShowPublicationPopup,
  isShowPublicationPopup,
}) => {
  const [getPosts] = useLazyGetSelfPostsProfileQuery()
  const [addPostProfile, { isSuccess }] = useAddPostProfileMutation()
  const { data: userData, isSuccess: isSuccessUserData } = useGetSelfProfileQuery()

  const dispatch = useAppDispatch()
  const description = useAppSelector((state) => state.createPostReducer.description)
  const images = useAppSelector((state) => state.createPostReducer.imagesAfterFilters)
  const activeImage = useAppSelector((state) => state.createPostReducer.activeImage)

  const { push } = useRouter()

  useEffect(() => {
    if (isSuccess) {
      getPosts({ pageSize: 1 })
    }
  }, [isSuccess])

  const stateCleanUp = () => {
    dispatch(setInitialPostState())
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

    await deleteIndexedDBData(postDraftDBConfig.storeName, postDraftDBConfig.keyPath)
    setIsShowPublicationPopup(false)

    await push(RouteNames.PROFILE)
  }

  const prevStep = () => {
    setIsShowPublicationPopup(false)
    setIsShowFilterPopup(true)
  }

  return (
    <Popup
      className={styles.createPostPopup}
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
