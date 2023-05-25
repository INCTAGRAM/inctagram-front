import styles from '@/modules/posts/components/PostsPage.module.scss'
import IcomoonReact from 'icomoon-react'
import iconSet from '@/assets/icons/selection.json'

export const GalleryIcon = () => {
  return (
    <span className={styles.iconGallery}>
      <IcomoonReact iconSet={iconSet} icon="image" color={'white'} className={styles.icon} size={27} />
    </span>
  )
}
