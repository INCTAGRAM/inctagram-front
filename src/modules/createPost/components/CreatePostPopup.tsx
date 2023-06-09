import styles from './CreatePostPopup.module.scss'
import { AddPhotoPopup } from '@/modules/createPost/components/addPhotoPopup/AddPhotoPopup'
import { useRef, useState } from 'react'
import { CroppingPhotoPopup } from './croppingPhotoPopup/CroppingPhotoPopup'
import { FiltersPhotoPopup } from '@/modules/createPost/components/filtersPhotoPopup/FiltersPhotoPopup'
import { PublicationPostPopup } from '@/modules/createPost/components/publicationPostPopup/PublicationPostPopup'
import { useAppDispatch } from '@/store/store'
import { setInitialPostState } from '@/modules/createPost/store/createPostSlice'
import { useClosePopupClickEl } from '@/hooks/useClosePopupClickEl'
import { ConfirmActionPopup } from '@/common/ui/popup/confirmActionPopup/ConfirmActionPopup'

interface ICreatePostPopupProps {
  isShowAddPost: boolean
  setIsShowAddPost: (arg: boolean) => void
}

export const CreatePostPopup = ({ isShowAddPost, setIsShowAddPost }: ICreatePostPopupProps) => {
  const dispatch = useAppDispatch()
  const [isShowCroppingPhotoPopup, setIsShowCroppingPhotoPopup] = useState(false)
  const [isShowFilterPopup, setIsShowFilterPopup] = useState(false)
  const [isShowPublicationPopup, setIsShowPublicationPopup] = useState(false)
  const [isShowCloseDeletePopup, setIsShowCloseDeletePopup] = useState(false)

  const popupWrapperRef = useRef<HTMLDivElement>(null)

  useClosePopupClickEl(
    popupWrapperRef,
    isShowAddPost || isShowCroppingPhotoPopup || isShowFilterPopup || isShowPublicationPopup,
    () => setIsShowCloseDeletePopup(true),
    [isShowCloseDeletePopup, isShowAddPost, isShowCroppingPhotoPopup, isShowFilterPopup, isShowPublicationPopup]
  )

  const closeAndDeleteHandler = () => {
    setIsShowAddPost(false)
    setIsShowCroppingPhotoPopup(false)
    setIsShowFilterPopup(false)
    setIsShowPublicationPopup(false)
    setIsShowCloseDeletePopup(false)
    dispatch(setInitialPostState())
  }

  const finalClassForPopupWrapper =
    isShowAddPost || isShowCroppingPhotoPopup || isShowFilterPopup || isShowPublicationPopup
      ? `${styles.wrapperForPopup} ${styles.showWrapper}`
      : styles.wrapperForPopup

  return (
    <>
      <div className={styles.createPostPopup}>
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

        <ConfirmActionPopup
          show={isShowCloseDeletePopup}
          title={'Close'}
          text={'Do you really want to close the creation of a publication? If you close everything will be deleted'}
          setIsShowConfirmActionPopup={setIsShowCloseDeletePopup}
          confirmActionHandler={closeAndDeleteHandler}
        />
      </div>
      <div ref={popupWrapperRef} className={finalClassForPopupWrapper}></div>
    </>
  )
}
