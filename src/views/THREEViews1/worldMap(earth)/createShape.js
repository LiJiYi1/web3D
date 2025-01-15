import * as THREE from 'three'
function createShape(pointArr){
const shape=new THREE.Shape(pointArr)
const shapeGeometry=new THREE.ShapeGeometry(shape)
const material=new THREE.MeshLambertMaterial({
    color:0xf00f00
})
const mesh=new THREE.Mesh(shapeGeometry,material)

return mesh
}
export {createShape}