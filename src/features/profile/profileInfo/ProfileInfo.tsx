import styles from './ProfileInfo.module.scss'
import { Button } from '@/common/ui/button/Button'
import Avatar from '@/features/profile/avatar/Avatar'
import StatisticItem from '@/features/profile/profileInfo/statisticItem/StatisticItem'
import { useState } from 'react'
import AdditionalInfo from '@/features/profile/profileInfo/additionalInfo/AdditionalInfo'

interface IProfileInfoProps {
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

const ProfileInfo = ({ info }: IProfileInfoProps) => {
  const { name, surname, avatar, aboutMe, city, birthday } = info

  const [isShowMore, setIsShowMore] = useState(false)

  const onShowMoreBtnClick = () => setIsShowMore(!isShowMore)

  return (
    <div className={styles.block}>
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
      <button className={styles.show_btn} onClick={onShowMoreBtnClick}>
        {!isShowMore ? 'Show more' : 'Hide'}
      </button>
      {isShowMore && <AdditionalInfo city={city} birthday={birthday} />}
    </div>
  )
}

export default ProfileInfo
