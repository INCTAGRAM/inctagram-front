import { AddPhotoPopup } from './addPhotoPopup/AddPhotoPopup'
import { useState } from 'react'
import { CroppingPhotoPopup } from './croppingPhotoPopup/CroppingPhotoPopup'

interface ICreatePostPopupProps {
  isShowAddPost: boolean
  setIsShowAddPost: (arg: boolean) => void
}

export const CreatePostPopup = ({ isShowAddPost, setIsShowAddPost }: ICreatePostPopupProps) => {
  const [isShowCroppingPhotoPopup, setIsShowCroppingPhotoPopup] = useState(false)

  return (
    <>
      <AddPhotoPopup
        isShowAddPost={isShowAddPost}
        setIsShowAddPost={setIsShowAddPost}
        setIsShowCroppingPhotoPopup={setIsShowCroppingPhotoPopup}
      />
      <CroppingPhotoPopup
        setIsShowAddPost={setIsShowAddPost}
        isShowCroppingPhotoPopup={isShowCroppingPhotoPopup}
        setIsShowCroppingPhotoPopup={setIsShowCroppingPhotoPopup}
      />
    </>
  )
}
