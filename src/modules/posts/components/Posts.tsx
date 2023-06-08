import { SelfPosts } from '@/modules/posts/components/selfOrUserPosts/SelfPosts'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { RouteNames } from '@/constants/routes'
import { useGetSelfProfileQuery } from '@/modules/profile/services/profileService'
import { UserPosts } from '@/modules/posts/components/selfOrUserPosts/UserPosts'

export const Posts = () => {
  const [selfOrUser, setSelfOrUser] = useState<'self' | 'user' | null>(null)

  const { asPath } = useRouter()

  const { data } = useGetSelfProfileQuery()

  useEffect(() => {
    if (data) {
      asPath === `${RouteNames.PROFILE}/${data.username}` ? setSelfOrUser('self') : setSelfOrUser('user')
    }
  }, [asPath, data])

  if (selfOrUser === 'self') return <SelfPosts />
  if (selfOrUser === 'user') return <UserPosts />
  return null
}
