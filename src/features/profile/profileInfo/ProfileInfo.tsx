import styles from './ProfileInfo.module.scss'
import { useState } from 'react'
import AdditionalInfo from '@/features/profile/profileInfo/additionalInfo/AdditionalInfo'
import GeneralInfo from '@/features/profile/profileInfo/generalInfo/GeneralInfo'

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
      <GeneralInfo name={name} surname={surname} aboutMe={aboutMe} avatar={avatar} />
      <button className={styles.show_btn} onClick={onShowMoreBtnClick}>
        {!isShowMore ? 'Show more' : 'Hide'}
      </button>
      {isShowMore && <AdditionalInfo city={city} birthday={birthday} />}
    </div>
  )
}

export default ProfileInfo
