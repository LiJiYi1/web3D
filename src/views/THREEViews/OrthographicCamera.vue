<template>
    <div>  
    <div id="container" ref="container"></div>
    <div id="stat" ref="stateref"></div>
</div>

</template>
<script setup>
import data from'../../assets/data'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//引入stats库
import State from 'three/examples/jsm/libs/stats.module'
//引入GUI库
import * as dat from 'dat.gui';
import { onMounted,ref,onUnmounted} from 'vue';
import Threebasic from './Threebasic.vue';

//创建一个GUI对象
const gui = new dat.GUI();
const container=ref(null);
//拿到dom元素
const stateref=ref(null);
onMounted(()=>{
   initThree()
})
onUnmounted(()=>{
  if(gui){
  gui.close();
  gui.destroy(); 
}
})
function initThree(){
//创建State对象
const state=new State();
state.domElement.style.left='150px'
//state对象加入dom
stateref.value.appendChild(state.domElement);
// //测试一下是否成功引入了
// console.log(THREE.Scene);
//创建一个场景
const scene = new THREE.Scene();
//为透视投影相机准备宽高比
const width = window.innerWidth;
const height = window.innerHeight;
const k=width/height;
//根据包围盒大小设置地图。
const s=2.5
//创建一个相机(正交投影)
const camera = new THREE.OrthographicCamera(-s*k, s*k, s, -s,1,8000);
//设置拿到的x和y
const x = 113.51,y = 33.88;
//相机位置
camera.position.set(x, y, 300);
//相机视线方向
camera.lookAt(x, y, 0)
//把相机加入场景
scene.add(camera);
//创建正方体
const geometry=new THREE.BoxGeometry(100,100,100)
const mesh=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({}))
scene.add(mesh)
//创建坐标系
const axesHelper=new THREE.AxesHelper(180,180,180)
//设置位置
axesHelper.position.set(x,y,0)
//将坐标系插入到场景中去
scene.add(axesHelper);
//创建光源
const directionalLight = new THREE.DirectionalLight(0xffffff, 11);
//光源位置设置、
directionalLight.position.set(4,4,1)
//将光源添加到场景中
scene.add(directionalLight);
//创建一个包围盒
const box = new THREE.Box3();
// console.log(box);//此时包围盒没范围
//通过mesh模型来算出包围盒
box.expandByObject(mesh)
console.log(box);//可以根据这个拿到包围盒的属性
//算出包围盒的尺寸
//创建一个vec3
const V=new THREE.Vector3()
box.getSize(V)
console.log(V);
//得到包围盒的中心坐标
const V1=new THREE.Vector3()
box.getCenter(V1)
console.log(V1);
//加载地图
console.log(data);
//创建数组储存顶点
const ARR=[]
//遍历data
data.forEach((e)=>{
ARR.push(new THREE.Vector2(e[0],e[1]))
})
//创建一个shape图形
const shape=new THREE.Shape(ARR)
//把shape图形填充
const shapeGeometry=new THREE.ShapeGeometry(shape)
//创建材质
const material=new THREE.MeshLambertMaterial({
  color:0xff00ff
})
//创建mesh
const  shapeMesh=new THREE.Mesh(shapeGeometry,material)
//加入场景
scene.add(shapeMesh)
//创建包围盒
const shapeBOX=new THREE.Box3()
shapeBOX.expandByObject(shapeMesh)
//看一下中心
const center=new THREE.Vector3()
shapeBOX.getCenter(center)
console.log(center);
//看一下大小
const size=new THREE.Vector3()
shapeBOX.getSize(size)
console.log(size);

//创建一个渲染器
const renderer = new THREE.WebGLRenderer({
  antialias:true,
});
//设置canvas画布大小
renderer.setSize(width, height);
//设置设备像素比
renderer.setPixelRatio(window.devicePixelRatio);
// //刷个画布底色
renderer.setClearColor(0x000000,1.);
//渲染
renderer.render(scene, camera);
//放入dom元素里面
container.value.appendChild(renderer.domElement);
//创建一个请求动画帧以实现一个渲染循环。
function animation(){
//更新帧率
state.update();
//渲染器更新
renderer.render(scene,camera);
//执行渲染循环。
requestAnimationFrame(animation)
}
//调用函数
animation();

//创建相机轨道控制工具。
const controls = new OrbitControls(camera, renderer.domElement);
//位置与lookAT一致
controls.target.set(x,y,0)
//更新相机
controls.update()
// //dom元素噶变后执行事件监听
// controls.addEventListener('change',()=>{
//   console.log(camera.position);
//   //改变后重新渲染
//   renderer.render(scene,camera);
// })

//画布大小随屏幕大小变化
window.onresize=()=>{
  //重新设置画布大小
  renderer.setSize(window.innerWidth,window.innerHeight);
  //重新设置相机宽高比
  const k = window.innerWidth / window.innerHeight; //canvas画布宽高比
  camera.left = -s*k;
  camera.right = s*k;
  //透视投影矩阵更新
  camera.updateProjectionMatrix()
}
}

</script>

<style scoped>

#container{
    background-color: red;
    position: relative;
}
#stat{
float: left;
width: 10px;
}
</style>