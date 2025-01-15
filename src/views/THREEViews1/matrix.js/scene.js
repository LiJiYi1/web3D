import * as THREE from 'three'
import {model} from './mesh.js'
const scene=new THREE.Scene()
const dirLight=new THREE.DirectionalLight()
dirLight.intensity=1
dirLight.position.set(200,200,100)
scene.add(dirLight)
const axes=new THREE.AxesHelper(200)
scene.add(axes)
scene.add(model)
export {
    scene
}
