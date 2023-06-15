export interface IFiltersPhotoPopup {
  isShowFilterPopup: boolean
  setIsShowFilterPopup: (arg: boolean) => void
  setIsShowCroppingPhotoPopup: (arg: boolean) => void
  setIsShowPublicationPopup: (arg: boolean) => void
  isShowCroppingPhotoPopup: boolean
}

export type ValueType = {
  filterClass: string
  setFilterClass: (filterClass: string) => void
}
