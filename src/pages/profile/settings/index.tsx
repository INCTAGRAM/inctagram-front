import { ProfileSettings } from '@/modules/profileSettings'
import { NextPageWithLayout } from '@/pages/_app'
import HeadMeta from '@/common/headMeta/HeadMeta'
import { getNavbarLayout } from '@/common/layout/navbarLayout/NavbarLayout'

const ProfileSettingsPage: NextPageWithLayout = () => {
  return (
    <HeadMeta title="Profile">
      <ProfileSettings />
    </HeadMeta>
  )
}

ProfileSettingsPage.getLayout = getNavbarLayout

export default ProfileSettingsPage
