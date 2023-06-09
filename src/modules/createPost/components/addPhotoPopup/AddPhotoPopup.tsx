import { ChangeEvent, useRef } from 'react'
import { Popup } from '@/common/ui/popup/Popup'
import styles from './AddPhotoPopup.module.scss'
import IcomoonReact from 'icomoon-react'
import iconSet from '@/assets/icons/selection.json'
import { Button } from '@/common/ui/button/Button'
import { useAppDispatch } from '@/store/store'
import {
  addImageAndCropParameters,
  setDraftPostState,
  setInitialPostState,
} from '@/modules/createPost/store/createPostSlice'
import { getIndexedDBData, postDraftDBConfig } from '@/modules/createPost/helpers/indexedDBHelpers'
import { IPost } from '@/modules/createPost/components/types'

interface IAddPhotoPopupProps {
  isShowAddPhotoPopup: boolean
  setIsShowAddPhotoPopup: (isShow: boolean) => void
  setIsShowCroppingPhotoPopup: (isShow: boolean) => void
  setIsShowPublicationPopup: (isShow: boolean) => void
  isDataInIndexedDB: boolean
}

export const AddPhotoPopup = ({
  isShowAddPhotoPopup,
  setIsShowAddPhotoPopup,
  setIsShowCroppingPhotoPopup,
  setIsShowPublicationPopup,
  isDataInIndexedDB,
}: IAddPhotoPopupProps) => {
  const dispatch = useAppDispatch()
  const inpFile = useRef<HTMLInputElement | null>(null)

  const openDraftHandler = async () => {
    const data = await getIndexedDBData<IPost>(postDraftDBConfig.storeName)
    const post = data[0]
    await dispatch(setDraftPostState(post))

    setIsShowAddPhotoPopup(false)
    setIsShowPublicationPopup(true)
  }

  const closePopup = () => {
    dispatch(setInitialPostState())
    setIsShowAddPhotoPopup(false)
  }

  const clearInputContent = () => {
    if (inpFile.current) {
      inpFile.current.value = ''
    }
  }

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          dispatch(
            addImageAndCropParameters({
              originalImage: reader.result,
              croppingParameters: {
                crop: { x: 0, y: 0 },
                croppedArea: { width: 0, height: 0, x: 0, y: 0 },
                zoom: 1,
                aspect: 1,
              },
            })
          )
          setIsShowAddPhotoPopup(false)
          setIsShowCroppingPhotoPopup(true)
        }
      }
    }
  }

  return (
    <Popup className={styles.createPostPopup} title="Add photo" show={isShowAddPhotoPopup} modalOnClick={closePopup}>
      <div className={styles.upload_container}>
        <div className={styles.icon_container}>
          <IcomoonReact iconSet={iconSet} icon="image-outline" color={'white'} className={styles.icon} size={48} />
        </div>
        <label>
          <input
            ref={inpFile}
            type="file"
            name="myImage"
            accept="image/*"
            onClick={clearInputContent}
            onChange={uploadHandler}
          />
          <Button>Select from computer</Button>
        </label>
        {!isDataInIndexedDB && (
          <Button onClick={openDraftHandler} variant={'outlined'}>
            Open draft
          </Button>
        )}
      </div>
    </Popup>
  )
}
