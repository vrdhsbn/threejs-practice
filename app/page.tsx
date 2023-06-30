'use client'
import { NextPage } from 'next'
import Canvas from 'components/canvas'
import Select from 'components/select'
import { css } from '@emotion/react'
import { RecoilRoot } from 'recoil'

const Home: NextPage = () => {
  return (
    <RecoilRoot>
      <main css={main}>
        <Canvas />
        <Select />
      </main>
    </RecoilRoot>
  )
}

const main = css`
  background: #fff;
  color: #000;
  width: 414px;
  height: 100vh;
  margin: 0 auto;
`

export default Home
