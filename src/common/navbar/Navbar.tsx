import styles from './Navbar.module.scss'
import iconSet from '@/assets/icons/selection.json'
import IcomoonReact from 'icomoon-react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CreatePostPopup } from '@/modules/createPost'
import { INavbar, navbarPaths } from '@/common/navbar/navbarPaths'

export const Navbar = () => {
  const [isShowAddPost, setIsShowAddPost] = useState(false)
  const { pathname } = useRouter()

  const onClickHandler = (isShow: boolean) => {
    setIsShowAddPost(isShow)
  }

  return (
    <>
      <ul className={styles.navbar}>
        {navbarPaths.map((item: INavbar, index) => {
          const finalClass =
            pathname === item.path
              ? `${styles.active} ${styles.navbar_link} ${item.class}`
              : `${item.class} ${styles.navbar_link}`

          return (
            <li key={index} className={finalClass}>
              {item.name === 'Create' ? (
                <button onClick={() => onClickHandler(true)}>
                  <IcomoonReact
                    icon={item.icon}
                    iconSet={iconSet}
                    color={pathname === item.path ? '#397DF6' : '#fff'}
                    size={20}
                  />
                  {item.name}
                </button>
              ) : (
                <Link href={item.path}>
                  <IcomoonReact
                    icon={item.icon}
                    iconSet={iconSet}
                    color={pathname === item.path ? '#397DF6' : '#fff'}
                    size={20}
                  />
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
