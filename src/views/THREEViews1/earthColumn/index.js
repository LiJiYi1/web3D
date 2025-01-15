import * as THREE from 'three'
import { model } from './model'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const scene=new THREE.Scene()
scene.add(model)
const ambi=new THREE.AmbientLight()
ambi.intensity=6
scene.add(ambi)
const axes=new THREE.AxesHelper(150)
scene.add(axes)
const dirLight=new THREE.DirectionalLight()
dirLight.position.set(300,300,300)
scene.add(dirLight)
const camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,3000)
camera.position.set(200,200,200)
camera.lookAt(0,0,0)
const renderer=new THREE.WebGLRenderer({
    antialias:true
})
const controls=new OrbitControls(camera,renderer.domElement)
controls.addEventListener('change',(e)=>{
    console.log(e);
})
renderer.setSize(window.innerWidth,window.innerHeight)
renderer.render(scene,camera)
function loop(){
    model.rotation.y+=0.002
    renderer.render(scene,camera)
   requestAnimationFrame(loop)
}
loop()
export {renderer,camera,scene}
