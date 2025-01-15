import * as THREE from 'three'
function createLine(pointArr){
    const geometry=new THREE.BufferGeometry()
    const arr=new Float32Array(pointArr)
    geometry.attributes.position=new THREE.BufferAttribute(arr,3)
    const material=new THREE.MeshBasicMaterial({
        color:0xff00f8
    })
    const line=new THREE.LineLoop(geometry,material)
    return line
}
export {createLine}