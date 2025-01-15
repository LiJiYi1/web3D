import * as THREE from 'three'
function createMesh(index1,position){
//创建几何体
const geometry=new  THREE.BufferGeometry()
geometry.attributes.position=new THREE.BufferAttribute(new Float32Array(position),3)
geometry.index=new THREE.BufferAttribute(new Uint16Array(index1),1)
const material=new THREE.MeshBasicMaterial({
    color:0xff1111,
    //wireframe:true,
    side:THREE.DoubleSide
})
const mesh=new THREE.Mesh(geometry,material)
    return mesh
}
export {createMesh}