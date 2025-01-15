import * as THREE from 'three'
import { scene } from './scene'
import { camera } from './camera'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { render } from 'vue';
const  renderer=new THREE.WebGLRenderer({
    antialias:true
})
renderer.setClearColor(0x000)
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene,camera)
const controls = new OrbitControls(camera, renderer.domElement)
export {renderer}