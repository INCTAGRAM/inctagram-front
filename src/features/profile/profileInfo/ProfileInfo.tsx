import { Nullable } from '@/common/types/Nullable'
import styles from './ProfileInfo.module.scss'
import Avatar from '@/features/profile/avatar/Avatar'
import { Button } from '@/common/ui/button/Button'
import StatisticItem from '@/features/profile/profileInfo/statisticItem/StatisticItem'
import { useRouter } from 'next/router'
import { RouteNames } from '@/constants/routes'
import { useGetPostsProfileQuery } from '@/services/posts/postService'
import { useAppSelector } from '@/services/redux/store'
import { AdditionalInfo } from '@/features/profile/profileInfo/additionalInfo/AdditionalInfo'

interface IProfileInfoProps {
  info: IInfo
}

export interface IInfo {
  username: string
  name: Nullable<string>
  surname: Nullable<string>
  city: Nullable<string>
  birthday: Nullable<string>
  avatar: IAvatar
  aboutMe: Nullable<string>
}

interface IAvatar {
  previewUrl: Nullable<string>
  url: Nullable<string>
}

export const ProfileInfo = ({ info }: IProfileInfoProps) => {
  const page = useAppSelector((state) => state.postsReducer.page)
  const pageSize = useAppSelector((state) => state.postsReducer.pageSize)
  const { data } = useGetPostsProfileQuery({ page, pageSize })
  const { push } = useRouter()

  const onSettingsBtnClick = () => push(RouteNames.PROFILE_SETTINGS)

  const { username, name, surname, avatar, aboutMe, city, birthday } = info

  return (
    <div className={styles.block}>
      <div className={styles.info_block}>
        <div className={styles.image_wrapper}>
          <Avatar avatar={avatar} />
        </div>
        <div className={styles.info}>
          <div className={styles.info_header}>
            <div>
              <h1>{username}</h1>
              <AdditionalInfo name={name} surname={surname} birthday={birthday} city={city} />
            </div>
            <Button className={styles.editBtn} onClick={onSettingsBtnClick}>
              Edit Profile
            </Button>
          </div>
          <div className={styles.statistics}>
            <StatisticItem title="Subscriptions" count={0} />
            <StatisticItem title="Subscribers" count={0} />
            <StatisticItem title="Publications" count={data?.count ?? 0} />
          </div>
          <div className={styles.description}>{aboutMe}</div>
        </div>
      </div>
    </div>
  )
}
