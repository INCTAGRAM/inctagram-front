import HeadMeta from '@/common/headMeta/HeadMeta'
import { NextPageWithLayout } from '@/pages/_app'
import { getNavbarLayout } from '@/common/layout/navbarLayout/NavbarLayout'
import ProfilePage from '@/features/screens/profilePage/ProfilePage'

const Profile: NextPageWithLayout = () => {
  return (
    <HeadMeta title="Profile">
      <ProfilePage />
    </HeadMeta>
  )
}

Profile.getLayout = getNavbarLayout

export default Profile
