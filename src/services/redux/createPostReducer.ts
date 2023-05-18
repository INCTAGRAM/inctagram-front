import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICroppingParameters, IPost } from '@/features/popups/createPostPopup/types'

const initialPostState: IPost = {
  description: '',
  originalImages: [],
  croppingParameters: [],
  images: [],
  filterParameters: [],
  prevFilterParameters: [],
  imagesAfterFilters: [],
  activeImage: 0,
}

const createPostSlice = createSlice({
  name: 'createPost',
  initialState: initialPostState,
  reducers: {
    addDescription(state, action: PayloadAction<string>) {
      state.description = action.payload
    },
    addImageAndCropParameters(state, action: PayloadAction<IAddImageAndCropParametersPayload>) {
      state.originalImages.push(action.payload.originalImage)
      state.croppingParameters.push(action.payload.croppingParameters)
    },
    removeImageAndCropParameters(state, action: PayloadAction<number>) {
      state.originalImages = state.originalImages.filter((img, i) => i !== action.payload)
      state.croppingParameters = state.croppingParameters.filter((img, i) => i !== action.payload)
    },
    changeActiveImage(state, action: PayloadAction<number>) {
      state.activeImage = action.payload
    },
    changeCroppingParamsImage(state, action: PayloadAction<IChangeCroppingParamsImagePayload>) {
      state.croppingParameters[action.payload.imageIndex] = action.payload.croppingParameters
    },
    addImages(state, action: PayloadAction<string[]>) {
      state.images = action.payload
    },
    addImagesAfterFilters(state, action: PayloadAction<string[]>) {
      state.imagesAfterFilters = action.payload
    },
    addFilterParams(state, action: PayloadAction<ChangeFiltersType>) {
      state.filterParameters[action.payload.imageIndex] = action.payload.filterClass
    },
    addPrevFilterParams(state, action: PayloadAction<ChangeFiltersType>) {
      state.prevFilterParameters[action.payload.imageIndex] = action.payload.filterClass
    },
    resetFilterParams(state) {
      state.filterParameters = []
      state.prevFilterParameters = []
    },
    changeImageAfterFilters(state, action: PayloadAction<ChangeImageAfterFiltersType>) {
      state.imagesAfterFilters[action.payload.imageIndex] = action.payload.urlImage
    },
    setInitialPostState() {
      return initialPostState
    },
  },
})

export const {
  addDescription,
  addImageAndCropParameters,
  removeImageAndCropParameters,
  changeActiveImage,
  changeCroppingParamsImage,
  addImages,
  addImagesAfterFilters,
  changeImageAfterFilters,
  addFilterParams,
  addPrevFilterParams,
  resetFilterParams,
  setInitialPostState,
} = createPostSlice.actions
export const createPostReducer = createPostSlice.reducer

// Interfaces
interface IAddImageAndCropParametersPayload {
  originalImage: string
  croppingParameters: ICroppingParameters
}

interface IChangeCroppingParamsImagePayload {
  imageIndex: number
  croppingParameters: ICroppingParameters
}

type ChangeImageAfterFiltersType = Omit<IChangeCroppingParamsImagePayload, 'croppingParameters'> & {
  urlImage: string
}

type ChangeFiltersType = Omit<IChangeCroppingParamsImagePayload, 'croppingParameters'> & {
  filterClass: string
}
