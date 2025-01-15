import * as THREE from 'three'
function createLine(pointArr){
    const arr=new Float32Array(pointArr)
    const geometry=new THREE.BufferGeometry()
    geometry.attributes.position=new THREE.BufferAttribute(arr,3)
    const material=new THREE.LineBasicMaterial({
        color:0xff0000
    })
    const line=new THREE.LineSegments(geometry,material)
    return line
}
export {createLine}