import styles from './Navbar.module.scss'
import iconSet from '@/assets/icons/selection.json'
import IcomoonReact from 'icomoon-react'
import React from 'react'
import Link from 'next/link'
import { RouteNames } from '@/constants/routes'
import { useRouter } from 'next/router'

interface INavbar {
  name: string
  icon: string
  path: string
  class: string
}

const navbarPaths: INavbar[] = [
  {
    name: 'Home',
    icon: 'home-outline',
    path: RouteNames.HOME,
    class: `${styles.navbar_link} ${styles.no_active_link}`,
  },
  { name: 'Create', icon: 'plus-square-outline', path: RouteNames.HOME, class: `${styles.navbar_link}` },
  { name: 'My Profile', icon: 'person', path: RouteNames.PROFILE, class: `${styles.navbar_link}` },
  {
    name: 'Statistics',
    icon: 'trending-up',
    path: RouteNames.HOME,
    class: `${styles.navbar_link} ${styles.margin_top_link}`,
  },
  { name: 'Favorites', icon: 'bookmark-outline', path: RouteNames.HOME, class: `${styles.navbar_link}` },
]

const Navbar = () => {
  const { pathname } = useRouter()

  return (
    <ul className={styles.navbar}>
      {navbarPaths.map((item: INavbar, index) => {
        return (
          <li key={index}>
            <Link href={item.path} className={pathname === item.path ? `${styles.active} ${item.class}` : item.class}>
              <IcomoonReact
                icon={item.icon}
                iconSet={iconSet}
                color={pathname === item.path ? '#397DF6' : '#fff'}
                size={20}
              />
              {item.name}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default Navbar
