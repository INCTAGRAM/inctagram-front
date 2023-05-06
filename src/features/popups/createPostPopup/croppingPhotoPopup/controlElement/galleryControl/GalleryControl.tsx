import { ICrop, IPost } from '@/features/popups/createPostPopup/types'
import styles from './../ControlElement.module.scss'
import iconSet from '@/assets/icons/selection.json'
import IcomoonReact from 'icomoon-react'
import React, { ChangeEvent, useRef } from 'react'
import { switchPhotoOnSlider } from '@/features/popups/createPostPopup/utils/switchPhotoOnSlider'
import { CroppedAreaType } from '@/features/popups/addPhotoPopup/body/bodySavePhotoPopup/BodySavePhotoPopup'

interface IGalleryControlProps {
  post: IPost
  setPost: (post: IPost) => void
  crop: ICrop
  setCrop: (crop: ICrop) => void
  zoom: number
  setZoom: (zoom: number) => void
  aspect: number
  setAspect: (aspect: number) => void
  croppedArea: CroppedAreaType
}
export const GalleryControl = ({
  post,
  setPost,
  crop,
  setCrop,
  zoom,
  setZoom,
  aspect,
  setAspect,
  croppedArea,
}: IGalleryControlProps) => {
  const inpFile = useRef<HTMLInputElement | null>(null)

  const clearInputContent = () => {
    if (inpFile.current) {
      inpFile.current!.value = ''
    }
  }
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setPost({
            ...post,
            originalImages: [...post.originalImages, reader.result],
            activeImage: post.activeImage + 1,
            croppingParameters: [...post.croppingParameters, { crop, zoom, aspect, croppedArea }],
          })
          setCrop({ x: 0, y: 0 })
          setZoom(1)
          setAspect(1)
        }
      }
    }
  }

  const removePhoto = (index: number) => {
    setTimeout(() => {
      if (index <= post.activeImage) {
        setPost({
          ...post,
          originalImages: post.originalImages.filter((img, i) => i !== index),
          activeImage: post.activeImage - 1,
        })
      } else {
        setPost({ ...post, originalImages: post.originalImages.filter((img, i) => i !== index) })
      }
    }, 30)
  }

  return (
    <div className={`${styles.popupControlElement} ${styles.galleryControlElement}`}>
      <div className={styles.galleryPreviews}>
        {post.originalImages.map((img, i) => {
          return (
            <div
              className={styles.preview}
              key={i}
              onClick={() => switchPhotoOnSlider(i, post, setPost, crop, zoom, aspect, croppedArea)}
            >
              <img src={img} alt={''} />
              {post.originalImages.length > 1 ? (
                <span className={styles.delPhoto} onClick={() => removePhoto(i)}>
                  <IcomoonReact iconSet={iconSet} color={'#fff'} icon={'close-outline'} size={14} />
                </span>
              ) : (
                ''
              )}
            </div>
          )
        })}
        <label className={styles.addPhoto}>
          <input
            ref={inpFile}
            type="file"
            name="myImage"
            accept="image/*"
            onClick={clearInputContent}
            onChange={uploadHandler}
          />
          <IcomoonReact iconSet={iconSet} color={'#fff'} icon={'plus-circle-outline'} size={30} />
        </label>
      </div>
    </div>
  )
}
