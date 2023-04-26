import styles from './GeneralInfo.module.scss'
import Avatar from '@/features/profile/avatar/Avatar'
import { Button } from '@/common/ui/button/Button'
import StatisticItem from '@/features/profile/profileInfo/statisticItem/StatisticItem'
import { useRouter } from 'next/router'
import { RouteNames } from '@/constants/routes'
import { Nullable } from '@/common/types/Nullable'

interface IGeneralInfoProps {
  username: string
  aboutMe: Nullable<string>
  avatar: IAvatar
}

interface IAvatar {
  previewUrl: Nullable<string>
  url: Nullable<string>
}

const GeneralInfo = ({ username, aboutMe, avatar }: IGeneralInfoProps) => {
  const { push } = useRouter()

  const onSettingsBtnClick = () => push(RouteNames.PROFILE_SETTINGS)

  return (
    <div className={styles.info_block}>
      <div className={styles.image_wrapper}>
        <Avatar avatar={avatar} />
      </div>
      <div className={styles.info}>
        <div className={styles.info_header}>
          <h1>{username}</h1>
          <div>
            <Button onClick={onSettingsBtnClick}>Edit Profile</Button>
          </div>
        </div>
        <div className={styles.statistics}>
          <StatisticItem title="Subscriptions" count="0" />
          <StatisticItem title="Subscribers" count="0" />
          <StatisticItem title="Publications" count="0" />
        </div>
        <div className={styles.description}>
          <div>{aboutMe}</div>
        </div>
      </div>
    </div>
  )
}

export default GeneralInfo
