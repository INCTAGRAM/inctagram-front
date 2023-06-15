import s from '@/modules/profileSettings/components/topPanel/TopPanel.module.scss'
import { RouteNames } from '@/constants/routes'
import { useRouter } from 'next/router'

type Props = {
  tabName: string
  isSelected: boolean
  tabQueryParam: string
}

export const Tab = ({ tabName, isSelected, tabQueryParam }: Props) => {
  const { push } = useRouter()
  const onClickHandler = (tabQueryParam: string) => {
    push(`${RouteNames.PROFILE_SETTINGS}${tabQueryParam}`, undefined, { scroll: false })
  }

  return (
    <h2 className={`${isSelected && s.selected}`} onClick={() => onClickHandler(tabQueryParam)}>
      {tabName}
    </h2>
  )
}
