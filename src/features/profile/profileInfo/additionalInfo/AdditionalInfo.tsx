import styles from './AdditionalInfo.module.scss'
import { formatDateOfBirth } from '@/utils'

interface IAdditionalInfoProps {
  city?: string
  birthday?: string
}

const AdditionalInfo = ({ city, birthday }: IAdditionalInfoProps) => {
  const isAdditionalInfo = [city, birthday].some((info) => !!info)

  return isAdditionalInfo ? (
    <div className={styles.additionalInfo}>
      {birthday && (
        <div className={styles.additionalInfo_item}>
          Date of Birth: <span>{formatDateOfBirth(birthday)}</span>
        </div>
      )}
      {city && (
        <div className={styles.additionalInfo_item}>
          City: <span>{city}</span>
        </div>
      )}
    </div>
  ) : (
    <div className={styles.no_content}>No information</div>
  )
}

export default AdditionalInfo
