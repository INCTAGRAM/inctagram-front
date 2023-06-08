import { SelfProfileInfo } from '@/modules/profile/components/profileInfo/SelfProfileInfo'
import { useGetSelfProfileQuery } from '@/modules/profile/services/profileService'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { RouteNames } from '@/constants/routes'
import { UserProfileInfo } from '@/modules/profile/components/profileInfo/UserProfileInfo'

export const Profile = () => {
  const [selfOrUser, setSelfOrUser] = useState<'self' | 'user' | null>(null)
  const { asPath } = useRouter()

  const { data } = useGetSelfProfileQuery()

  useEffect(() => {
    if (data && asPath !== '/profile') {
      asPath === `${RouteNames.PROFILE}/${data.username}` ? setSelfOrUser('self') : setSelfOrUser('user')
    }
  }, [asPath, data])

  if (selfOrUser === 'self') return <SelfProfileInfo />
  if (selfOrUser === 'user') return <UserProfileInfo />
  return null
}
