import styles from './GeneralInfo.module.scss'
import { Button } from '@/common/ui/button/Button'
import DefaultAvatar from '@/features/profile/defaultAvatar/DefaultAvatar'
import StatisticItem from '@/features/profile/generalInfo/statisticItem/StatisticItem'

const GeneralInfo = () => {
  return (
    <div className={styles.block}>
      <div className={styles.image_wrapper}>
        <DefaultAvatar />
      </div>
      <div className={styles.info}>
        <div className={styles.info_header}>
          <h1>URLProfile</h1>
          <div>
            <Button>Edit Profile</Button>
          </div>
        </div>
        <div className={styles.statistics}>
          <StatisticItem title="Subscriptions" count="2 218" />
          <StatisticItem title="Subscribers" count="2 358" />
          <StatisticItem title="Publications" count="2 764" />
        </div>
        <div className={styles.description}>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeneralInfo
