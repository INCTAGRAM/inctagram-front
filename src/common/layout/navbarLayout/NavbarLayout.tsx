import styles from '../Layout.module.scss'
import { NextPage } from 'next'
import { PropsWithChildren, ReactElement } from 'react'
import { Header } from '@/common/header/Header'
import { Navbar } from '@/common/navbar/Navbar'

const NavbarLayout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header showLogout={true} />
      <div className={`${styles.content_center} ${styles.navbar_and_content}`}>
        <Navbar />
        <main>{children}</main>
      </div>
    </>
  )
}

export const getNavbarLayout = (page: ReactElement) => {
  return <NavbarLayout>{page}</NavbarLayout>
}

export default NavbarLayout
