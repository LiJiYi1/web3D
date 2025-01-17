<template>
    <div>
    <div id="container" ref="container"></div>

</div>

</template>
<script setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//引入GUI库
import * as dat from 'dat.gui';
import { onMounted,ref,onUnmounted, render} from 'vue';
//创建一个GUI对象
const gui = new dat.GUI();
gui.domElement.style.position='absolute'
gui.domElement.style.top='60.1px'
gui.domElement.style.right='2%'
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
camera.position.set(292, 223, 185);;
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
const geometry = new THREE.SphereGeometry(10);//球体
scene.add(ambient);

//纹理贴图加载器TextureLoader
const texLoader = new THREE.TextureLoader();
// .load()方法加载图像，返回一个纹理对象Texture
const texture=texLoader.load('/初级篇学习资源/earth.jpg');
const material = new THREE.MeshLambertMaterial({
    // color: 0x00ffff,
    map:texture
});
//创建网格模型
const mesh =new THREE.Mesh(geometry,material)
//把网格加入场景
scene.add(mesh)


//创建一个新的geometry
const geometry1=new THREE.PlaneGeometry(50,50)
//创建一个新的材质
const material1 =new THREE.MeshLambertMaterial()
//创建一个新的mesh
const mesh1=new THREE.Mesh(geometry1,material1)
mesh1.position.x+=40;
//创建贴图
const texture2=new THREE.TextureLoader().load('/初级篇学习资源/t010e231e27462fe93f.jpg')
material1.map=texture2
//改UV坐标
 const uvs = new Float32Array([
     0.25, 0.75,
     0.75, 0.75,
     0.25, 1,
     0.75, 1,
 ]);
geometry1.attributes.uv=new THREE.BufferAttribute(uvs,2)
//网格加入场景
scene.add(mesh1)

//创建一个新的geometry
const geometry2=new THREE.PlaneGeometry(50,50)
//创建一个新的材质
const material2 =new THREE.MeshLambertMaterial({
    transparent:true
})
//创建一个新的mesh
const mesh2=new THREE.Mesh(geometry2,material2)
mesh2.position.x-=50
scene.add(mesh2)
//创建贴图并赋值给材质
material2.map=new THREE.TextureLoader().load('/初级篇学习资源/指南针.png')

//创建一个矩形
const geometry3=new THREE.PlaneGeometry(50,10)
//创建一个新的材质
const material3 =new THREE.MeshLambertMaterial({
    transparent:true
})
//创建一个新的mesh
const mesh3=new THREE.Mesh(geometry3,material3)
mesh3.position.z-=50
//mesh3旋转
mesh3.rotateX(-Math.PI/2)
scene.add(mesh3)
//创建贴图并赋值给材质
material2.map=new THREE.TextureLoader().load('/初级篇学习资源/指南针.png')

//mesh3开始贴图
const texture3=new THREE.TextureLoader().load('/初级篇学习资源/纹理3.jpg')
material3.map=texture3
//纹理重复开启
texture3.wrapS=THREE.RepeatWrapping
//纹理阵列
texture3.repeat.x=20
//用gui库控制移动
 gui.add(texture3.offset,'x',1,100)

//创建贴图
const Sky=new THREE.TextureLoader().load('/初级篇学习资源/全景2048.jpg')
const geometry12=new THREE.SphereGeometry(500,32,32)
const material12=new THREE.MeshLambertMaterial({
map:Sky,
side:THREE.BackSide
})
 const spehere=new THREE.Mesh(geometry12,material12)
scene.add(spehere)

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