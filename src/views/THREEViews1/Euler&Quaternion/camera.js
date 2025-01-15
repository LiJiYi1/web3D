import * as  THREE  from 'three'
const  camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,3000)
camera.position.set(200,200,200)
camera.lookAt(0,0,0)

export {camera}
