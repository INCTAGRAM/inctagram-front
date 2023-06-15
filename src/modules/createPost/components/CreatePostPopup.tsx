import styles from './CreatePostPopup.module.scss'
import { AddPhotoPopup } from '@/modules/createPost/components/addPhotoPopup/AddPhotoPopup'
import { useEffect, useRef, useState } from 'react'
import { CroppingPhotoPopup } from './croppingPhotoPopup/CroppingPhotoPopup'
import { FiltersPhotoPopup } from '@/modules/createPost/components/filtersPhotoPopup/FiltersPhotoPopup'
import { PublicationPostPopup } from '@/modules/createPost/components/publicationPostPopup/PublicationPostPopup'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { setInitialPostState } from '@/modules/createPost/store/createPostSlice'
import { useClosePopupClickEl } from '@/hooks/useClosePopupClickEl'
import { ConfirmActionPopup } from '@/common/ui/popup/confirmActionPopup/ConfirmActionPopup'
import {
  addIndexedDBData,
  checkDataInIndexedDB,
  initIndexedDB,
  postDraftDBConfig,
} from '@/modules/createPost/helpers/indexedDBHelpers'
import { IDataIndexedDB } from '@/modules/createPost/components/types'

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
  const [isDataInIndexedDB, setIsDataInIndexedDB] = useState(false)
  const [isShowSaveDraftPopup, setIsShowSaveDraftPopup] = useState(false)

  useEffect(() => {
    const checkData = async () => {
      await initIndexedDB()
      const result = await checkDataInIndexedDB()
      setIsDataInIndexedDB(result)
    }

    checkData().then()
  }, [isShowAddPost])

  const data = useAppSelector((state) => state.createPostReducer)

  const popupWrapperRef = useRef<HTMLDivElement>(null)

  useClosePopupClickEl(
    popupWrapperRef,
    isShowAddPost || isShowCroppingPhotoPopup || isShowFilterPopup,
    () => setIsShowCloseDeletePopup(true),
    [isShowCloseDeletePopup, isShowAddPost, isShowCroppingPhotoPopup, isShowFilterPopup]
  )

  useClosePopupClickEl(popupWrapperRef, isShowPublicationPopup, () => setIsShowSaveDraftPopup(true), [
    isShowPublicationPopup,
  ]) //hook for popup responsible for saving information about the publication to the draft

  const closeAllPopup = () => {
    setIsShowAddPost(false)
    setIsShowCroppingPhotoPopup(false)
    setIsShowFilterPopup(false)
    setIsShowPublicationPopup(false)
    setIsShowSaveDraftPopup(false)
    setIsShowCloseDeletePopup(false)
  }

  const closePopupDeleteHandler = () => {
    setIsShowCloseDeletePopup(false)
  }

  const closeAndDeleteHandler = () => {
    closeAllPopup()
    dispatch(setInitialPostState())
  }

  const closePopupPublicationHandler = () => {
    closeAllPopup()
    dispatch(setInitialPostState())
  }

  const saveDraftHandler = async () => {
    await addIndexedDBData<IDataIndexedDB>(postDraftDBConfig.storeName, {
      ...data,
      postId: postDraftDBConfig.keyPath,
    }).then(() => {
      closeAllPopup()
      dispatch(setInitialPostState())
    })
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
          setIsShowPublicationPopup={setIsShowPublicationPopup}
          isDataInIndexedDB={isDataInIndexedDB}
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
          isShowCroppingPhotoPopup={isShowCroppingPhotoPopup}
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
          closeActionHandler={closePopupDeleteHandler}
          confirmActionHandler={closeAndDeleteHandler}
        />
        <ConfirmActionPopup
          show={isShowSaveDraftPopup}
          title={'Close'}
          text={'Do you really want to close the creation of a publication? If you close everything will be deleted'}
          confirmActionHandler={saveDraftHandler}
          closeActionHandler={closePopupPublicationHandler}
          confirmTextButton={'Save draft'}
          closeTextButton={'discard'}
        />
      </div>
      <div ref={popupWrapperRef} className={finalClassForPopupWrapper}></div>
    </>
  )
}
