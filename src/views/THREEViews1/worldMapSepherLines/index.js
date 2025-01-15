 import * as THREE  from 'three'
 import { model } from './model'
 import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
 const scene=new THREE.Scene()
 scene.add(model)
 const ambi=new THREE.AmbientLight()
 scene.add(ambi)
 const axes=new THREE.AxesHelper(100)
 scene.add(axes)
 const camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,3000)
 camera.position.set(200,200,200)
 camera.lookAt(0,0,0)
 const renderer=new THREE.WebGLRenderer({
    antialias:true
 })
 renderer.setSize(window.innerWidth,window.innerHeight)
 renderer.render(scene,camera)
const controls=new OrbitControls(camera,renderer.domElement)
function loop(){
    // model.rotation.y+=0.01
    renderer.render(scene,camera)
    requestAnimationFrame(loop)
}
loop()
export{renderer,camera,scene}