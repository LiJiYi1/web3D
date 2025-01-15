import * as THREE from 'three'
function createPoint(pointArr){
const arr=new Float32Array(pointArr)
const geometry=new THREE.BufferGeometry()
geometry.attributes.position=new THREE.BufferAttribute(arr,3)
const material = new THREE.PointsMaterial({ color: 0xffff00})
const point=new THREE.Points(geometry,material)
return point
}
export {createPoint}