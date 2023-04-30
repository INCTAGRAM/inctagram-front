import { AddPhotoPopup } from '@/features/popups/createPostPopup/addPhotoPopup/AddPhotoPopup'
import { useState } from 'react'
import { CroppingPhotoPopup } from '@/features/popups/createPostPopup/croppingPhotoPopup/CroppingPhotoPopup'
import { IPost } from '@/features/popups/createPostPopup/types'
import login from '@/pages/login'

interface ICreatePostPopupProps {
  isShowAddPost: boolean
  setIsShowAddPost: (arg: boolean) => void
}

const postInitial: IPost = {
  description: '',
  images: [],
}

export const CreatePostPopup = ({ isShowAddPost, setIsShowAddPost }: ICreatePostPopupProps) => {
  const [post, setPost] = useState<IPost>(postInitial)
  const [isShowCroppingPhotoPopup, setIsShowCroppingPhotoPopup] = useState(false)

  console.log(post)

  return (
    <>
      <AddPhotoPopup
        post={post}
        setPost={setPost}
        isShowAddPhotoPopup={isShowAddPost}
        setIsShowAddPhotoPopup={setIsShowAddPost}
        setIsShowCroppingPhotoPopup={setIsShowCroppingPhotoPopup}
      />
      <CroppingPhotoPopup
        post={post}
        setPost={setPost}
        isShowCroppingPhotoPopup={isShowCroppingPhotoPopup}
        setIsShowCroppingPhotoPopup={setIsShowCroppingPhotoPopup}
      />
    </>
  )
}
