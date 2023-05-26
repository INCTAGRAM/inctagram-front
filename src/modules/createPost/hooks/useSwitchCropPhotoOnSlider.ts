import { useAppDispatch } from '@/store/store'
import { ICroppingParameters } from '@/modules/createPost/components/types'
import { changeActiveImage, changeCroppingParamsImage } from '@/modules/createPost/store/createPostSlice'

export const useSwitchCropPhotoOnSlider = () => {
  const dispatch = useAppDispatch()

  const switchPhoto = (newPhotoIndex: number, activeImage: number, croppingParameters: ICroppingParameters) => {
    dispatch(
      changeCroppingParamsImage({
        imageIndex: activeImage,
        croppingParameters,
      })
    )
    dispatch(changeActiveImage(newPhotoIndex))
  }

  return { switchPhoto }
}
