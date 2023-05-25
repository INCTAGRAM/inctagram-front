import { ProfileSettingsPage } from '@/modules/profileSettings'
import { NextPageWithLayout } from '@/pages/_app'
import HeadMeta from '@/common/headMeta/HeadMeta'
import { getNavbarLayout } from '@/common/layout/navbarLayout/NavbarLayout'

const ProfileSettings: NextPageWithLayout = () => {
  return (
    <HeadMeta title="Profile">
      <ProfileSettingsPage />
    </HeadMeta>
  )
}

ProfileSettings.getLayout = getNavbarLayout

export default ProfileSettings
