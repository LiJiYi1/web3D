import * as THREE from 'three'
import {model} from './mesh.js'
//创建场景
const scene=new THREE.Scene()
//场景雾化
scene.fog=new THREE.Fog(0Xffffff,20,888)
scene.add(model)
//创建光源
const direction = new THREE.DirectionalLight(0xffffff,3.6)
direction.position.set(100,100,100)
scene.add(direction)
//环境光
var ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);
//导出场景
export{scene}