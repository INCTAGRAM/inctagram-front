import { IPost } from '@/features/popups/createPostPopup/types'

export interface IFiltersPhotoPopup {
  post: IPost
  setPost: (images: IPost) => void
  isShowFilterPopup: boolean
  setIsShowFilterPopup: (arg: boolean) => void
  setIsShowCroppingPhotoPopup: (arg: boolean) => void
}

export type CustomFilterType = {
  contrast: number
  brightness: number
  saturate: number
  sepia: number
  gray: number
}

export type ValueType = {
  tabFilter: string
  setTabFilter: (tabFilter: string) => void
  filterClass: string
  setFilterClass: (filterClass: string) => void
  customFilter: CustomFilterType
  setCustomFilter: ({}: CustomFilterType) => void
}
