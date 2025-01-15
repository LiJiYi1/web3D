import * as THREE from 'three'
const  camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,10,3000)
camera.position.set(-400,300,200)
camera.lookAt(0,0,0)
 
export{camera}