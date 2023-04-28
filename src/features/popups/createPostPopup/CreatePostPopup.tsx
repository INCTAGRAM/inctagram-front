import { AddPhotoPopup } from '@/features/popups/createPostPopup/addPhotoPopup/AddPhotoPopup'
import { useState } from 'react'
import { CroppingPhotoPopup } from '@/features/popups/createPostPopup/croppingPhotoPopup/CroppingPhotoPopup'

interface ICreatePostPopup {
  isShowAddPost: boolean
  setIsShowAddPost: (arg: boolean) => void
}

export const CreatePostPopup = ({ isShowAddPost, setIsShowAddPost }: ICreatePostPopup) => {
  const [images, setImages] = useState<any>([])
  const [isShowCroppingPhotoPopup, setIsShowCroppingPhotoPopup] = useState(false)

  return (
    <>
      <AddPhotoPopup
        isShowAddPhotoPopup={isShowAddPost}
        setIsShowAddPhotoPopup={setIsShowAddPost}
        images={images}
        setImages={setImages}
        setIsShowCroppingPhotoPopup={setIsShowCroppingPhotoPopup}
      />
      <CroppingPhotoPopup
        isShowCroppingPhotoPopup={isShowCroppingPhotoPopup}
        setIsShowCroppingPhotoPopup={setIsShowCroppingPhotoPopup}
      />
    </>
  )
}
