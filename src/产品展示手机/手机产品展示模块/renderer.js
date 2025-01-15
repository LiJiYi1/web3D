import * as THREE from 'three'
import {scene} from "./scene.js"
import {camera} from "./camera.js"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
const renderer = new THREE.WebGLRenderer({
    antialias:true
})
renderer.setSize(window.innerWidth,window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setClearColor(0x000)
renderer.render(scene,camera)
const cssRender=new CSS3DRenderer()
cssRender.setSize(window.innerWidth,window.innerHeight)
cssRender.render(scene,camera)
cssRender.domElement.style.position='absolute'
cssRender.domElement.style.top = '0px'
// cssRender.domElement.style.left = '20px'
cssRender.domElement.style.pointerEvents='none'
const controls = new OrbitControls(camera, renderer.domElement)
controls.maxDistance =400
controls.minDistance =200
controls.enablePan=false

export {renderer,cssRender}