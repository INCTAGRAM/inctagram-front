import { AddPhotoPopup } from './addPhotoPopup/AddPhotoPopup'
import { useState } from 'react'
import { CroppingPhotoPopup } from './croppingPhotoPopup/CroppingPhotoPopup'
import { IPost } from './types'

interface ICreatePostPopupProps {
  isShowAddPost: boolean
  setIsShowAddPost: (arg: boolean) => void
}

export const postInitial: IPost = {
  description: '',
  images: [],
}

export const CreatePostPopup = ({ isShowAddPost, setIsShowAddPost }: ICreatePostPopupProps) => {
  const [post, setPost] = useState<IPost>(postInitial)
  const [isShowCroppingPhotoPopup, setIsShowCroppingPhotoPopup] = useState(false)

  return (
    <>
      <AddPhotoPopup
        post={post}
        setPost={setPost}
        isShowAddPost={isShowAddPost}
        setIsShowAddPost={setIsShowAddPost}
        setIsShowCroppingPhotoPopup={setIsShowCroppingPhotoPopup}
      />
      <CroppingPhotoPopup
        post={post}
        setPost={setPost}
        setIsShowAddPost={setIsShowAddPost}
        isShowCroppingPhotoPopup={isShowCroppingPhotoPopup}
        setIsShowCroppingPhotoPopup={setIsShowCroppingPhotoPopup}
      />
    </>
  )
}
