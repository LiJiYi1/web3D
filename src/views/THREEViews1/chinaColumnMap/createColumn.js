import * as THREE from 'three'
function createColumn(x,y,h){
    const geometry = new THREE.CylinderGeometry(0.8, 0.8, h, 6);
    const material = new THREE.MeshLambertMaterial({ color: 0xffff00 });
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.set(x,y,0)
    cylinder.rotateX(-Math.PI/2)
    cylinder.position.z+=h/2
    return cylinder
}
export {createColumn}