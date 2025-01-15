import * as THREE from 'three'
import { model } from './model'
import * as dat from 'dat.gui'
const gui=new dat.GUI()
const first=gui.addFolder('光源1')
const second=gui.addFolder('光源2')
const scene=new THREE.Scene()
scene.add(model)
const AmbientLight = new THREE.AmbientLight(0x404040)
scene.add(AmbientLight)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(50,0,-50)
scene.add(directionalLight);
const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight1.position.set(50, 0, 50)
scene.add(directionalLight1);
const axesHelper=new THREE.AxesHelper(50)
// scene.add(axesHelper)
const light={
    intensity:0,
    intensity1: 0,
    envMapIntensity:0
}
first.add(directionalLight.position,'x',-100,100)
first.add(directionalLight.position, 'y', -100, 100)
first.add(directionalLight.position, 'z', -100, 100)
first.add(light, 'intensity', 0, 3).onChange((value)=>{
    directionalLight.intensity=value
}).name('平行光1强度')
second.add(directionalLight1.position, 'x', -100, 100)
second.add(directionalLight1.position, 'y', -100, 100)
second.add(directionalLight1.position, 'z', -100, 100)
second.add(light, 'intensity1', 0, 3).onChange((value) => {
    directionalLight1.intensity = value
}).name('平行光2强度')
gui.add(AmbientLight,'intensity',0,200).name('环境光强度')
gui.domElement.style.visibility='hidden'

export {scene,gui}