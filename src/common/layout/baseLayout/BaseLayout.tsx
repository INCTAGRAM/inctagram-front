import styles from '../Layout.module.scss'
import { NextPage } from 'next'
import { PropsWithChildren, ReactElement } from 'react'
import Header from '@/common/header/Header'
import { wrapper } from '@/services/redux/store'
import { Provider } from 'react-redux'

const BaseLayout: NextPage<PropsWithChildren> = ({ children, ...rest }) => {
  const { store } = wrapper.useWrappedStore(rest)

  return (
    <>
      <Provider store={store}>
        <Header showLogout={false} />
        <div className={styles.content_center}>
          <main>{children}</main>
        </div>
      </Provider>
    </>
  )
}

export const getBaseLayout = (page: ReactElement) => {
  return <BaseLayout>{page}</BaseLayout>
}

export default BaseLayout
