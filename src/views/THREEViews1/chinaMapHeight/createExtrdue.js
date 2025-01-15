import * as THREE from 'three'
function createExtrdue(pointArr,h){
    const height=h
    const shape=new THREE.Shape(pointArr)
    const shapeGeometry = new THREE.ExtrudeGeometry(shape, { 
        depth: height,
    })
    const material=new THREE.MeshBasicMaterial()
    const mesh=new THREE.Mesh(shapeGeometry,material)
    return mesh 
}
export {createExtrdue}
