import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { model } from './model.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js'
const scene=new THREE.Scene()
scene.add(model)
const ambi=new THREE.AmbientLight()
ambi.intensity=2
scene.add(ambi)
const axes=new THREE.AxesHelper(100)
scene.add(axes)
const s=27
const k=window.innerWidth/window.innerHeight
const camera=new THREE.OrthographicCamera(-s*k,s*k,s,-s,1,3000)
camera.position.set(105, -408, 269.3412854971238)
camera.lookAt(104, 28.48, 0)
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

function loop(){
    renderer.render(scene,camera)
    CSSRenderer.render(scene,camera)
    requestAnimationFrame(loop)
}
loop()
export {renderer,camera,CSSRenderer,scene}