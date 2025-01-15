import * as THREE from 'three'
function createExtrude(pointArr) {
    const shape=new THREE.Shape(pointArr)
    const geometry = new THREE.ExtrudeGeometry(shape,{
        depth:9
    })
    const material = new THREE.MeshLambertMaterial({
        color:0x000fff
    })
    const extrude= new THREE.Mesh(geometry, material)
    return extrude
}
export { createExtrude }