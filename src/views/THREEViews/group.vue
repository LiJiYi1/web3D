<template>
    <div>  
    <div id="container" ref="container"></div>
    <div id="stat" ref="stateref"></div>
</div>

</template>
<script setup>
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
gui.domElement.style.position='absolute'
gui.domElement.style.top='60.1px'
gui.domElement.style.right='2%'
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
state.domElement.style.left='2%'
state.domElement.style.top='60.1px'
//state对象加入dom
stateref.value.appendChild(state.domElement);
// //测试一下是否成功引入了
// console.log(THREE.Scene);
//创建一个场景
const scene = new THREE.Scene();
//为透视投影相机准备宽高比
const width = window.innerWidth;
const height = window.innerHeight;
//创建一个相机(透视投影)
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
//相机位置
camera.position.set(10, 10, 10);
//相机视线方向
camera.lookAt(0, 0, 0)
//把相机加入场景
scene.add(camera);
//创建第一个几何体
const geometry=new THREE.BoxGeometry(0.3,5,10);
//创建第二个几何体
const geometry2=new THREE.BoxGeometry(0.3,5,10)
//创建第一个材质
const material=new THREE.MeshLambertMaterial({
     color:0x444fff,
 })
//创建第二个材质
const material2=new THREE.MeshBasicMaterial({
//     color:0X444445,
 })
//创建第一个层级模型
const group=new THREE.Group()
//起个名
group.name='一层'
//创建第二个层级模型
const group2=new THREE.Group()
group2.name='二层'
//创建第一排几何体
for(let i=0;i<6;i++){
const mesh=new THREE.Mesh(geometry,material)
mesh.position.set(-3+i,0,-5)
mesh.name=i+1+'号'
group.add(mesh)
 }
//创建第一排几何体
for(let i=0;i<6;i++){
const mesh=new THREE.Mesh(geometry2,material2)
mesh.position.set(-3+i,0,5)
mesh.name=i+1+'大号'
group2.add(mesh)

 }
//gui库来实现group的移动
const gui1=gui.addFolder('第一个层级')
gui1.add(group.position,'x',0,10).name('x移动')
gui1.add(group.position,'y',0,10).name('y移动')
gui1.add(group.position,'z',0,10).name('z移动')
//gui库来实现group2的移动
const gui2=gui.addFolder('第二个层级')
gui2.add(group2.position,'x',0,10).name('x移动').onChange(()=>{
    console.log(group2.getWorldPosition(worldPosition));
})
gui2.add(group2.position,'y',0,10).name('y移动')
gui2.add(group2.position,'z',0,10).name('z移动')
//创建一个根层级
const Root=new THREE.Object3D()
//所有层级放入根层级
Root.add(group,group2)
// console.log(Root);
//traverse遍历
Root.traverse((obj)=>{
console.log(obj.name);
})
//拿到6号楼，并且配上颜色
Root.getObjectByName('3号').material=Root.getObjectByName('3号').material.clone()
Root.getObjectByName('3号').material.color.set(1,0,1)

//给第二个层级添加一个坐标系
group2.add(new THREE.AxesHelper(9,9,9))
//层级模型加入scene场景
scene.add(Root)
//创建一个三维向量
const worldPosition=new THREE.Vector3()
//获得group2的世界坐标
console.log(group2.getWorldPosition(worldPosition));
//修改本地坐标
group2.position.set(5,5,10)
//隐藏group2里的一个3大号
group2.getObjectByName('3大号').visible=false

//gui库来实现group的移动
const gui3=gui.addFolder('group1旋转')
gui3.add(group.rotation,'x',0,10).name('x移动')
gui3.add(group.rotation,'y',0,10).name('y移动')
gui3.add(group.rotation,'z',0,10).name('z移动')
//gui库来实现group的移动
const gui4=gui.addFolder('group2旋转')
gui4.add(group2.rotation,'x',0,10).name('x移动')
gui4.add(group2.rotation,'y',0,10).name('y移动')
gui4.add(group2.rotation,'z',0,10).name('z移动')
//四大号的位置动一下
group2.getObjectByName('4大号').position.set(0,0,0)













//创建坐标系
const axesHelper=new THREE.AxesHelper(18,18,18)
//将坐标系插入到场景中去
scene.add(axesHelper);
//创建光源
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//光源位置设置、
directionalLight.position.set(4,4,1)
//将光源添加到场景中
scene.add(directionalLight);







//创建一个渲染器
const renderer = new THREE.WebGLRenderer({
  antialias:true,
});
//设置canvas画布大小
renderer.setSize(width, height);
//设置设备像素比
renderer.setPixelRatio(window.devicePixelRatio);
// //刷个画布底色
renderer.setClearColor(0x000,1.);
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
  camera.aspect=window.innerWidth/window.innerHeight;
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