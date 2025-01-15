import * as THREE from 'three'
import { transform } from './transform'
import config from './config'
const geometry=new THREE.ConeGeometry(4,15,4)
const material=new THREE.MeshLambertMaterial({
    color :0xff00ff
})
const ZHUI=new THREE.Mesh(geometry,material)
const geometry1=new THREE.ConeGeometry(4,5,4)
const ZHUI1=new THREE.Mesh(geometry1,material)
ZHUI1.rotateX(Math.PI)
ZHUI1.position.y-=10
const coord=transform(config.R+7,116.3,39.5)
ZHUI.position.set(coord.x,coord.y,coord.z)
const q=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),new THREE.Vector3(coord.x,coord.y,coord.z).normalize())
ZHUI.quaternion.copy(q)
ZHUI.add(ZHUI1)
ZHUI.rotateX(Math.PI)

export {ZHUI}