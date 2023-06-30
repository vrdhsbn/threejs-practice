import { atom } from 'recoil'

export const materialAtom = atom<string>({
  key: 'materialAtom',
  default: '#ffffff',
})
