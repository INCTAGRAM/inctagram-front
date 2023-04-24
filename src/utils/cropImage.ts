import { CroppedAreaType } from '@/features/popups/addPhotoPopup/body/bodySavePhotoPopup/BodySavePhotoPopup'

const createImage = (url: string) =>
  new Promise((resolve, reject) => {
    const image: HTMLImageElement = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
    image.src = url
  })

function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180
}

async function getCroppedImg(imageSrc: string, pixelCrop: CroppedAreaType, rotation = 0) {
  const image = (await createImage(imageSrc)) as HTMLImageElement
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const maxSize = Math.max(image.width, image.height)
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea
  canvas.height = safeArea

  // translate canvas context to a central location on image to allow rotating around the center.
  ctx?.translate(safeArea / 2, safeArea / 2)
  ctx?.rotate(getRadianAngle(rotation))
  ctx?.translate(-safeArea / 2, -safeArea / 2)

  // draw rotated image and store data.
  ctx?.drawImage(image, safeArea / 2 - image.width * 0.5, safeArea / 2 - image.height * 0.5)

  const data = ctx?.getImageData(0, 0, safeArea, safeArea)

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  // paste generated rotate image with correct offsets for x,y crop values.
  data &&
    ctx?.putImageData(
      data,
      0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
      0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
    )

  // As Base64 string
  // return canvas.toDataURL("image/jpeg");
  return canvas
}

export const generateDownload = async (imageSrc: string, crop: CroppedAreaType, addUserPhoto: (file: File) => void) => {
  if (!crop || !imageSrc) {
    return
  }

  const canvas = await getCroppedImg(imageSrc, crop)
  canvas.toBlob((blob) => {
    const file = new File([blob as Blob], 'fileName.jpg', { type: 'image/jpeg' })
    addUserPhoto(file)
  }, 'image/jpeg')
}
