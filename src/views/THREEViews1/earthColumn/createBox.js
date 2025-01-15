import * as THREE from 'three'
const color1=new THREE.Color(0.1,0,0.1)
const color2=new THREE.Color(1,0,1)
function createBox(mi,coord,R,percent){
//解析coord拿到x,y,z坐标
const x=coord.x
const y=coord.y
const z=coord.z
//柱子的高
const H=mi/70
const boxGeometry=new THREE.BoxGeometry(0.5,0.5,H)

//根据几何体的高度混合颜色，高度高的亮一些，高度低的暗一些
const Color=color1.clone().lerp(color2.clone(),percent)
const count=boxGeometry.attributes.position.count
const attrib=boxGeometry.attributes.position
//创建一个颜色数组储存顶点颜色
const cArr=[]
//遍历每个顶点设置颜色
for(let i=0;i<count;i++){
    if(attrib.getZ(i)>0.01){
         cArr.push(Color.r*1,Color.g*0,Color.b*1)
    }
    else {
        cArr.push(Color.r*0.1, Color.g*0, Color.b*0.1)
    }
}
//对几何体的位置进行偏移
//可以先平移后旋转,也可以先旋转后平移
// //先平移
// boxGeometry.translate(0,0,R+H/2)
// //后旋转
// boxGeometry.lookAt(new THREE.Vector3(x,y,z))
//先旋转
boxGeometry.lookAt(new THREE.Vector3(x, y, z))
//计算平移方向
const dir = new THREE.Vector3(x, y, z).normalize()
//计算唯一距离
const dis = dir.multiplyScalar(R + H / 2)
//后平移
boxGeometry.translate(dis.x, dis.y, dis.z)
//给几何体顶点颜色赋值
boxGeometry.attributes.color=new THREE.BufferAttribute(new Float32Array(cArr),3)


return boxGeometry
}
export {createBox}