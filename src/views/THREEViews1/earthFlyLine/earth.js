//创建一个地球球体
import * as THREE from 'three'
import config from './config.js'
const sphere=new THREE.SphereGeometry(config.R,36,36)
const material=new THREE.MeshBasicMaterial({
    color:0x444444,
    transparent:true,
})
const earth=new THREE.Mesh(sphere,material)

export {earth}
