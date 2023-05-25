import { Nullable } from '@/common/types/Nullable'
import styles from './AdditionalInfo.module.scss'
import iconSet from '@/assets/icons/selection.json'
import IcomoonReact from 'icomoon-react'

interface IAdditionalInfoProps {
  name: Nullable<string>
  surname: Nullable<string>
  birthday: Nullable<string>
  city: Nullable<string>
}

export const AdditionalInfo = ({ name, surname, birthday, city }: IAdditionalInfoProps) => {
  return (
    <div className={styles.additionalInfo}>
      {(name || surname) && (
        <div className={styles.infoAndIcon}>
          <IcomoonReact icon={'person-outline'} iconSet={iconSet} color={'#ccc'} size={18} />
          <p className={styles.name}>{`${name} ${surname}`}</p>
        </div>
      )}
      {birthday && (
        <div className={styles.infoAndIcon}>
          <IcomoonReact icon={'calendar-outline'} iconSet={iconSet} color={'#ccc'} size={18} />
          <p className={styles.birthday}>{birthday}</p>
        </div>
      )}
      {city && (
        <div className={styles.infoAndIcon}>
          <IcomoonReact icon={'pin-outline'} iconSet={iconSet} color={'#ccc'} size={18} />
          <p className={styles.city}>{city}</p>
        </div>
      )}
    </div>
  )
}
