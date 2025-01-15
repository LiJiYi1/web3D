import * as THREE  from 'three'
function createCone(x,y,z){
    const geometry = new THREE.ConeGeometry(0.6, 2, 3);
    const material = new THREE.MeshBasicMaterial({ color: 0x00f000 });
    const cone = new THREE.Mesh(geometry, material);
    cone.position.set(x,y,z)
    cone.rotation.x=-Math.PI/2
    return cone
}
export {createCone}