export interface IFiltersPhotoPopup {
  isShowFilterPopup: boolean
  setIsShowFilterPopup: (arg: boolean) => void
  setIsShowCroppingPhotoPopup: (arg: boolean) => void
}

export type ValueType = {
  filterClass: string
  setFilterClass: (filterClass: string) => void
}
