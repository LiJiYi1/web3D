import * as THREE from 'three'
function ExtrudeMesh(pointArr) {
    const shape = new THREE.Shape(pointArr)
    const shapeGeometry = new THREE.ExtrudeGeometry(shape, {
        // steps: 2,
        depth: 0.8,
        // bevelEnabled: true,
        // bevelThickness: 1,
        // bevelSize: 1,
        // bevelOffset: 0,
        // bevelSegments: 1
    })
    const material = new THREE.MeshLambertMaterial({
        color: 0x00f000
    })
    const mesh = new THREE.Mesh(shapeGeometry, material)
    return mesh
}
export { ExtrudeMesh }