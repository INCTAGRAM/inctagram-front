import { create } from 'zustand'

interface IAuthStore {
  isAuthorization: boolean
  setIsAuthorization: (payload: boolean) => void
}

const useAuth = create<IAuthStore>((set) => ({
  isAuthorization: false,
  setIsAuthorization: (payload: boolean) => set((state) => ({ ...state, isAuthorization: payload })),
}))

export default useAuth
