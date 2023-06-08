import HeadMeta from '@/common/headMeta/HeadMeta'
import { NextPageWithLayout } from '@/pages/_app'
import { getNavbarLayout } from '@/common/layout/navbarLayout/NavbarLayout'
import { Profile } from '@/modules/profile'
import { useGetSelfProfileQuery } from '@/modules/profile/services/profileService'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { RouteNames } from '@/constants/routes'

const ProfilePage: NextPageWithLayout = () => {
  const { data, isSuccess } = useGetSelfProfileQuery()
  const { push } = useRouter()

  useEffect(() => {
    if (data && isSuccess) {
      push(`${RouteNames.PROFILE}/${data.username}`)
    }
  }, [data])

  return (
    <HeadMeta title="Profile">
      <Profile />
    </HeadMeta>
  )
}

ProfilePage.getLayout = getNavbarLayout

export default ProfilePage
