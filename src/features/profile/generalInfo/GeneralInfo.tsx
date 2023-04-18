import styles from './GeneralInfo.module.scss'
import { Button } from '@/common/ui/button/Button'
import DefaultAvatar from '@/features/profile/defaultAvatar/DefaultAvatar'
import StatisticItem from '@/features/profile/generalInfo/statisticItem/StatisticItem'

interface IGeneralInfoProps {
  info: IInfo
}

export interface IInfo {
  username: string
  name: string
  surname: string
  city: string
  birthday: string
  avatar: IAvatar
  aboutMe: string
}

interface IAvatar {
  previewUrl: string
  url: string
}

const GeneralInfo = ({ info }: IGeneralInfoProps) => {
  const { username, name, surname, city, birthday, avatar, aboutMe } = info

  return (
    <div className={styles.block}>
      <div className={styles.image_wrapper}>
        <DefaultAvatar />
      </div>
      <div className={styles.info}>
        <div className={styles.info_header}>
          <h1>{`${name} ${surname}`}</h1>
          <div>
            <Button>Edit Profile</Button>
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
