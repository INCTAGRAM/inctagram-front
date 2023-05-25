import styles from './InstaField.module.scss'
import instagramStyles from './imageField/Instagram.module.css'
import { filterValues } from '@/modules/createPost/constants/filterValues'
import { addFilterParams } from '@/modules/createPost/store/createPostSlice'
import { useAppDispatch, useAppSelector } from '@/store/store'

interface IInstaFieldProps {
  imgFile: string
}

export const InstaField = ({ imgFile }: IInstaFieldProps) => {
  const dispatch = useAppDispatch()
  const filterParametrs = useAppSelector((state) => state.createPostReducer.filterParameters)
  const activeIndexImage = useAppSelector((state) => state.createPostReducer.activeImage)

  const changeFilterHandler = (filterName: string) => {
    dispatch(addFilterParams({ imageIndex: activeIndexImage, filterClass: filterName }))
  }

  return (
    <div className={styles.images}>
      {filterValues.map((filter, i) => {
        const filterName = 'filter-' + filterValues[i].name.toLowerCase()
        const classFilterContainer =
          filterParametrs[activeIndexImage] === filterName
            ? `${styles.filterContainer} ${styles.active}`
            : styles.filterContainer
        return (
          <div key={i} className={classFilterContainer} onClick={() => changeFilterHandler(filterName)}>
            <img className={`${styles.imgWithFilter} ${instagramStyles[filterName]}`} src={imgFile} alt={''} />
            <p className={styles.filterName}>{filterName}</p>
          </div>
        )
      })}
    </div>
  )
}
