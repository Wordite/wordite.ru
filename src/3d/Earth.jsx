import { useStore } from '@nanostores/react'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { $section } from '../app/store/section'
import { $loader } from '../app/store/loader'
import { $earth } from '../app/store/earth'


let isNeedRender = true
let isFirstView = true
let isReady = false
const clock = new THREE.Clock()
let isMobile = false

function easeInOutQuint(x) {
  const res = x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2
  return res > 1 ? 1 : res
}


function graphic(container) {
  isMobile = window.innerWidth <= 768

  let w = window.innerWidth
  let h = window.innerHeight
  let earth, moon

  let scene = new THREE.Scene()
  let camera = new THREE.PerspectiveCamera(40, w / h, 1, 15000)

  function resizeScene() {
    isMobile = window.innerWidth <= 768

    w = window.innerWidth
    h = window.innerHeight

    camera = new THREE.PerspectiveCamera(40, w / h, 1, 15000)
    renderer.setSize(w, h)
    renderer.setPixelRatio(window.devicePixelRatio)

    targetZPosition = isMobile ? 15250 : 15000
  }

  window.addEventListener('resize', resizeScene)



  camera.position.x = 0
  camera.position.y = 500
  camera.position.z = 15000

  const hlight = new THREE.AmbientLight(0x404040, 70)
  scene.add(hlight)

  //Adding directional lights
  const directionalLight = new THREE.DirectionalLight(0xffffff, 100)
  directionalLight.position.set(-1, 0.2, 0)
  directionalLight.castShadow = true
  scene.add(directionalLight)

  const renderer = new THREE.WebGLRenderer({ alpha: true, powerPreference: 'high-performance' })
  renderer.setSize(w, h)
  renderer.setPixelRatio(window.devicePixelRatio)


  container.appendChild(renderer.domElement)

  let t = 0
  let radius = 700
  const angularSpeed = 0.65
  const y0 = 245
  let targetZPosition = isMobile ? 15250 : 15000

  function animate() {
    requestAnimationFrame(animate)
    if (!isNeedRender) return

    const delta = clock.getDelta()

    earth.rotation.y += 0.03 * delta
    moon.rotation.y -= 0.15 * delta

    radius = isMobile ? 500 : 700

    const x = radius * Math.cos(angularSpeed * t)
    const z = radius * Math.sin(angularSpeed * t)
    const y = y0

    moon.position.set(x, y, z)
    t += 0.1 * delta


    let coff = isFirstView ? easeInOutQuint(clock.getElapsedTime() / 3.3) : 1

    camera.position.z = targetZPosition - 13400 * coff
    camera.position.y = 500 - 500 * coff
    camera.rotation.x = 0.35 - 0.35 * coff

    if (isMobile) {
      moon.scale.set(0.12, 0.12, 0.12)
      earth.scale.set(0.8, 0.8, 0.8)
    }
    else {
      moon.scale.set(0.15, 0.15, 0.15)
      earth.scale.set(1, 1, 1)
    }

    if (isFirstView && coff > .97 && !isReady) {
      $earth.set('ready')
      isReady = true
    }

    // console.log('earth render')
    renderer.render(scene, camera)
  }

  const loader = new GLTFLoader()
  loader.load('/3d/earth.glb', function (gltf) {
    earth = gltf.scene.children[0]
    earth.geometry.center()

    scene.add(gltf.scene)

    loader.load('/3d/moon.glb', function (gltf) {
      moon = gltf.scene.children[0]
      moon.position.x = 740
      moon.position.y = 245
      moon.scale.set(0.15, 0.15, 0.15)

      scene.add(gltf.scene)
      $earth.set('loaded')

      animate()
    })
  })
}

const Earth = ({ className }) => {
  const section = useStore($section)
  const container = useRef(null)
  const loader = useStore($loader)

  isNeedRender = section === 1 && loader === 'closed'
  if (section !== 1 && isFirstView) isFirstView = false
  // isNeedRender = section === 1

  if (isNeedRender) clock.start()
  else clock.stop()

  useEffect(() => graphic(container.current), [])

  return <figure ref={container} className={'earth ' + className}></figure>
}

export default React.memo(Earth)
