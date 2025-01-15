import * as THREE from 'three'
import { model } from './mesh.js'
const dirLight=new THREE.DirectionalLight()
dirLight.intensity=12
const scene=new THREE.Scene()
const axes=new THREE.AxesHelper(200)
scene.add(dirLight)
scene.add(axes)
scene.add(model)
export{scene}
