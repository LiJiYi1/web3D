import * as THREE from 'three'
//创建两个颜色用来混合
const color=new THREE.Color(1,0,0)
const color1=new THREE.Color(0.5,0,0.5)
function createBox(h,x,y){
const geometry=new THREE.BoxGeometry(0.5,0.5,h)
const material=new THREE.MeshLambertMaterial()
material.color.copy(color1.clone().lerp(color.clone(),h/6.1))
const box=new THREE.Mesh(geometry,material)
box.position.set(x,y,1+h/2)

return box
}
export {createBox}