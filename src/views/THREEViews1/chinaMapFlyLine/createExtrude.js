import * as THREE from 'three'
function createExtrude(shapeArr){
const shape=new THREE.Shape(shapeArr)
const geometry=new THREE.ExtrudeGeometry(shape,{
    depth:0.5
})
const material=new THREE.MeshLambertMaterial({
    color:0xf0009f
})
const extrude=new THREE.Mesh(geometry,material)
return extrude
}
export {createExtrude}