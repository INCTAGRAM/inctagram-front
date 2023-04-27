import { NextPage } from 'next'
import ProfileSettingsPage from '@/features/screens/profileSettingsPage/ProfileSettingsPage'
import { getNavbarLayout } from '@/common/layout/navbarLayout/NavbarLayout'
import { NextPageWithLayout } from '@/pages/_app'

const Index: NextPageWithLayout = () => <ProfileSettingsPage />

Index.getLayout = getNavbarLayout

export default Index
