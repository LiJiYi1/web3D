import * as THREE from 'three'
function createExtrude(pointArr){
const shape=new THREE.Shape(pointArr)
    const extrudeGeometry = new THREE.ExtrudeGeometry(shape, {
        depth: 2,
    }
)
const material=new THREE.MeshLambertMaterial({
    color:0x00f00f
})
const mesh=new THREE.Mesh(extrudeGeometry,material)
return mesh
}
export {createExtrude}