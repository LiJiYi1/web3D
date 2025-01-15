import * as THREE from 'three'
function createLine(lineArr){
    const arr=new Float32Array(lineArr)
    const geometry=new THREE.BufferGeometry()
    geometry.attributes.position=new THREE.BufferAttribute(arr,3)
    const material=new THREE.MeshBasicMaterial({
        color:0x000000
    })
    const line=new THREE.LineLoop(geometry,material)
    return line
}
export{createLine}