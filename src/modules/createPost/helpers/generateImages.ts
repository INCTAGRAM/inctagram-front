import { ICroppedArea, ICroppingParameters } from '@/modules/createPost/components/types'
import { getCroppedImg } from '@/helpers/cropImage'

export const generateImages = (
  images: string[],
  croppingParameters: ICroppingParameters[],
  croppedArea: ICroppedArea,
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
      const getImg = new Promise<string>(function (resolve) {
        const img = canvas.toDataURL('image/jpeg')
        resolve(img)
      })
      return getImg.then((res) => res)
    }
    return url()
  })

  return Promise.all(imageUrls)
}
