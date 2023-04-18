import styles from './GeneralInfo.module.scss'
import Avatar from '@/features/profile/avatar/Avatar'
import { Button } from '@/common/ui/button/Button'
import StatisticItem from '@/features/profile/profileInfo/statisticItem/StatisticItem'

interface IGeneralInfoProps {
  name: string
  surname: string
  aboutMe: string
  avatar: IAvatar
}

interface IAvatar {
  previewUrl: string
  url: string
}

const GeneralInfo = ({ name, surname, aboutMe, avatar }: IGeneralInfoProps) => {
  return (
    <div className={styles.info_block}>
      <div className={styles.image_wrapper}>
        <Avatar avatar={avatar} />
      </div>
      <div className={styles.info}>
        <div className={styles.info_header}>
          <h1>
            {name} {surname}
          </h1>
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
