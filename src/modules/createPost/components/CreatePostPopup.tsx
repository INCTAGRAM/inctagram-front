import styles from './CreatePostPopup.module.scss'
import { AddPhotoPopup } from '@/modules/createPost/components/addPhotoPopup/AddPhotoPopup'
import { useEffect, useRef, useState } from 'react'
import { CroppingPhotoPopup } from './croppingPhotoPopup/CroppingPhotoPopup'
import { FiltersPhotoPopup } from '@/modules/createPost/components/filtersPhotoPopup/FiltersPhotoPopup'
import { PublicationPostPopup } from '@/modules/createPost/components/publicationPostPopup/PublicationPostPopup'
import { CloseDeletePopup } from '@/modules/createPost/components/closeDeletePopup/CloseDeletePopup'

interface ICreatePostPopupProps {
  isShowAddPost: boolean
  setIsShowAddPost: (arg: boolean) => void
}

export const CreatePostPopup = ({ isShowAddPost, setIsShowAddPost }: ICreatePostPopupProps) => {
  const [isShowCroppingPhotoPopup, setIsShowCroppingPhotoPopup] = useState(false)
  const [isShowFilterPopup, setIsShowFilterPopup] = useState(false)
  const [isShowPublicationPopup, setIsShowPublicationPopup] = useState(false)
  const [isShowCloseDeletePopup, setIsShowCloseDeletePopup] = useState(false)

  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isShowCloseDeletePopup) return
    if (!isShowAddPost && !isShowCroppingPhotoPopup && !isShowFilterPopup && !isShowPublicationPopup) return
    console.log(isShowAddPost)

    const handleClick = (e: Event) => {
      if (!popupRef.current) return
      if (!e.target) return
      if (!popupRef.current!.contains(e.target as HTMLElement)) {
        setIsShowCloseDeletePopup(true)
      }
    }

    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [isShowAddPost, isShowCloseDeletePopup])

  const closeAndDeleteHandler = () => {
    setIsShowAddPost(false)
    setIsShowCroppingPhotoPopup(false)
    setIsShowFilterPopup(false)
    setIsShowPublicationPopup(false)
    setIsShowCloseDeletePopup(false)
  }

  return (
    <div ref={popupRef} className={styles.createPostPopup}>
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
      <CloseDeletePopup
        show={isShowCloseDeletePopup}
        setIsShowCloseDeletePopup={setIsShowCloseDeletePopup}
        closeAndDeleteHandler={closeAndDeleteHandler}
      />
    </div>
  )
}
