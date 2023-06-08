import { SelfProfileInfo } from '@/modules/profile/components/profileInfo/SelfProfileInfo'
import { useGetSelfProfileQuery } from '@/modules/profile/services/profileService'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { UserProfileInfo } from '@/modules/profile/components/profileInfo/UserProfileInfo'

export const Profile = () => {
  const [selfOrUser, setSelfOrUser] = useState<'self' | 'user' | null>(null)
  const { asPath } = useRouter()

  const { data } = useGetSelfProfileQuery()
  const usernameInPath = asPath.split(/[/?]/)[2]

  useEffect(() => {
    if (data && asPath !== '/profile') {
      usernameInPath === data.username ? setSelfOrUser('self') : setSelfOrUser('user')
    }
  }, [asPath, data])

  if (selfOrUser === 'self') return <SelfProfileInfo />
  if (selfOrUser === 'user') return <UserProfileInfo />
  return null
}
