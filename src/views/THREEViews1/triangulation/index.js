import * as THREE from 'three'
import { model } from './model'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const scene=new THREE.Scene()
scene.add(model)
const ambi=new THREE.AmbientLight()
scene.add(ambi)
const axes=new THREE.AxesHelper(60)
scene.add(axes)
const camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,3000)
camera.position.set(106,44,22)
camera.lookAt(106,44,0)
const renderer=new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth,window.innerHeight)
//const controls=new OrbitControls(camera,renderer.domElement)
function loop(){
    renderer.render(scene,camera)
    requestAnimationFrame(loop)
}
loop()

export {camera,renderer,scene}