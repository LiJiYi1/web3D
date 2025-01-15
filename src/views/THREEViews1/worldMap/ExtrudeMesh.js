import * as THREE from 'three'
import { createCircle } from './createCircle.js'
function ExtrudeMesh(pointArr) {
    const shape = new THREE.Shape(pointArr)
    const shapeGeometry = new THREE.ExtrudeGeometry(shape, {
        steps: 2,
        depth: 1600000,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 1
    })
    const material = new THREE.MeshLambertMaterial({
        color: 0xf00f00
    })
    const mesh = new THREE.Mesh(shapeGeometry, material)
    //用包围盒获得中心
    const box=new THREE.Box3()
    box.expandByObject(mesh)
    const center=new THREE.Vector3()
    box.getCenter(center)
     const size=new THREE.Vector3()
     box.getSize(size)
    const point = createCircle(center.x,center.y)
     point.scale.set(500000,500000,size.z/2)
    mesh.add(point)
    return mesh
}
export { ExtrudeMesh }