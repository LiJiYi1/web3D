import * as THREE from 'three'
const Loader=new THREE.TextureLoader()
const texture=Loader.load('/../地图大屏可视化资源/贴图.png')
function createCircle(x,y){
const geometry=new THREE.PlaneGeometry(1,1)
const material=new THREE.MeshBasicMaterial({
transparent:true,
map:texture
})
const mesh=new THREE.Mesh(geometry,material)
mesh.position.set(x, y, 1700000)
return mesh
}
export {createCircle}
