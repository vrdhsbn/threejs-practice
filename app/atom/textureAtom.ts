import { atom } from 'recoil'

export const textureAtom = atom<string>({
  key: 'textureAtom',
  default: 'texture1',
})
