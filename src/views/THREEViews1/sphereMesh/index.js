import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { model } from './model.js';
import { CSS2DObject, CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer';

const scene=new THREE.Scene()
scene.add(model)
const axes=new THREE.AxesHelper(150)
scene.add(axes)
const dirLight=new THREE.DirectionalLight()
dirLight.position.set(400,400,400)
scene.add(dirLight)
const ambi=new THREE.AmbientLight()
scene.add(ambi)
const camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,3000)
camera.position.set(200,200,200)
camera.lookAt(0,0,0)
const renderer=new THREE.WebGLRenderer({antialias:true})
const controls=new OrbitControls(camera,renderer.domElement)
renderer.setSize(window.innerWidth,window.innerHeight)
const CSSRenderer=new CSS2DRenderer()
CSSRenderer.domElement.style.position='absolute'
CSSRenderer.domElement.style.left='0px'
CSSRenderer.domElement.style.top='0px'
CSSRenderer.domElement.style.pointerEvents='none'
const div=document.createElement('div')
div.innerHTML='wwww'
div.style.backgroundColor='black'
div.style.color='white'
div.style.visibility='hidden'
const CSS2DObj=new CSS2DObject(div)
scene.add(CSS2DObj)
CSSRenderer.setSize(window.innerWidth,window.innerHeight)
function loop(){
    renderer.render(scene, camera)
    CSSRenderer.render(scene,camera)
    requestAnimationFrame(loop)
}
loop()
export {renderer,camera,CSSRenderer,div,CSS2DObj,scene}