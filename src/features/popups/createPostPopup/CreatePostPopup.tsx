import { AddPhotoPopup } from '@/features/popups/createPostPopup/addPhotoPopup/AddPhotoPopup'
import { useState } from 'react'
import { CroppingPhotoPopup } from '@/features/popups/createPostPopup/croppingPhotoPopup/CroppingPhotoPopup'
import { IPost } from '@/features/popups/createPostPopup/types'
import { FiltersPhotoPopup } from '@/features/popups/filtersPhotoPopup/FiltersPhotoPopup'

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
  const [isShowFilterPopup, setIsShowFilterPopup] = useState(false)
  debugger
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
        setIsShowAddPost={setIsShowAddPost}
        setIsShowFilterPopup={setIsShowFilterPopup}
      />
      <FiltersPhotoPopup
        post={post}
        setPost={setPost}
        isShowPopup={isShowFilterPopup}
        setIsShowCroppingPhotoPopup={setIsShowCroppingPhotoPopup}
        setIsShowPopup={setIsShowFilterPopup}
      />
    </>
  )
}
