import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { model } from './model'
const scene=new THREE.Scene()
scene.add(model)
const axes=new THREE.AxesHelper(150)
scene.add(axes)
const camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,3000)
camera.position.set(200,200,200)
camera.lookAt(0,0,0)
const renderer=new THREE.WebGLRenderer({
antialias:true
})
renderer.setSize(window.innerWidth,window.innerHeight)
const controls=new OrbitControls(camera,renderer.domElement)
function loop(){
    renderer.render(scene, camera)
    requestAnimationFrame(loop)
}
loop()
export {renderer,camera,scene}