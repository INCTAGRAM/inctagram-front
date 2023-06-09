import { FC } from 'react'
import styles from './Device.module.scss'
import { LogOut } from '@/common/ui/logOut/LogOut'
import { useTerminateSessionMutation } from '@/modules/profileSettings/services/devicesService'
import { getBrowser } from '@/modules/profileSettings/helpers/getBrowser'
import { checkIPAddress } from '@/modules/profileSettings/helpers/checkIPAddress '
import { getFormattedDate } from '@/modules/profileSettings/helpers/getFormattedDate'
import iconSet from '@/assets/icons/selection.json'
import IcomoonReact from 'icomoon-react'

export const Device: FC<DevicePropsType> = ({ deviceName, deviceId, isMyDevice, ip, lastActiveDate }) => {
  const [terminateSession] = useTerminateSessionMutation()

  const browserName = getBrowser(deviceName)
  const addressIP = checkIPAddress(ip)
  const formattedDate = getFormattedDate(lastActiveDate)

  const handleTerminateSessionClick = () => {
    terminateSession(deviceId)
  }

  return (
    <div className={styles.device}>
      <IcomoonReact iconSet={iconSet} icon={'google-svgrepo-com-1'} size={36} className={styles.icon} color={'white'} />
      <div className={styles.deviceInfo}>
        <p className={styles.browserName}>{browserName}</p>
        <p className={styles.ip}>{`IP: ${addressIP}`}</p>
        <span>{isMyDevice ? <span>Online</span> : `last visit: ${formattedDate}`}</span>
      </div>
      {!isMyDevice && (
        <div className={styles.logOut}>
          <LogOut className={styles.logOutButton} onClick={handleTerminateSessionClick} />
        </div>
      )}
    </div>
  )
}

type DevicePropsType = {
  deviceName: string
  deviceId: string
  isMyDevice: boolean
  ip: string
  lastActiveDate: string
}
