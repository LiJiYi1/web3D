import * as  THREE from 'three'
import { scene} from './scene.js'
import { camera } from './camera.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const renderer=new THREE.WebGLRenderer({
    antialias:true
})
renderer.setSize(window.innerWidth,window.innerHeight)
renderer.setClearColor(0xfffff1)
renderer.outputColorSpace =THREE.SRGBColorSpace
renderer.render(scene,camera)
const control=new OrbitControls(camera,renderer.domElement)
//缩放限制
control.maxDistance=600
control.minDistance=400
//旋转限制
control.maxPolarAngle =Math.PI*5/10.1
//禁止平移
control.enablePan=false
export {renderer,control}