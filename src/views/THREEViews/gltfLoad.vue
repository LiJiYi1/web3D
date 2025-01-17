<template>
    <div>
    <div id="container" ref="container"></div>

</div>

</template>
<script setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//引入GUI库
import * as dat from 'dat.gui';
import { onMounted,ref,onUnmounted, render} from 'vue';
//创建一个GUI对象
const gui = new dat.GUI();
const container=ref(null);
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
camera.position.set(157,92,-19);;
//相机视线方向
camera.lookAt(0, 0, 0)
//把相机加入场景
scene.add(camera)
//创建一个坐标系
const axesHelper = new THREE.AxesHelper(5);
//将坐标系插入到场景中去
scene.add(axesHelper);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);
//创建gltf加载控件
const loader=new GLTFLoader()
//loader加载模型
loader.load('/初级篇学习资源/工厂.gltf',(gltf)=>{
    console.log(gltf.scene);
  gltf.scene.traverse((obj)=>{
      // 查看gltf所有颜色贴图的.encoding值
    if(obj.isMesh){
     console.log(obj.material);
    }
  })
scene.add(gltf.scene)
})
//创建gltf加载控件
const loader1=new GLTFLoader()
//loader加载模型
loader1.load('/初级篇学习资源/手机模型.glb',(gltf)=>{
gltf.scene.position.set(0,100,0)
//换纹理
const texture=new THREE.TextureLoader().load('/初级篇学习资源/黑色.png')
texture.flipY=false
 gltf.scene.children[0].material.map=texture
scene.add(gltf.scene)
})






//创建一个渲染器
const renderer = new THREE.WebGLRenderer({
  antialias:true,
});
//设置canvas画布大小
renderer.setSize(width, height);
//设置设备像素比
renderer.setPixelRatio(window.devicePixelRatio);
//刷个画布底色
renderer.setClearColor(0x000,1.);
//渲染
renderer.render(scene, camera);
renderer.outputColorSpace=THREE.SRGBColorSpace
//放入dom元素里面
container.value.appendChild(renderer.domElement);

//创建一个请求动画帧以实现一个渲染循环。
function animation(){
//渲染器更新
renderer.render(scene,camera);
//执行渲染循环。
requestAnimationFrame(animation)
}
//调用函数
animation();
renderer.render(scene,camera);
//创建相机轨道控制工具。
const controls = new OrbitControls(camera, renderer.domElement);
// //dom元素噶变后执行事件监听
controls.addEventListener('change',()=>{
console.log(camera.position);
console.log(controls.target);
})

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