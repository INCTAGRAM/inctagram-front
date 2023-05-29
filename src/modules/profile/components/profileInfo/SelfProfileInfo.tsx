import styles from './ProfileInfo.module.scss'
import Avatar from '@/modules/profile/components/avatar/Avatar'
import { Button } from '@/common/ui/button/Button'
import StatisticItem from '@/modules/profile/components/profileInfo/statisticItem/StatisticItem'
import { useRouter } from 'next/router'
import { RouteNames } from '@/constants/routes'
import { useGetSelfPostsProfileQuery } from '@/modules/posts'
import { useAppSelector } from '@/store/store'
import { AdditionalInfo } from '@/modules/profile/components/profileInfo/additionalInfo/AdditionalInfo'
import { useGetSelfProfileQuery } from '@/modules/profile/services/profileService'

export const SelfProfileInfo = () => {
  const { data } = useGetSelfProfileQuery()

  const page = useAppSelector((state) => state.postsReducer.page)
  const pageSize = useAppSelector((state) => state.postsReducer.pageSize)
  const { data: dataPosts } = useGetSelfPostsProfileQuery({ page, pageSize })
  const { push } = useRouter()

  const onSettingsBtnClick = () => push(RouteNames.PROFILE_SETTINGS)

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
              <h1>{data.username}</h1>
              <AdditionalInfo name={data.name} surname={data.surname} birthday={data.birthday} city={data.city} />
            </div>
            <Button className={styles.editBtn} onClick={onSettingsBtnClick}>
              Edit Profile
            </Button>
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
