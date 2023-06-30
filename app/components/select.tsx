'use client'
import Image from 'next/image'
import { css } from '@emotion/react'
import { useRecoilState } from 'recoil'
import { geometryAtom } from '@/atom/geometryAtom'
import { materialAtom } from '@/atom/materialAtom'

const Select = () => {
  const [geometryShape, setGeometryShape] = useRecoilState<string>(geometryAtom)
  const [materialColor, setMaterialColor] = useRecoilState<string>(materialAtom)

  return (
    <>
      <div css={select}>
        <p>ジオメトリを選択</p>
        <div css={flex}>
          <button
            css={[box, geometry1]}
            onClick={() => setGeometryShape('Sphere')}
          />
          <button
            css={[box, geometry2]}
            onClick={() => setGeometryShape('Triangle')}
          />
          <button
            css={[box, geometry3]}
            onClick={() => setGeometryShape('Cube')}
          />
          <button
            css={[box, geometry4]}
            onClick={() => setGeometryShape('Torus')}
          />
        </div>
      </div>

      <div css={select}>
        <p>マテリアルを選択</p>
        <div css={flex}>
          <button
            css={[box, white]}
            onClick={() => setMaterialColor('#ffffff')}
          />
          <button
            css={[box, blue]}
            onClick={() => setMaterialColor('#3a3ae8')}
          />
          <button
            css={[box, yellow]}
            onClick={() => setMaterialColor('#e3e367')}
          />
          <button
            css={[box, red]}
            onClick={() => setMaterialColor('#eb0960')}
          />
          <button
            css={[box, donuts]}
            onClick={() => setMaterialColor('picture-donuts')}
          />
          <button
            css={[box, earth]}
            onClick={() => setMaterialColor('picture-earth')}
          />
          <button
            css={[box, moon]}
            onClick={() => setMaterialColor('picture-moon')}
          />
        </div>
      </div>

      <p css={messageArea}>
        Selected: {geometryShape} / {materialColor}
      </p>
    </>
  )
}

const select = css`
  margin-top: 16px;
`
const flex = css`
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  margin-top: 8px;
`
const box = css`
  width: 40px;
  height: 40px;
  border: none;
  cursor: pointer;
`
const geometry1 = css`
  background: url('/object1.png') no-repeat;
  background-size: 100%;
`
const geometry2 = css`
  background: url('/object2.png') no-repeat;
  background-size: 100%;
`
const geometry3 = css`
  background: url('/object3.png') no-repeat;
  background-size: 100%;
`
const geometry4 = css`
  background: url('/object4.png') no-repeat;
  background-size: 100%;
`
const white = css`
  background: #fff;
  border: solid 1px #ccc;
`
const blue = css`
  background: #3a3ae8;
`
const yellow = css`
  background: #e3e367;
`
const red = css`
  background: #eb0960;
`
const donuts = css`
  background: url(/donuts.jpg) no-repeat;
`
const earth = css`
  background: url(/earthmap1k.jpg) no-repeat;
  background-size: cover;
`
const moon = css`
  background: url(/moonmap1k.jpg) no-repeat;
  background-size: cover;
`
const messageArea = css`
  margin-top: 32px;
  font-size: 14px;
`
export default Select
