import * as THREE from 'three'
import { model } from './mesh'
const scene=new THREE.Scene()
const axesHelper=new THREE.AxesHelper(222)
scene.add(axesHelper)
scene.add(model)
export {scene}