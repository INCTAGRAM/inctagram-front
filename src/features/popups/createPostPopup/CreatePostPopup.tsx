import { AddPhotoPopup } from './addPhotoPopup/AddPhotoPopup'
import { useState } from 'react'
import { CroppingPhotoPopup } from './croppingPhotoPopup/CroppingPhotoPopup'
import { FiltersPhotoPopup } from '@/features/popups/filtersPhotoPopup/FiltersPhotoPopup'
import { PublicationPostPopup } from '@/features/popups/createPostPopup/publicationPostPopup/PublicationPostPopup'

interface ICreatePostPopupProps {
  isShowAddPost: boolean
  setIsShowAddPost: (arg: boolean) => void
}

export const CreatePostPopup = ({ isShowAddPost, setIsShowAddPost }: ICreatePostPopupProps) => {
  const [isShowCroppingPhotoPopup, setIsShowCroppingPhotoPopup] = useState(false)
  const [isShowFilterPopup, setIsShowFilterPopup] = useState(false)
  const [isShowPublicationPopup, setIsShowPublicationPopup] = useState(false)
  return (
    <>
      <AddPhotoPopup
        isShowAddPhotoPopup={isShowAddPost}
        setIsShowAddPhotoPopup={setIsShowAddPost}
        setIsShowCroppingPhotoPopup={setIsShowCroppingPhotoPopup}
      />
      <CroppingPhotoPopup
        setIsShowAddPhotoPopup={setIsShowAddPost}
        isShowCroppingPhotoPopup={isShowCroppingPhotoPopup}
        setIsShowCroppingPhotoPopup={setIsShowCroppingPhotoPopup}
        setIsShowFilterPopup={setIsShowFilterPopup}
      />
      <FiltersPhotoPopup
        setIsShowFilterPopup={setIsShowFilterPopup}
        setIsShowCroppingPhotoPopup={setIsShowCroppingPhotoPopup}
        isShowFilterPopup={isShowFilterPopup}
        setIsShowPublicationPopup={setIsShowPublicationPopup}
      />
      <PublicationPostPopup
        isShowPublicationPopup={isShowPublicationPopup}
        setIsShowPublicationPopup={setIsShowPublicationPopup}
        setIsShowFilterPopup={setIsShowFilterPopup}
      />
    </>
  )
}
