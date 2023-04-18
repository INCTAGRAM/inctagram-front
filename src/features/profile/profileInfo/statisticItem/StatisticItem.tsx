import styles from './StatisticItem.module.scss'

interface IStatisticItemProps {
  title: string
  count: string
}

const StatisticItem = ({ title, count }: IStatisticItemProps) => {
  return (
    <div className={styles.statistic_item}>
      <div className={styles.count}>{count}</div>
      <div className={styles.title}>{title}</div>
    </div>
  )
}

export default StatisticItem
