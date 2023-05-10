import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICroppingParameters, IPost } from '@/features/popups/createPostPopup/types'

const initialPostState: IPost = {
  description: '',
  originalImages: [],
  croppingParameters: [],
  images: [],
  imagesAfterFilters: [],
  activeImage: 0,
}

export const createPostSlice = createSlice({
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
    changeImageAfterFilters(state, action: PayloadAction<IChangeImageAfterFilters>) {
      debugger
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

interface IChangeImageAfterFilters {
  imageIndex: number
  urlImage: string
}
