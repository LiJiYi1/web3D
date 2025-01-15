import * as THREE from 'three'
const loader=new THREE.TextureLoader()
const texture=loader.load('../../../public/地图大屏可视化资源/贴图.png')
function createPoint(x,y,z){
const plane=new THREE.PlaneGeometry(0.7,0.7)
const material=new THREE.MeshBasicMaterial({
    map:texture,
    transparent:true
})
const point=new THREE.Mesh(plane,material)
point.position.set(x,y,z)
return point
}
export {createPoint}