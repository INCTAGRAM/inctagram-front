import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICroppingParameters, IPost } from '@/features/popups/createPostPopup/types'

const initialPostState: IPost = {
  description: '',
  originalImages: [],
  croppingParameters: [],
  images: [],
  activeImage: 0,
}

export const createPostSlice = createSlice({
  name: 'createPost',
  initialState: initialPostState,
  reducers: {
    addDescription(state, action: PayloadAction<string>) {
      state.description = action.payload
    },
    addOriginalImages(state, action: PayloadAction<string[]>) {
      state.originalImages = action.payload
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
    setInitialPostState() {
      return initialPostState
    },
  },
})

export const {
  addDescription,
  addOriginalImages,
  addImageAndCropParameters,
  removeImageAndCropParameters,
  changeActiveImage,
  changeCroppingParamsImage,
  addImages,
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
