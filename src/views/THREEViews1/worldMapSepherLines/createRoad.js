import * as THREE from 'three'
import { BufferAttribute } from 'three'
function createRoad(pointArr){
    const arr=new Float32Array(pointArr)
    const geometry=new THREE.BufferGeometry()
    geometry.attributes.position=new BufferAttribute(arr,3)
    const material=new THREE.LineBasicMaterial({
        color:0xfff222
    })
    const line=new THREE.LineSegments(geometry,material)
    return line
}
export {createRoad}