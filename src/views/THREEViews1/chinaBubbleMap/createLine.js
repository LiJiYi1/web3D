import * as THREE from 'three'
function createLine(pointArr){
const geometry=new THREE.BufferGeometry()
const material=new THREE.LineBasicMaterial({
    color:0x00ff00
})
const vertex=new Float32Array(pointArr)
const attribute=new THREE.BufferAttribute(vertex,3)

geometry.attributes.position=attribute
const line=new THREE.LineLoop(geometry,material)
return line
}

export {createLine}