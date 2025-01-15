import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls'
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js'
import { model } from './model.js'
const scene=new THREE.Scene()
scene.add(model)
const dirLight=new THREE.DirectionalLight()
scene.add(dirLight)
dirLight.position.set(100,100,100)
const ambi=new THREE.AmbientLight()
ambi.intensity=0.5
scene.add(ambi)
const axes=new THREE.AxesHelper(82)
scene.add(axes)
const k=window.innerWidth/window.innerHeight
const s=30
const camera=new THREE.OrthographicCamera(-s*k,s*k,s,-s,1,1000)
camera.position.set(104, 28.48, 269.3412854971238)
camera.lookAt(104, 28.48,0)
const renderer=new THREE.WebGLRenderer({
    antialias:true
})
renderer.setSize(window.innerWidth,window.innerHeight)
const CSSRenderer=new CSS2DRenderer()
CSSRenderer.setSize(window.innerWidth,window.innerHeight)
CSSRenderer.render(scene,camera)
CSSRenderer.domElement.style.position='absolute'
CSSRenderer.domElement.style.left='20px'
CSSRenderer.domElement.style.top='30px'
CSSRenderer.domElement.style.pointerEvents='none'
function loop(){
renderer.render(scene,camera)
CSSRenderer.render(scene,camera)
requestAnimationFrame(loop)
}
loop()
const control=new OrbitControls(camera,renderer.domElement)
control.target.set(104, 28.48, 0)
control.update()
control.addEventListener('change',()=>{
    // console.log(camera.position);
    
})
export {renderer,camera,CSSRenderer,scene}