import { Button } from '@/common/ui/button/Button'
import styles from './Devices.module.scss'
import {
  useGetDevicesQuery,
  useTerminateAllOtherSessionsMutation,
} from '@/modules/profileSettings/services/devicesService'
import { SkeletonDevice } from '@/modules/profileSettings/components/devices/skeleton/SkeletonDevice'
import { Device } from '@/modules/profileSettings/components/devices/device/Device'

export const Devices = () => {
  const { data } = useGetDevicesQuery(undefined, { refetchOnMountOrArgChange: true, pollingInterval: 60000 })
  const [terminateAllOtherSessions] = useTerminateAllOtherSessionsMutation()

  if (!data) return <SkeletonDevice />

  const currentDevice = data?.find((device) => device.isCurrent)
  const otherDevices = data?.filter((device) => !device.isCurrent)

  const otherDevicesList = otherDevices?.map((device) => {
    return (
      <Device
        key={device.deviceId}
        deviceName={device.deviceName}
        deviceId={device.deviceId}
        isMyDevice={device.isCurrent}
        ip={device.ip}
        lastActiveDate={device.lastActiveDate}
      />
    )
  })
  const handleEndSessionsClick = () => {
    terminateAllOtherSessions()
  }

  return (
    <div className={styles.container}>
      <div>This devices</div>
      {currentDevice && (
        <Device
          deviceName={currentDevice.deviceName}
          deviceId={currentDevice.deviceId}
          isMyDevice={true}
          ip={currentDevice.ip}
          lastActiveDate={currentDevice.lastActiveDate}
        />
      )}
      <Button
        variant={'outlined'}
        className={styles.button}
        onClick={handleEndSessionsClick}
        disabled={otherDevicesList && otherDevicesList.length === 0}
      >
        Terminate all other session
      </Button>
      <div className={styles.title}>Active sessions</div>
      {otherDevicesList && otherDevicesList.length > 0 ? otherDevicesList : <h3>No other active sessions detected</h3>}
    </div>
  )
}
