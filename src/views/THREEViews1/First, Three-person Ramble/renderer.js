import * as THREE from 'three'
import { scene } from './scene'
import { camera } from './camera'
import { model } from './mesh';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const renderer=new THREE.WebGLRenderer({
    antialias:true
})
renderer.setSize(window.innerWidth,window.innerHeight)
renderer.render(scene,camera)
// const control = new OrbitControls(camera, renderer.domElement)
// control.addEventListener('change',()=>{
//     control.target.set(model.position.x,model.position.y,model.position.z)
    
// })

export {renderer}