import * as THREE from 'three'
import { model } from './model'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';




const scene=new THREE.Scene()
scene.add(model)
const camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,3000)
camera.position.set(100,100,100)
camera.lookAt(0,0,0)
const renderer=new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth,window.innerHeight)
const dirLight=new THREE.DirectionalLight()
scene.add(dirLight)
function loop(){
    renderer.render(scene,camera)
    requestAnimationFrame(loop)
}
loop()
const control=new OrbitControls(camera,renderer.domElement)
export{renderer,scene,camera}