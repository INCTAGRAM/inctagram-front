import { NextPageWithLayout } from '@/pages/_app'
import { ProfileSettings } from '@/modules/profileSettings/components/ProfileSettings'
import { getNavbarLayout } from '@/common/layout/navbarLayout/NavbarLayout'
import HeadMeta from '@/common/headMeta/HeadMeta'

const ProfileSettingsPage: NextPageWithLayout = () => {
  return (
    <HeadMeta title="Profile settings">
      <ProfileSettings />
    </HeadMeta>
  )
}

ProfileSettingsPage.getLayout = getNavbarLayout

export default ProfileSettingsPage
