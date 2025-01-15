import * as THREE from 'three'
import { model } from './mesh.js'

const scene=new THREE.Scene()
const dirLight=new  THREE.DirectionalLight()
scene.add(dirLight)
dirLight.intensity=2
dirLight.position.set(100,100,100)
const  axes=new THREE.AxesHelper(50)
scene.add(axes)
const gridHelper = new THREE.GridHelper(100, 100);
scene.add(gridHelper);
scene.add(model)
export{scene}