import { getCroppedImg } from '@/utils'
import { CroppedAreaType } from '@/features/popups/addPhotoPopup/body/bodySavePhotoPopup/BodySavePhotoPopup'
import { ICroppingParameters } from '@/features/popups/createPostPopup/types'

export const generateImages = (
  images: string[],
  croppingParameters: ICroppingParameters[],
  croppedArea: CroppedAreaType,
  activeImage: number
) => {
  // const croppedAreas = croppingParameters.map((crop) => {
  //   return crop.croppedArea
  // })
  const croppedAreas = croppingParameters.map((crop, i) => {
    if (activeImage === i) {
      return croppedArea
    }
    return crop.croppedArea
  })

  if (croppedArea) croppedAreas.push(croppedArea)

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