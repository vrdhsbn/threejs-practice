'use client'
import type { NextPage } from 'next'
import { useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import SelectBar from 'components/selectBar'
import { useRecoilValue } from 'recoil'
import { textureAtom } from '@/atom/textureAtom'

const Home: NextPage = () => {
  const textureState = useRecoilValue(textureAtom)

  let canvas: HTMLElement

  useEffect(() => {
    if (canvas) return

    // canvasを取得
    canvas = document.getElementById('canvas')! /* eslint-disable-line */

    // シーン
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)

    // サイズ
    const sizes = {
      width: innerWidth,
      height: innerHeight,
    }

    // カメラ
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
    camera.position.set(60, 30, 60)

    // 座標軸ヘルパー
    const axes = new THREE.AxesHelper(500)
    scene.add(axes)

    // 平面グリッドヘルパー
    const gridHelper = new THREE.GridHelper(80, 50, 0xffff00)
    scene.add(gridHelper)

    // レンダラー
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas || undefined,
      antialias: true,
      alpha: true,
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(window.devicePixelRatio)

    // テクスチャを設定する
    let texture: THREE.Texture
    let filename = ''
    switch (textureState) {
      case 'empty':
        break
      case 'texture1':
        filename = '/models/texture1.jpg'
        break
      case 'texture2':
        filename = '/models/texture2.jpg'
        break
      case 'texture3':
        filename = '/models/texture3.jpg'
        break
    }

    // モデルを読み込む
    const objLoader = new OBJLoader()
    objLoader.load(
      'models/base.obj',
      // ロード完了時の処理
      function (obj) {
        // テクスチャを読み込む
        if (filename !== '') {
          const loader = new THREE.TextureLoader()
          texture = loader.load(filename)
          obj.traverse(function (child) {
            if (child instanceof THREE.Mesh) child.material.map = texture
          })
        } else {
          obj.traverse(function (child) {
            if (child instanceof THREE.Mesh) child.material.map = ''
          })
        }

        // シーンへのモデルの追加
        // なぜか座標(0,0,0)にしても中心に配置されない…。
        // 向きも回転されているし、もともとのobjファイルのせいなのかな？
        // そのため以下のような調整が必要だった。
        obj.position.set(-7, 0, -23)
        obj.rotation.set((-1 * Math.PI) / 2, 0, Math.PI / 2)
        scene.add(obj)
      }
    )

    // ライト
    const ambientLight = new THREE.AmbientLight(0xffffff)
    scene.add(ambientLight)

    // コントローラの準備
    const controls = new OrbitControls(camera, document.body)

    // アニメーションループの開始
    function animate() {
      requestAnimationFrame(animate)

      // コントローラの更新
      controls.update()

      renderer.render(scene, camera)
    }
    animate()

    // ブラウザのリサイズ処理
    window.addEventListener('resize', () => {
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(window.devicePixelRatio)
    })
  }, [textureState])

  return (
    <>
      <canvas id="canvas"></canvas>
      <SelectBar />
    </>
  )
}

export default Home
