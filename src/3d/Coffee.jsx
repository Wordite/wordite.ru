// <!--

// <script>
// 	import * as THREE from 'three'
//    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

//    const w = 800
//    const h = 540

//    const scene = new THREE.Scene()
//    const camera = new THREE.PerspectiveCamera(70, 1920 / 1080, 0.1, 1000)

//    const renderer = new THREE.WebGLRenderer({ alpha: true })
//    renderer.toneMappingExposure = 2
//    renderer.toneMapping = THREE.ACESFilmicToneMapping
//    renderer.physicallyCorrectLights = true

//    const light = new THREE.AmbientLight(0xffffff, 1) // soft white light
//    scene.add(light)

//    const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
//    directionalLight.position.x = 2
//    directionalLight.position.y = 20
//    directionalLight.position.z = 50
//    scene.add(directionalLight)

//    const plight = new THREE.PointLight(0xffffff, 1, 100)
//    plight.position.set(5, 0, 5)
//    scene.add(plight)

//    renderer.setClearColor(0xffffff, 0)
//    renderer.setSize(w, h)
//    document.body.querySelector('.coffee').appendChild(renderer.domElement)

//    const loader = new GLTFLoader()
//    let model
//    const group = new THREE.Group()

//    const pivot = new THREE.Group() // Создаем pivot группу
//    scene.add(pivot)

//    loader.load('/3d/coffee.glb', function (gltf) {
// 	 console.log(gltf.scene)

// 	 group.add(...gltf.scene.children)
// 	 pivot.add(group) // Добавляем основную группу в pivot группу

// 	 // Центрируем pivot группу
// 	 const box = new THREE.Box3().setFromObject(group)
// 	 const center = box.getCenter(new THREE.Vector3())
// 	 group.position.sub(center) // Сдвигаем основную группу, чтобы центр был в начале координат
//    })

//    camera.position.z = 3.3
//    camera.position.x = 0.5

//    function animate() {
// 	 requestAnimationFrame(animate)

// 	 pivot.rotation.x += 0.001 // Вращаем pivot группу

// 	 renderer.render(scene, camera)
//    }

//    animate()

//    </script> -->


import { useStore } from '@nanostores/react'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { $section } from '../app/store/section'
import { $isMobile } from '../app/store/isMobile'


function getAdaptiveCoff() {
  const body = document.body
  const computedStyle = window.getComputedStyle(body)
  const fontSize = computedStyle.fontSize

  return parseInt(fontSize) / 20
}


let isNeedRender = false


function graphic(container) {
  let w = 900 * getAdaptiveCoff()
  let h = 168 * getAdaptiveCoff() + 640 * getAdaptiveCoff()

  let screenW = 1920 * getAdaptiveCoff()
  let screenH = 168 * getAdaptiveCoff() + 1080 * getAdaptiveCoff() + 100

  const scene = new THREE.Scene()
  let camera = new THREE.PerspectiveCamera(70, screenW / screenH, 0.1, 1000)

  function resizeScene() {
    w = 900 * getAdaptiveCoff()
    h = 168 * getAdaptiveCoff() + 640 * getAdaptiveCoff()

    screenW = 1920 * getAdaptiveCoff()
    screenH = 168 * getAdaptiveCoff() + 1080 * getAdaptiveCoff() + 100

    camera = new THREE.PerspectiveCamera(70, screenW / screenH, 0.1, 1000)
    camera.position.z = 4
    camera.position.x = 0.5

    renderer.setSize(w, h)
    renderer.setPixelRatio(window.devicePixelRatio)
  }

  window.addEventListener('resize', resizeScene)

  const renderer = new THREE.WebGLRenderer({ alpha: true, powerPreference: 'high-performance' })
  renderer.toneMappingExposure = 2
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.physicallyCorrectLights = true
  renderer.setPixelRatio(window.devicePixelRatio)

  const light = new THREE.AmbientLight(0xffffff, 1) // soft white light
  scene.add(light)

  const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
  directionalLight.position.set(2, 20, 50)
  scene.add(directionalLight)

  const plight = new THREE.PointLight(0xffffff, 1, 100)
  plight.position.set(5, 0, 5)
  scene.add(plight)

  renderer.setClearColor(0xffffff, 0)
  renderer.setSize(w, h)
  container.appendChild(renderer.domElement)

  const loader = new GLTFLoader()
  const group = new THREE.Group()

  const pivot = new THREE.Group()
  scene.add(pivot)

  loader.load('/3d/coffee.glb', function (gltf) {
    group.add(...gltf.scene.children)
    pivot.add(group)

    const box = new THREE.Box3().setFromObject(group)
    const center = box.getCenter(new THREE.Vector3())
    group.position.sub(center)
  })

  camera.position.z = 4
  camera.position.x = 0.5

  let isMouseDown = false
  let previousMousePosition = {
    x: 0,
    y: 0,
  }
  let targetRotation = {
    x: 0,
    y: 0,
  }
  let currentRotation = {
    x: 0,
    y: 0,
  }

  document.addEventListener('mousedown', (event) => {
    isMouseDown = true
    previousMousePosition = {
      x: event.clientX,
      y: event.clientY,
    }
    currentRotation = {
      x: pivot.rotation.x,
      y: pivot.rotation.y,
    }
  })

  document.addEventListener('mouseup', () => {
    isMouseDown = false
    targetRotation = {
      x: pivot.rotation.x,
      y: pivot.rotation.y,
    }
  })

  document.addEventListener('mousemove', (event) => {
    if (!isMouseDown) return

    const deltaX = event.clientX - previousMousePosition.x
    const deltaY = event.clientY - previousMousePosition.y

    //   targetRotation.y = currentRotation.y + deltaX * 0.005
    targetRotation.x = currentRotation.x + deltaY * 0.01
  })

  function animate() {
    requestAnimationFrame(animate)
    // console.log(isNeedRender)
    if (!isNeedRender) return

    if (!isMouseDown) {
      targetRotation.x += 0.001
    }

    pivot.rotation.x += (targetRotation.x - pivot.rotation.x) * 0.1
    // console.log('render coffee')
    renderer.render(scene, camera)
  }

  animate()
}



const Coffee = ({ className }) => {
  const section = useStore($section)
  const isMobile = useStore($isMobile)
  const container = useRef(null)

  isNeedRender = section === 2 && !isMobile
  useEffect(() => graphic(container.current), [])

  return <figure ref={container} className={'coffee ' + className}></figure>
}

export default Coffee
