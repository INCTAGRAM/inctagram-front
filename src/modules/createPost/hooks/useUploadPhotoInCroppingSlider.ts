import { useAppDispatch } from '@/store/store'
import { ChangeEvent } from 'react'
import { ICroppingParameters } from '@/modules/createPost/components/types'
import {
  addImageAndCropParameters,
  changeActiveImage,
  changeCroppingParamsImage,
} from '@/modules/createPost/store/createPostSlice'

export const useUploadPhotoInCroppingSlider = () => {
  const dispatch = useAppDispatch()

  const uploadPhotoInCroppingSlider = (
    e: ChangeEvent<HTMLInputElement>,
    activeImage: number,
    croppingParameters: ICroppingParameters,
    originalImagesLength: number
  ) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          dispatch(
            changeCroppingParamsImage({
              imageIndex: activeImage,
              croppingParameters,
            })
          )
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
          dispatch(changeActiveImage(originalImagesLength))
        }
      }
    }
  }

  return { uploadPhotoInCroppingSlider }
}
