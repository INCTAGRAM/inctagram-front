import { useState } from 'react'
import AdditionalInfo from '@/features/profile/profileInfo/additionalInfo/AdditionalInfo'
import GeneralInfo from '@/features/profile/profileInfo/generalInfo/GeneralInfo'
import { Nullable } from '@/common/types/Nullable'
import { FiltersPhotoPopup } from '@/features/popups/filtersPhotoPopup/FiltersPhotoPopup'
import styles from './ProfileInfo.module.scss'

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

const ProfileInfo = ({ info }: IProfileInfoProps) => {
  const [isShowPopup, setIsShowPopup] = useState(false)

  const { username, avatar, aboutMe, city, birthday } = info

  const [isShowMore, setIsShowMore] = useState(false)

  const onShowMoreBtnClick = () => setIsShowMore(!isShowMore)

  return (
    <div className={styles.block}>
      <GeneralInfo username={username} aboutMe={aboutMe} avatar={avatar} />
      <button className={styles.show_btn} onClick={onShowMoreBtnClick}>
        {!isShowMore ? 'Show more' : 'Hide'}
      </button>
      {isShowMore && <AdditionalInfo city={city} birthday={birthday} />}
      <FiltersPhotoPopup isShowPopup={isShowPopup} setIsShowPopup={setIsShowPopup} />
    </div>
  )
}

export default ProfileInfo
