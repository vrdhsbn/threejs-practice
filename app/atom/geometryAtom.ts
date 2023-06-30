import { atom } from 'recoil'

export const geometryAtom = atom<string>({
  key: 'geometryAtom',
  default: 'Sphere',
})
