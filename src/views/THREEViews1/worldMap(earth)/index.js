import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import { model } from './model.js'
const scene=new THREE.Scene()
scene.add(model)
const dirLight=new THREE.DirectionalLight()
scene.add(dirLight)
const ambi=new THREE.AmbientLight()
ambi.intensity=0.2
scene.add(ambi)
// const axes=new THREE.AxesHelper(82)
// scene.add(axes)
const k=2
const s =90
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 0.1, 1000)
camera.position.set(0,0,200)
camera.lookAt(0,0,0)
const renderer=new THREE.WebGLRenderer({
    antialias:true,
    preserveDrawingBuffer:true
})
renderer.render(scene,camera)
renderer.setSize(window.innerWidth,window.innerHeight)
function loop(){
renderer.render(scene,camera)
requestAnimationFrame(loop)
}
loop()
const control=new OrbitControls(camera,renderer.domElement)
control.addEventListener('change',(e)=>{
    console.log(camera.position);
    
})

export {renderer,camera,scene}