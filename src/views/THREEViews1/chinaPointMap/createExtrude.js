import * as THREE from 'three'
function createExtrude(pointArr){
const shape=new THREE.Shape(pointArr)
    const extrudeGeometry = new THREE.ExtrudeGeometry(shape, {
        depth: 0.8,
    }
)
const material=new THREE.MeshLambertMaterial({
    color:0x0069ff
})
const mesh=new THREE.Mesh(extrudeGeometry,material)
return mesh
}
export {createExtrude}