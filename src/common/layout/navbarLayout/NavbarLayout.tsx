import styles from '../Layout.module.scss'
import { NextPage } from 'next'
import { PropsWithChildren, ReactElement } from 'react'
import Header from '@/common/header/Header'
import Navbar from '@/common/navbar/Navbar'
import { wrapper } from '@/services/redux/store'
import { Provider } from 'react-redux'

const NavbarLayout: NextPage<PropsWithChildren> = ({ children, ...rest }) => {
  const { store } = wrapper.useWrappedStore(rest)

  return (
    <>
      <Provider store={store}>
        <Header logout={false} />
        <div className={`${styles.content_center} ${styles.navbar_and_content}`}>
          <Navbar />
          <main>{children}</main>
        </div>
      </Provider>
    </>
  )
}

export const getNavbarLayout = (page: ReactElement) => {
  return <NavbarLayout>{page}</NavbarLayout>
}

export default NavbarLayout
