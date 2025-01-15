import * as  THREE from 'three'
import { model } from './mesh.js'
const scene=new THREE.Scene()
const axesHelper=new THREE.AxesHelper(100)
const dirLight=new THREE.DirectionalLight()
dirLight.position.set(200,100,200)
scene.add(dirLight)
scene.add(axesHelper)
scene.add(model)
export {scene}
