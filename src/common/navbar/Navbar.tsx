import styles from './Navbar.module.scss'
import iconSet from '@/assets/icons/selection.json'
import IcomoonReact from 'icomoon-react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CreatePostPopup } from '@/modules/createPost'
import { INavbar, navbarPaths } from '@/common/navbar/navbarPaths'
import { useGetSelfProfileQuery } from '@/modules/profile/services/profileService'

export const Navbar = () => {
  const { data } = useGetSelfProfileQuery()
  const [isShowAddPost, setIsShowAddPost] = useState(false)
  const { asPath } = useRouter()

  const onClickHandler = (isShow: boolean) => {
    setIsShowAddPost(isShow)
  }

  return (
    <>
      <ul className={styles.navbar}>
        {navbarPaths.map((item: INavbar, index) => {
          let finalClass

          switch (asPath) {
            case item.path:
              finalClass = `${styles.active} ${styles.navbar_link} ${item.class}`
              break
            case `${item.path}/${data?.username}`:
              finalClass = `${styles.active} ${styles.navbar_link} ${item.class}`
              break
            default:
              finalClass = `${styles.navbar_link} ${item.class}`
          }

          return (
            <li key={index} className={finalClass}>
              {item.name === 'Create' ? (
                <button onClick={() => onClickHandler(true)}>
                  <IcomoonReact icon={item.icon} iconSet={iconSet} size={20} />
                  {item.name}
                </button>
              ) : (
                <Link href={item.path}>
                  <IcomoonReact icon={item.icon} iconSet={iconSet} size={20} />
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
      <CreatePostPopup isShowAddPost={isShowAddPost} setIsShowAddPost={setIsShowAddPost} />
    </>
  )
}
