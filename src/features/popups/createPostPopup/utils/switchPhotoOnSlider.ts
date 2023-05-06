import { ICrop, IPost } from '@/features/popups/createPostPopup/types'
import { CroppedAreaType } from '@/features/popups/addPhotoPopup/body/bodySavePhotoPopup/BodySavePhotoPopup'

export const switchPhotoOnSlider = (
  newPhotoIndex: number,
  post: IPost,
  setPost: (post: IPost) => void,
  crop: ICrop,
  zoom: number,
  aspect: number,
  croppedArea: CroppedAreaType
) => {
  if (post.croppingParameters.length === post.activeImage && newPhotoIndex < post.activeImage) {
    setPost({
      ...post,
      activeImage: newPhotoIndex,
      croppingParameters: [...post.croppingParameters, { crop, zoom, aspect, croppedArea }],
    })
  } else {
    setPost({
      ...post,
      activeImage: newPhotoIndex,
      croppingParameters: post.croppingParameters.map((item, i) =>
        i === post.activeImage ? { crop, zoom, aspect, croppedArea } : item
      ),
    })
  }
}
