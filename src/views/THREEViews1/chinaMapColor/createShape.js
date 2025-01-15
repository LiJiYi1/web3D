import * as THREE from 'three'
function createShape(pointArr){
    const shape=new THREE.Shape(pointArr)
    const shapeGeometry=new THREE.ShapeGeometry(shape)
    const material=new THREE.MeshBasicMaterial()
    const mesh=new THREE.Mesh(shapeGeometry,material)
    return mesh 
}
export {createShape}
