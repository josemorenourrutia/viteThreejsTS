import * as THREE from 'three'
import CRC from './core/CRC'


import { fpsGraph, gui } from './core/gui'

import './style.css'

// Shaders
import vertexShader from '/@/shaders/vertex.glsl'
import fragmentShader from '/@/shaders/fragment.glsl'


let crc = new CRC('webgl');
let camera = crc.camera;
let renderer = crc.renderer;
let scene = crc.scene;
let controls = crc.controls;
// let axesHelper = crc.axesHelper;

gui.addInput(crc.axesHelper, 'visible', {
  label: 'AxesHelper',
})
// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.normalBias = 0.05
directionalLight.position.set(0.25, 2, 2.25)

scene.add(directionalLight)

const sphereMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uFrequency: { value: new THREE.Vector2(20, 15) },
  },
  vertexShader,
  fragmentShader,
})

const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(1, 32, 32),
  sphereMaterial,
)

sphere.position.set(0, 2, 0)
sphere.castShadow = true
scene.add(sphere)

const DirectionalLightFolder = gui.addFolder({
  title: 'Directional Light',
})

Object.keys(directionalLight.position).forEach(key => {
  DirectionalLightFolder.addInput(
    directionalLight.position,
    key as keyof THREE.Vector3,
    {
      min: -10,
      max: 10,
      step: 0.1,
    },
  )
})

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10, 10, 10),
  new THREE.MeshToonMaterial({ color: '#444' }),
)

plane.rotation.set(-Math.PI / 2, 0, 0)
plane.receiveShadow = true
scene.add(plane)

const clock = new THREE.Clock()

const loop = () => {
  const elapsedTime = clock.getElapsedTime()

  sphereMaterial.uniforms.uTime.value = elapsedTime

  fpsGraph.begin()

  controls.update()
  renderer.render(scene, camera)

  fpsGraph.end()
  requestAnimationFrame(loop)
}

loop()
