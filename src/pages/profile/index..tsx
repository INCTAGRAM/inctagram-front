import HeadMeta from '@/common/headMeta/HeadMeta'
import { NextPageWithLayout } from '@/pages/_app'
import { getNavbarLayout } from '@/common/layout/navbarLayout/NavbarLayout'
import { ProfilePage } from '@/modules/profile'
import { useCheckUserProfileQuery } from '@/modules/profile/services/profileService'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { RouteNames } from '@/constants/routes'

const Profile: NextPageWithLayout = () => {
  const { data, isSuccess } = useCheckUserProfileQuery()
  const { push } = useRouter()

  useEffect(() => {
    if (data && isSuccess) {
      push(`${RouteNames.PROFILE}/${data.username}`)
    }
  }, [data])

  return (
    <HeadMeta title="Profile">
      <ProfilePage />
    </HeadMeta>
  )
}

Profile.getLayout = getNavbarLayout

export default Profile
