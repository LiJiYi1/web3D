import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import { model } from './model.js'
const scene=new THREE.Scene()
scene.add(model)
const dirLight=new THREE.DirectionalLight()
scene.add(dirLight)
dirLight.position.set(1601000, 1601000, 1601000)
dirLight.intensity=12
const ambi=new THREE.AmbientLight()
ambi.intensity=0.2
scene.add(ambi)
const axes=new THREE.AxesHelper(82)
scene.add(axes)
const k=window.innerWidth/window.innerHeight
const s =25858108.5*4/7
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 0.1, 25858108.5*10)
camera.position.set(
    364806.00164746994, -118062969,
    52980340.19497529)
camera.lookAt(0,0,0)
const renderer=new THREE.WebGLRenderer({
    antialias:true
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