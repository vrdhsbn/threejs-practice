'use client'
import Image from 'next/image'
import { css } from '@emotion/react'
import { useRecoilState } from 'recoil'
import { textureAtom } from '@/atom/textureAtom'

const SelectBar = () => {
  const [textureState, setTextureState] = useRecoilState(textureAtom)

  return (
    <>
      <div css={menu}>
        <button css={emptyBox} onClick={() => setTextureState('empty')} />
        <button css={texture1} onClick={() => setTextureState('texture1')} />
        <button css={texture2} onClick={() => setTextureState('texture2')} />
        <button css={texture3} onClick={() => setTextureState('texture3')} />
      </div>
    </>
  )
}

const menu = css`
  position: fixed;
  top: 48px;
  right: 48px;
  width: 300px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  background: #fff;
  border-radius: 24px;
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.2);

  button {
    width: 56px;
    height: 32px;
    border-radius: 8px;
    cursor: pointer;
  }
`
const emptyBox = css`
  border: solid 1px #ccc;
`
const texture1 = css`
  background: url('./models/texture1.jpg') no-repeat;
  background-size: cover;
`
const texture2 = css`
  background: url('./models/texture2.jpg') no-repeat;
  background-size: cover;
`
const texture3 = css`
  background: url('./models/texture3.jpg') no-repeat;
  background-size: cover;
`
export default SelectBar
