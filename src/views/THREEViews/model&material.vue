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
//创建一个GUI对象
const gui = new dat.GUI();
gui.domElement.style.position='absolute'
gui.domElement.style.right='2%'
gui.domElement.style.top='60.1px'
// gui.domElement.style.zIndex=1
//拿到容器的dom对象方便放入three的dom元素。
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
console.log();
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
//创建一个几何体
const geometry=new THREE.BoxGeometry(10,10,10)
//创建一个材质
const material=new THREE.MeshBasicMaterial(
    {
        transparent:true,
        opacity:0.6,
        color:0x444444
    }
)
//把相机加入场景
scene.add(camera);
//创建一个物体网格
const mesh = new THREE.Mesh(geometry, material);
//把网格几何体加入场景
scene.add(mesh);
//创建新的网格
const mesh2 = new THREE.Mesh(geometry, material);
//把网格几何体加入场景
scene.add(mesh2);
//网格位置设置
mesh.position.set(0,0, 0);
//创建一个坐标系
const axesHelper = new THREE.AxesHelper(15);
//将坐标系插入到场景中去
scene.add(axesHelper);
//归一化对象
const back={
    position:false,
    scale:false,
    rotation:false
}
//给gui库加关于几何体位置的框子
const position=gui.addFolder('几何体的坐标')
//加入几何体的x坐标
 position.add(mesh.position,'x',0,15).name('x坐标').onChange((value)=>{
    if(mesh.position.x!==0||mesh.position.y!==0||mesh.position.z!==0){
        back.position=false;
        return
    }
     back.position=true
 }).step(1)
 //加入几何体的y坐标
 position.add(mesh.position,'y',0,15).name('y坐标').onChange((value)=>{
    if(mesh.position.x!==0||mesh.position.y!==0||mesh.position.z!==0){
        back.position=false;
        return
    }
     back.position=true
 }).step(1)
 //加入几何体的z坐标
 position.add(mesh.position,'z',0,15).name('z坐标').onChange((value)=>{
    if(mesh.position.x!==0||mesh.position.y!==0||mesh.position.z!==0){
        back.position=false; 
        return
    }
     back.position=true
 }).step(1)
 //几何体坐标归一化
 position.add(back,'position',false).name('回归原点').onChange((value)=>{
    if(mesh.position.x===0&&mesh.position.y===0&&mesh.position.z===0){
         back.position=true;
         return 
    }
    mesh.position.set(5,5,5);
    console.log(mesh.position.x);
 })
 //位置还可以这么改
 mesh.translateX(5)
 mesh.translateY(5)
 mesh.translateZ(5)
 //给gui库加关于几何体缩放系数的东西。
 const scale=gui.addFolder('几何体的缩放系数');
 //加入几何体的x坐标
 scale.add(mesh.scale,'x',0,2)
 //加入几何体的y坐标
 scale.add(mesh.scale,'y',0,2)
 //加入几何体的z坐标
 scale.add(mesh.scale,'z',0,2)
 //缩放归一化
 scale.add(back,'position',false).name('回归原点').onChange((value)=>{
    if(mesh.scale.x===0&&mesh.scale.y===0&&mesh.scale.z===0){
         back.scale=true;
         return 
    }
    mesh.scale.set(1,1,1);
    console.log(mesh.scale.x);
 })
 //创建一个欧拉角
 const Euler=new THREE.Euler()
//给gui库加关于几何体缩放系数的东西。
 const rotate=gui.addFolder('几何体的旋转系数');
 //加入几何体的x坐标
 rotate.add(mesh.rotation,'x',0,2).onChange((value)=>{
    mesh.rotation.x=Math.PI*value
 }).step(1/12)
 //加入几何体的y坐标
 rotate.add(mesh.rotation,'y',0,2).onChange((value)=>{
    mesh.rotation.y=Math.PI*value
 }).step(1/12)
 //加入几何体的z坐标
 rotate.add(mesh.rotation,'z',0,2).onChange((value)=>{
    mesh.rotation.z=Math.PI*value
 }).step(1/12)
 //缩放归一化
 rotate.add(back,'rotation',false).name('回归原点').onChange((value)=>{
    if(mesh.rotation.x===0&&mesh.rotation.y===0&&mesh.rotation.z===0){
         back.rotation=true;
         return 
    }
    mesh.rotation.set(0,0,0);
    
 })
//创建一个颜色
const Color=new THREE.Color()
Color.set(1,0,1);
material.color=Color
//把mesh2的颜色改一下
mesh2.material.color.setRGB(0,1,1)
//把mes2的位置改一下
mesh2.geometry.translate(1,2,0)
//位置改一下
mesh2.position.set(-5,-5,-5)


//创第三个几何体,直接克隆mesh网格材质和几何体还是用那些一样是变一个全都变，底层其实是指针。要想就变一个要克隆几何体和材质。然后加入网格中。
const mesh3=mesh.clone()
scene.add(mesh3)
mesh3.position.set(-5,5,5)
//克隆材质和集合体创建新的网格
const mesh4=new THREE.Mesh(geometry.clone(),material.clone())
mesh4.position.set(5,5,-5)
scene.add(mesh4)
//改变网格参数
mesh4.material.color.setRGB(1,0,0)
//改变位置
mesh4.position.copy(mesh.position)
mesh4.position.y+=10;
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

</style>