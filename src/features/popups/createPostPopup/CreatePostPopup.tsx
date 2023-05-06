import { AddPhotoPopup } from '@/features/popups/createPostPopup/addPhotoPopup/AddPhotoPopup'
import { useState } from 'react'
import { CroppingPhotoPopup } from './croppingPhotoPopup/CroppingPhotoPopup'
import { IPost } from './types'
import { FiltersPhotoPopup } from '@/features/popups/filtersPhotoPopup/FiltersPhotoPopup'

interface ICreatePostPopupProps {
  isShowAddPost: boolean
  setIsShowAddPost: (arg: boolean) => void
}

export const postInitial: IPost = {
  description: '',
  originalImages: [],
  croppingParameters: [],
  images: [],
  activeImage: 0,
}

export const CreatePostPopup = ({ isShowAddPost, setIsShowAddPost }: ICreatePostPopupProps) => {
  const [post, setPost] = useState<IPost>(postInitial)
  const [isShowCroppingPhotoPopup, setIsShowCroppingPhotoPopup] = useState(false)
  const [isShowFilterPopup, setIsShowFilterPopup] = useState(false)
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
        setIsShowAddPhotoPopup={setIsShowAddPost}
        isShowCroppingPhotoPopup={isShowCroppingPhotoPopup}
        setIsShowCroppingPhotoPopup={setIsShowCroppingPhotoPopup}
        setIsShowFilterPopup={setIsShowFilterPopup}
      />
      <FiltersPhotoPopup
        post={post}
        setPost={setPost}
        setIsShowFilterPopup={setIsShowFilterPopup}
        setIsShowCroppingPhotoPopup={setIsShowCroppingPhotoPopup}
        isShowFilterPopup={isShowFilterPopup}
      />
    </>
  )
}
