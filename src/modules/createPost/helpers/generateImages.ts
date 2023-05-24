import { CroppedAreaType } from '@/modules/profileSettings/components/addPhotoPopup/body/bodySavePhotoPopup/BodySavePhotoPopup'
import { ICroppingParameters } from '@/modules/createPost/components/types'
import { getCroppedImg } from '@/helpers/cropImage'

export const generateImages = (
  images: string[],
  croppingParameters: ICroppingParameters[],
  croppedArea: CroppedAreaType,
  activeImage: number
) => {
  const croppedAreas = croppingParameters.map((crop, i) => {
    if (activeImage === i) {
      return croppedArea
    }
    return crop.croppedArea
  })

  const imageUrls = images.map(async (img, i) => {
    const url = async () => {
      const canvas = await getCroppedImg(img, croppedAreas[i])

      const getUrl = new Promise<string>(function (resolve) {
        canvas.toBlob((blob: Blob | null) => {
          const file = new File([blob as Blob], 'fileName.jpg', { type: 'image/jpeg' })
          const url = URL.createObjectURL(file)
          resolve(url)
        }, 'image/jpeg')
      })

      return getUrl.then((res) => res)
    }
    return url()
  })

  return Promise.all(imageUrls)
}
