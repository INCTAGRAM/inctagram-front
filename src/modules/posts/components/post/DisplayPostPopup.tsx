'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import s from './DisplayPostPopup.module.css'
import { useRouter } from 'next/router'
import { useGetPostProfileQuery } from '@/modules/posts/services/postsService'

export const DisplayPostPopup = ({ previewPost }: any) => {
  const router = useRouter()
  const { isLoading, data } = useGetPostProfileQuery({ postId: previewPost.id })
  const [post, setPost] = useState<any>({})

  const handleClick = () => {
    router.push('/profile')
    window.removeEventListener('click', handleClick)
  }

  window.addEventListener('click', handleClick)

  useEffect(() => {
    data && setPost(data)
  }, [data, isLoading])

  console.log(post)
  if (Object.keys(post).length === 0) return null

  return (
    <div className={s.popup}>
      <div className={s.container}>
        <div>
          <div className={s.image}>
            <Image src={post.images[0].url} alt={''} width={1214} height={574} />
          </div>
        </div>
      </div>
    </div>
  )
}
