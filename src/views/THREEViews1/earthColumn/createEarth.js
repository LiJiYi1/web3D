import * as THREE from 'three'
const Loader = new THREE.TextureLoader()
const texture = Loader.load('../../../地球大屏可视化资源/earth (12).png')
function createEarth(){
const sphereGeometry=new THREE.SphereGeometry(100,32,32)
const material=new THREE.MeshLambertMaterial(
    {
         map:texture
    }
)
const sphere=new THREE.Mesh(sphereGeometry,material)
return sphere
}

export {createEarth}