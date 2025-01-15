import * as THREE from 'three'
import { scene } from './scene'
import { Mesh } from 'three'
import { ArrowHelper } from 'three'

const geometry=new THREE.BoxGeometry(20,20,20)
const material=new THREE.MeshLambertMaterial()
const mesh=new THREE.Mesh(geometry,material)
mesh.position.set(0,0,50)
const model=new THREE.Group()
model.add(mesh)

const mesh1=new THREE.Mesh(geometry,material)
model.add(mesh1)
mesh1.position.set(70,0,-50)

//用点乘判断物体前后，把mesh当做一个人，mesh1当做物体，看物体在前面还是后面
//首先要有人的视线方向
const look=new THREE.Vector3(0,0,-1)
//视线方向可视化
const arrow=new THREE.ArrowHelper(look,mesh.position,200)
model.add(arrow)
//拿到物体连线
const objLine=mesh1.position.clone().sub(mesh.position.clone())
//可视化物体连线
const arrow1=new THREE.ArrowHelper(objLine.normalize(),mesh.position,200)
model.add(arrow1)
//根据这个判断物体前后
//如果在前面两个向量的夹角余弦值是正的
const cos1=look.normalize().dot(objLine.normalize())
console.log('向量夹角',cos1);
if(cos1>0){
    console.log('物体在前面');
}
else{
    console.log('物体在后面');
    
}
//判断物体在扇形内部
const R=120
const angele=60
//创建一个物体mesh3并设置位置
const mesh3=new THREE.Mesh(geometry,material)
mesh3.position.set(-56,0,-50)
model.add(mesh3)
//先对长度判断是否在
//创建箭头辅助
const dir = mesh3.position.clone().sub(mesh.position.clone())
console.log(dir.length());
const arrow3 = new THREE.ArrowHelper(dir.normalize(),mesh.position.clone(),120,0xff2211)
model.add(arrow3)
//物体位置矢量
const pos=mesh3.position.clone().sub(mesh.position)
const length=pos.length()
//获得夹角
const cos2=pos.normalize().dot(look)
//角度转弧度
const rad=THREE.MathUtils.degToRad(angele)
if(length>R){
    console.log('不在扇形内，半径超限');
}
else{
    if(cos2>Math.cos(rad/2)){
        console.log('在扇形内');
    }
    else{
        console.log('不在扇形内，角度超限');
        
    }
}
//创建两个向量用于点乘
const v=new THREE.Vector3(30,10,0)
const v1=new THREE.Vector3(10,0,0)
//用原始的方法进行一个点乘
const L=v.x*v1.x+v.y*v1.y+v.z*v1.z
console.log('dot',L);
//进行向量点乘
const L1=v.dot(v1)
console.log('dot1',L1);
//计算两个向量的夹角的余弦值
const cos=v.normalize().dot(v1.normalize())
console.log(cos);
//得到夹角的弧度数
const radiu=Math.acos(cos)
console.log(radiu);
//弧度数得到角度数
const angle=THREE.MathUtils.radToDeg(radiu)
console.log(angle);
//向量叉乘
const c=v.clone().cross(v1)
const d=new THREE.Vector3()
d.crossVectors(v,v1)
// console.log('c',c);
// console.log('d', d);
//向量叉乘判断左右
const vector=mesh3.position.clone().sub(mesh.position)
//创建一个向量储存计算结果
const V=new THREE.Vector3()
V.crossVectors(vector,look)
if(V.y>0){
    console.log('在右边');   
}
else{
    console.log('在左边');
    
}
//可视化看下储存结果的向量
const arrow4=new THREE.ArrowHelper(V.normalize(),mesh.position.clone(),120,0xf22111)
model.add(arrow4)

//判断平行向量方向异同
//创建两个平行向量
const vec=new THREE.Vector3(100,0,0)
const vec1=new THREE.Vector3(100,0,0)
//获得夹角的余弦值
const cos3=vec.clone().normalize().dot(vec1.clone().normalize())
console.log('平行向量夹角余弦',cos3);
//判断方向异同
if(cos3>0){
    console.log('方向相同');  
}
else{
    console.log('方向不同');
    
}





//创建两个vector3来构成一条线
const point1=new THREE.Vector3(200,100,0)
const point2=new THREE.Vector3(100,100,0)
//创建两个小球作为顶点
const circle = new THREE.SphereGeometry(2, 32, 16);
const material1 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sphere = new THREE.Mesh(circle, material1);
sphere.position.copy(point1)
const circle1 = new THREE.SphereGeometry(2, 32, 16);
const sphere1 = new THREE.Mesh(circle1, material1);
sphere.position.copy(point1)
sphere1.position.copy(point2)
model.add(sphere);
model.add(sphere1)
//创建一条线段
const lineGeometry=new THREE.BufferGeometry()
lineGeometry.setFromPoints([point1,point2])
const line=new THREE.LineSegments(lineGeometry,material)
model.add(line)
//创建vector3为两个点
const point3=new THREE.Vector3(150,100,20)
const point4=new THREE.Vector3(170,100,20)
//同样创建两个小球可视化一下
const Sphere2=new  THREE.Mesh(circle,material)
Sphere2.position.copy(point3)
const Sphere3 = new THREE.Mesh(circle, material)
Sphere3.position.copy(point4)
model.add(Sphere2,Sphere3)
//创建箭头分别把点和线顶点连接
//第一个点
//获得箭头方向
const dir1=point1.clone().sub(point3).normalize()
//获得箭头长度
const L2 = point1.clone().sub(point3)
const arrow5 = new THREE.ArrowHelper(dir1,point3,L2.length(),0x00ff00)
model.add(arrow5)
//获得箭头方向
const dir2 = point2.clone().sub(point3).normalize()
//获得箭头长度
const L3 = point2.clone().sub(point3).length()
const arrow6 = new THREE.ArrowHelper(dir2, point3, L3, 0x0000ff)
model.add(arrow6)
//第二个点
//获得箭头方向
const dir3=point1.clone().sub(point4).normalize()
//获得箭头长度
const L4= point1.clone().sub(point4)
const arrow7 = new THREE.ArrowHelper(dir3,point4,L4.length(),0x00ff00)
model.add(arrow7)
//获得箭头方向
const dir4 = point2.clone().sub(point4).normalize()
//获得箭头长度
const L5 = point2.clone().sub(point4).length()
const arrow8 = new THREE.ArrowHelper(dir4, point4, L5, 0x0000ff)
model.add(arrow8)
//获得两个点和直线顶点连线点乘的结果
const cro=dir4.clone().cross(dir3).normalize()
const arrow9 = new THREE.ArrowHelper(cro, point4, 22, 0xff0000)
model.add(arrow9)
//获得两个点和直线顶点连线点乘的结果
const cro1 = dir2.clone().cross(dir1).normalize()
const arrow10 = new THREE.ArrowHelper(cro1, point3, 22, 0xff0000)
model.add(arrow10)
//判断cro和cro1两个向量方向是否相同从而判断是否在一侧
const cosin=cro1.clone().normalize().dot(cro)
if(cosin>0){
    console.log('两点在同一侧');
}
else{
    console.log('两点不在同一侧');
    
}

//计算网格模型的表面积
const box=new THREE.BoxGeometry(20,20,20)
const boxMesh=new THREE.Mesh(box,material)
boxMesh.position.set(-200,0,0)
model.add(boxMesh)
const position=box.attributes.position
const index=box.index
const normal=box.attributes.normal
let S=0
console.log(position,index,normal);
function space(p1,p2,p3){
    const  v1=p2.clone().sub(p1)
    const v2=p3.clone().sub(p1)
    const  s=v1.clone().cross(v2).length()/2
    return s
}
for(let i=0;i<index.count;i+=3){
const i1=index.getX(i)
const i2 = index.getX(i+1)
const i3 = index.getX(i+2)
// console.log(i1,i2,i3);
const p1=new  THREE.Vector3(position.getX(i1),position.getY(i1),position.getZ(i1))
const p2 = new THREE.Vector3(position.getX(i2), position.getY(i2), position.getZ(i2))
const p3 = new THREE.Vector3(position.getX(i3), position.getY(i3), position.getZ(i3))
const trangleSpace=space(p1,p2,p3)
S+=trangleSpace
}
console.log(S);


//计算点到直线的距离
const point5=new THREE.Vector3(100,100,-40)
const Sphere4 = new THREE.Mesh(circle, new THREE.MeshLambertMaterial({color:0xfff222}))
Sphere4.position.copy(point5)
model.add(Sphere4)
const v2=point1.clone().sub(point5)
const v3 = point2.clone().sub(point5)
console.log('v2',v2,v3);

const arrow11=new THREE.ArrowHelper(v2.clone().normalize(),point5,v2.length(),0xfff11)
model.add(arrow11)
const arrow12 = new THREE.ArrowHelper(v3.clone().normalize(), point5, v3.length(),0x11fff)
model.add(arrow12)
//计算面积
const cross=v2.clone().cross(v3)
const s=cross.length()/2
console.log('面积为',s);
const dis=2/point1.clone().sub(point2).length()*s
console.log('距离为',dis);





export {model}