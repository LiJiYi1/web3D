import * as THREE from 'three'
function createRoad(pointArr){
const arr=new Float32Array(pointArr)
const geometry=new THREE.BufferGeometry()
geometry.attributes.position=new THREE.BufferAttribute(arr,3)
const material = new THREE.LineBasicMaterial({ color: 0x888888 })
const line=new THREE.Line(geometry,material)
return line
}
export {createRoad}