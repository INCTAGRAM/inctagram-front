import { useAppDispatch } from '@/store/store'
import { MouseEvent } from 'react'
import { ICroppingParameters } from '@/modules/createPost/components/types'
import {
  changeActiveImage,
  changeCroppingParamsImage,
  removeImageAndCropParameters,
} from '@/modules/createPost/store/createPostSlice'

export const useRemoveCropPhotoOnSlider = () => {
  const dispatch = useAppDispatch()

  const removePhoto = (
    event: MouseEvent<HTMLElement>,
    index: number,
    activeImage: number,
    croppingParameters: ICroppingParameters
  ) => {
    dispatch(
      changeCroppingParamsImage({
        imageIndex: activeImage,
        croppingParameters,
      })
    )

    setTimeout(() => {
      dispatch(removeImageAndCropParameters(index))
      if (index <= activeImage) {
        dispatch(changeActiveImage(activeImage - 1))
      }
    }, 30)
  }

  return { removePhoto }
}
