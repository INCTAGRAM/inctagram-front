import { SelfPosts } from '@/modules/posts/components/selfOrUserPosts/SelfPosts'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useGetSelfProfileQuery } from '@/modules/profile'
import { UserPosts } from '@/modules/posts/components/selfOrUserPosts/UserPosts'

export const Posts = () => {
  const [selfOrUser, setSelfOrUser] = useState<'self' | 'user' | null>(null)
  const { data } = useGetSelfProfileQuery()

  const { asPath } = useRouter()
  const usernameInPath = asPath.split(/[/?]/)[2]

  useEffect(() => {
    if (data) {
      usernameInPath === data.username ? setSelfOrUser('self') : setSelfOrUser('user')
    }
  }, [asPath, data])

  if (selfOrUser === 'self') return <SelfPosts usernameInPath={usernameInPath} avatar={data?.avatar.previewUrl ?? ''} />
  if (selfOrUser === 'user') return <UserPosts usernameInPath={usernameInPath} />
  return null
}
