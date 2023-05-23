import styles from '../ControlElement.module.scss'

interface IAspectControlProps {
  setAspect: (aspect: number) => void
}
export const AspectControl = ({ setAspect }: IAspectControlProps) => {
  return (
    <div className={`${styles.popupControlElement} ${styles.aspectControlElement}`}>
      <p className={styles.sides1_1} onClick={() => setAspect(1)}>
        1:1
      </p>
      <p className={styles.sides4_5} onClick={() => setAspect(4 / 5)}>
        4:5
      </p>
      <p className={styles.sides16_9} onClick={() => setAspect(16 / 9)}>
        16:9
      </p>
    </div>
  )
}
