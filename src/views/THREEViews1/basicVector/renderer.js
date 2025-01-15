import { camera } from './camera'
import { scene } from './scene'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const  renderer=new THREE.WebGLRenderer({
    antialias:true
})
renderer.setSize(window.innerWidth,window.innerHeight)
renderer.render(scene,camera)
renderer.setClearColor(0x000)
const control=new OrbitControls(camera,renderer.domElement)
export {renderer}