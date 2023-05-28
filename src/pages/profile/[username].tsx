import HeadMeta from '@/common/headMeta/HeadMeta'
import { NextPageWithLayout } from '@/pages/_app'
import { getNavbarLayout } from '@/common/layout/navbarLayout/NavbarLayout'
import { ProfilePage } from '@/modules/profile'
import { PostsPage } from '@/modules/posts'

const UserProfile: NextPageWithLayout = () => {
  return (
    <HeadMeta title="Profile">
      <ProfilePage />
      <PostsPage />
    </HeadMeta>
  )
}

UserProfile.getLayout = getNavbarLayout

export default UserProfile
