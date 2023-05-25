import { RouteNames } from '@/constants/routes'
import styles from '@/common/navbar/Navbar.module.scss'

export interface INavbar {
  name: string
  icon: string
  path: string
  class: string
}

export const navbarPaths: INavbar[] = [
  { name: 'Home', icon: 'home-outline', path: RouteNames.HOME, class: '' },
  { name: 'Create', icon: 'plus-square-outline', path: '', class: `${styles.navbar_link}` },
  { name: 'My Profile', icon: 'person', path: RouteNames.PROFILE, class: '' },
  {
    name: 'Statistics',
    icon: 'trending-up',
    path: RouteNames.HOME,
    class: `${styles.margin_top_link}`,
  },
  { name: 'Favorites', icon: 'bookmark-outline', path: RouteNames.HOME, class: '' },
]
