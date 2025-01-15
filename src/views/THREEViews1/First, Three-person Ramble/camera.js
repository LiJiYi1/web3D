import * as THREE from 'three'
const  camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,3000)
camera.position.set(0, 2, -2)
camera.lookAt(0, 1, 0)
export {camera}