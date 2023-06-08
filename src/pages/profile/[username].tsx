import HeadMeta from '@/common/headMeta/HeadMeta'
import { NextPageWithLayout } from '@/pages/_app'
import { getNavbarLayout } from '@/common/layout/navbarLayout/NavbarLayout'
import { Profile } from '@/modules/profile'
import { Posts } from '@/modules/posts'

const UserProfile: NextPageWithLayout = () => {
  return (
    <HeadMeta title="Profile">
      <Profile />
      <Posts />
    </HeadMeta>
  )
}

UserProfile.getLayout = getNavbarLayout

export default UserProfile
