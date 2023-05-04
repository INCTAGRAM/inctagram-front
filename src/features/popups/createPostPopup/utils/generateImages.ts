import { getCroppedImg } from '@/utils'
import { ICroppingParameters } from '@/features/popups/createPostPopup/types'

export const generateImages = async (images: string[], cropParameters: ICroppingParameters[]) => {
  const imagesUrls = images.map((img, i) => {
    const url = async () => {
      const canvas = await getCroppedImg(img, cropParameters[i].croppedArea)
      let url = ''

      canvas.toBlob((blob: Blob | null) => {
        const file = new File([blob as Blob], 'fileName.jpg', { type: 'image/jpeg' })
        url = URL.createObjectURL(file)
      }, 'image/jpeg')

      return url
    }

    return url()
  })

  return Promise.all(imagesUrls)
}
