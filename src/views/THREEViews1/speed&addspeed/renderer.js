import * as THREE from 'three'
import { scene } from './scene'
import { camera } from './camera'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const renderer=new THREE.WebGLRenderer({
    antialias:true
})
renderer.setSize(window.innerWidth,window.innerHeight)

renderer.render(scene,camera)
renderer.setClearColor(0x000)
const control=new OrbitControls(camera,renderer.domElement)
export {renderer}