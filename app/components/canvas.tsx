'use client'
import { useEffect } from 'react'
import * as THREE from 'three'
import { css } from '@emotion/react'
import { useRecoilValue } from 'recoil'
import { geometryAtom } from '@/atom/geometryAtom'
import { materialAtom } from '@/atom/materialAtom'

const Canvas = () => {
  const geometryState = useRecoilValue(geometryAtom)
  const materialState = useRecoilValue(materialAtom)

  let canvas: HTMLElement
  let rot = 0

  useEffect(() => {
    if (canvas) return

    // canvasを取得
    canvas = document.getElementById('canvas')! /* eslint-disable-line */

    // シーン
    const scene = new THREE.Scene()

    // サイズ
    const sizes = {
      width: canvas.clientWidth,
      height: canvas.clientHeight,
    }

    // カメラ
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
    camera.position.set(0, 400, 0)

    // レンダラー
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas || undefined,
      antialias: true,
      alpha: true,
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(window.devicePixelRatio)

    // ジオメトリの設定
    let geometry
    switch (geometryState) {
      case 'Sphere':
        geometry = new THREE.SphereGeometry(300, 30, 30)
        break
      case 'Triangle':
        geometry = new THREE.ConeGeometry(250, 500, 32)
        break
      case 'Cube':
        geometry = new THREE.BoxGeometry(300, 300, 300)
        break
      case 'Torus':
        geometry = new THREE.TorusGeometry(180, 90, 32, 32)
        break
    }

    // マテリアルの設定
    let material
    let filename = ''
    if (materialState.includes('picture')) {
      // 画像が選択された場合はテクスチャを適用する
      switch (materialState) {
        case 'picture-donuts':
          filename = 'donuts.jpg'
          break
        case 'picture-earth':
          filename = 'earthmap1k.jpg'
          break
        case 'picture-moon':
          filename = 'moonmap1k.jpg'
          break
      }
      const loader = new THREE.TextureLoader()
      const texture = loader.load(filename)
      material = new THREE.MeshStandardMaterial({
        map: texture,
        side: THREE.DoubleSide,
      })
    } else {
      // カラーコードが選択された場合はその色を適用する
      material = new THREE.MeshStandardMaterial({
        color: materialState,
      })
    }

    // ジオメトリとマテリアルを組み合わせてシーンに追加
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // ライト
    const directionalLight = new THREE.DirectionalLight(0xffffff)
    directionalLight.position.set(0, 2, 10)
    scene.add(directionalLight)

    // 背景の星屑
    function createStarField() {
      // 頂点情報を作成
      const vertices = []
      for (let i = 0; i < 1000; i++) {
        const x = 3000 * (Math.random() - 0.5)
        const y = 3000 * (Math.random() - 0.5)
        const z = 3000 * (Math.random() - 0.5)
        vertices.push(x, y, z)
      }

      // 形状データを作成
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(vertices, 3)
      )

      // マテリアルを作成
      const material = new THREE.PointsMaterial({
        size: 10,
        color: 0xffffff,
      })

      // 物体を作成
      const mesh = new THREE.Points(geometry, material)
      scene.add(mesh)
    }

    createStarField()

    // アニメーション
    function tick() {
      // 毎フレーム角度を0.5度ずつ足していく
      rot += 0.5 /* eslint-disable-line */
      // ラジアンに変換する
      const radian = (rot * Math.PI) / 180
      // 角度に応じてカメラの位置を設定
      camera.position.x = 1000 * Math.sin(radian)
      camera.position.z = 1000 * Math.cos(radian)
      // 原点方向を見つめる
      camera.lookAt(new THREE.Vector3(0, 0, 0))

      // レンダリング
      renderer.render(scene, camera)
      requestAnimationFrame(tick)
    }
    tick()
  }, [materialState, geometryState])

  return <canvas id="canvas" css={canvasBackground}></canvas>
}

const canvasBackground = css`
  background: #000;
  width: 100%;
  height: auto;
  aspect-ratio: 1;
`

export default Canvas
