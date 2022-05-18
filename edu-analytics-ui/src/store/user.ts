// https://github.com/pmndrs/zusta
import create from 'zustand'

import { User } from 'firebase/auth'

interface IUserState {
  user: null | User;
  setUser: (user: null | User) => void;
}

const useStore = create<IUserState>(set => ({
  user: null,
  setUser: (user) => set({ user }),
}))

export default useStore
