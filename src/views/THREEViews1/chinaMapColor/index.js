import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { model } from './model.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'
const scene=new THREE.Scene()
scene.add(model)
const ambi=new THREE.AmbientLight()
ambi.intensity=0.9
scene.add(ambi)
const axes=new THREE.AxesHelper(100)
scene.add(axes)
const s=27
const k=window.innerWidth/window.innerHeight
const camera=new THREE.OrthographicCamera(-s*k,s*k,s,-s,1,3000)
camera.position.set(104,28,100)
camera.lookAt(104,28,0)
const renderer=new THREE.WebGLRenderer({
    antialias:true
})
const controls=new OrbitControls(camera,renderer.domElement)
controls.target.set(104,28,0)
controls.update();
renderer.setSize(window.innerWidth,window.innerHeight)
renderer.render(scene,camera)
const CSSRenderer=new CSS2DRenderer()
CSSRenderer.setSize(window.innerWidth,window.innerHeight)
CSSRenderer.render(scene,camera)
CSSRenderer.domElement.style.position='absolute'
CSSRenderer.domElement.style.left='0px'
CSSRenderer.domElement.style.top= '0px'
CSSRenderer.domElement.style.pointerEvents='none'
const div=document.createElement('div')
div.innerHTML='地点'
div.style.backgroundColor='black'
div.style.color='white'
div.style.borderRadius='3px'
div.style.opacity='0.7'
const cssObj=new CSS2DObject(div)
model.add(cssObj)
function loop(){
    renderer.render(scene,camera)
    CSSRenderer.render(scene,camera)
    requestAnimationFrame(loop)
}
loop()
export {renderer,camera,CSSRenderer,cssObj,div,scene}