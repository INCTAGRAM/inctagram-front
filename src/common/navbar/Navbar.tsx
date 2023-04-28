import styles from './Navbar.module.scss'
import iconSet from '@/assets/icons/selection.json'
import IcomoonReact from 'icomoon-react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CreatePostPopup } from '@/features/popups/createPostPopup/CreatePostPopup'
import { INavbar, navbarPaths } from '@/common/navbar/navbarPaths'

const Navbar = () => {
  const [isShowAddPost, setIsShowAddPost] = useState(false)
  const { pathname } = useRouter()

  const onClickHandler = (isShow: boolean) => {
    setIsShowAddPost(isShow)
  }

  return (
    <>
      <ul className={styles.navbar}>
        {navbarPaths.map((item: INavbar, index) => {
          return (
            <li key={index} className={pathname === item.path ? `${styles.active} ${item.class}` : item.class}>
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

export default Navbar
