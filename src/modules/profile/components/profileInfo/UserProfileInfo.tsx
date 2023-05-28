import styles from './ProfileInfo.module.scss'
import Avatar from '@/modules/profile/components/avatar/Avatar'
import StatisticItem from '@/modules/profile/components/profileInfo/statisticItem/StatisticItem'
import { useAppSelector } from '@/store/store'
import { AdditionalInfo } from '@/modules/profile/components/profileInfo/additionalInfo/AdditionalInfo'
import { useGetUserProfileQuery } from '@/modules/profile/services/profileService'
import { useRouter } from 'next/router'
import { useGetUserPostsProfileQuery } from '@/modules/posts/services/postsService'

export const UserProfileInfo = () => {
  const page = useAppSelector((state) => state.postsReducer.page)
  const pageSize = useAppSelector((state) => state.postsReducer.pageSize)

  const { asPath } = useRouter()
  const pathArr = asPath.split('/')
  const username = pathArr[pathArr.length - 1]

  const { data } = useGetUserProfileQuery({ username })
  const { data: dataPosts } = useGetUserPostsProfileQuery({ page, pageSize, username })

  if (!data) return null

  return (
    <div className={styles.block}>
      <div className={styles.info_block}>
        <div className={styles.image_wrapper}>
          <Avatar avatar={data.avatar} />
        </div>
        <div className={styles.info}>
          <div className={styles.info_header}>
            <div>
              <h1>{username}</h1>
              <AdditionalInfo name={data.name} surname={data.surname} birthday={data.birthday} city={data.city} />
            </div>
          </div>
          <div className={styles.statistics}>
            <StatisticItem title="Subscriptions" count={0} />
            <StatisticItem title="Subscribers" count={0} />
            <StatisticItem title="Publications" count={dataPosts?.count ?? 0} />
          </div>
          <p className={styles.description}>{data.aboutMe}</p>
        </div>
      </div>
    </div>
  )
}
