import * as THREE from 'three'
function createLine(pointArr){
const geometry=new THREE.BufferGeometry()
const Arr=new Float32Array(pointArr)
geometry.attributes.position=new THREE.BufferAttribute(Arr,3)
const material=new THREE.MeshBasicMaterial({
    color:0x0000ff
})
const line=new THREE.LineLoop(geometry,material)
return line
}
export {createLine}