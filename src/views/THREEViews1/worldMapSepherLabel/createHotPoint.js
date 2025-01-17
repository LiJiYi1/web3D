import * as THREE from 'three'
//点的贴图
const texture=new THREE.TextureLoader().load('../../../地球大屏可视化资源/贴图.png')
//光柱的贴图
const texture1=new THREE.TextureLoader().load('../../../地球大屏可视化资源/光柱.png')
function createHotPoint(x,y,z,hot,herf){
let color
if(hot>150){
color=new THREE.Color(0,0,1)
}
else if(hot>100&&hot<150){
    color = new THREE.Color(1, 0, 1)
}
else{
    color = new THREE.Color(0, 1, 1)
}
const geometry=new THREE.PlaneGeometry(1,1)
geometry.scale(3,3,3)
const material=new THREE.MeshBasicMaterial({
    color:color,
    transparent:true,
    map:texture
})
const HotPoint=new THREE.Mesh(geometry,material)
HotPoint.position.set(x,y,z)
//把这个玩意的角度转一下(用四元数)
const v1=new THREE.Vector3(x,y,z).normalize()
const v2=new THREE.Vector3(0,0,1)
const q=new THREE.Quaternion().setFromUnitVectors(v2,v1)
 HotPoint.quaternion.copy(q)
//创建光柱
const geometry1=new THREE.PlaneGeometry(3*hot/100,22*hot/80)
const material1=new THREE.MeshBasicMaterial({
    color:color,
    transparent:true,
    map:texture1,
    side:THREE.DoubleSide,
    depthWrite:false
})
const colum=new THREE.Mesh(geometry1,material1)
colum.rotateX(Math.PI/2)
colum.position.z+=11*hot/100
const colum1 = new THREE.Mesh(geometry1, material1)
colum1.rotateX(Math.PI / 2)
colum1.rotateY(Math.PI/2)
colum1.position.z += 11 * hot / 100
HotPoint.herf=herf
HotPoint.add(colum,colum1)
return HotPoint    
}
export {createHotPoint}