import * as THREE from 'three'

//创建一个球体
const geometry = new THREE.SphereGeometry(5, 36, 16);
const material = new THREE.MeshLambertMaterial({ color: 0xffff00 });
const sphere = new THREE.Mesh(geometry, material);
const v=new THREE.Vector3(0,50,-50)
//用vector3的add方法实现一个位移
sphere.position.add(v)

//创建两个vector3用来计算距离
const v1=new THREE.Vector3(20,20,20)
const v2=new THREE.Vector3(40,40,40)
//计算一下两个向量之间的距离
const L=Math.sqrt(Math.pow(v1.x-v2.x,2)+Math.pow(v1.y-v2.y,2)+Math.pow(v1.z-v2.z,2))
// console.log(L);
//两个向量相减得第三个向量
const v3=new THREE.Vector3()
v3.subVectors(v1,v2)
//获得长度
const L1=v3.length()
// console.log(L1);

//创建一个vector3用来归一化
const v4=new THREE.Vector3(30,40,50)
//获得长度
const l=v4.length()
//算归一化
const v5=new THREE.Vector3(30/l,40/l,50/l)
//调用API来算归一化
const v6=v4.clone().normalize()
//打印后对比一下
// console.log(v5,v6);




const model = new THREE.Group()
const R=50
let percent=0
for(let i=0;i<13;i++){
    const geometry = new THREE.SphereGeometry(2, 36, 16);
    const material = new THREE.MeshLambertMaterial({ color: 0xffff00 });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(Math.cos(Math.PI*percent)*R,Math.sin(Math.PI*percent)*R,0)
    model.add(sphere)
    percent += 1 / 12
}
model.add(sphere);
//创建一个正方体
const box=new THREE.BoxGeometry(20,20,20)
const mesh=new THREE.Mesh(box,material)
const o=box.attributes.position
const d=box.attributes.normal
const count=box.attributes.position.count
// console.log(count);
for(let i=0;i<count;i++){
  // console.log('i',o);
  
    const org = new THREE.Vector3(o.getX(i),o.getY(i),o.getZ(i));
    const dir=new THREE.Vector3(d.getX(i),d.getY(i),d.getZ(i))
    dir.normalize()
    const arrowHelper = new THREE.ArrowHelper(dir, org, 22);
    model.add(arrowHelper);
}
model.add(mesh)
export {model}