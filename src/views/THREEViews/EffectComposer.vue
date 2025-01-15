<template>
    <div>  
    <div id="container" ref="container"></div>
    <div id="stat" ref="stateref"></div>

</div>

</template>
<script setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//引入effectComposer
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
//引入render路径
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass.js'
//引入outlinePass
import {OutlinePass} from 'three/examples/jsm/postprocessing/OutlinePass.js'
//引入bloom发光通道
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
//引入stats库
import State from 'three/examples/jsm/libs/stats.module'
//引入GUI库
import * as dat from 'dat.gui';
import { onMounted,ref,onUnmounted} from 'vue';

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
//创建一个场景
const scene = new THREE.Scene();
//为透视投影相机准备宽高比
const width = window.innerWidth;
const height = window.innerHeight;
const k=width/height;
//创建一个相机(透视投影)
const camera = new THREE.PerspectiveCamera(30,k,1,8000)
//相机位置
camera.position.set(800, 800, 800);
//相机视线方向
camera.lookAt(0, 0, 0)

function initThree(){
//创建State对象
const state=new State();
//state对象加入dom
stateref.value.appendChild(state.domElement);
state.domElement.style.left='2%'
state.domElement.style.top='60.1px'

// //测试一下是否成功引入了
// console.log(THREE.Scene);
// //创建一个场景

//创建坐标系
const axesHelper=new THREE.AxesHelper(180,180,180)
//将坐标系插入到场景中去
scene.add(axesHelper);
//创建立方体的geometry
const geometry=new THREE.BoxGeometry(66,66,66)
//创建立方体的材质
const material=new THREE.MeshLambertMaterial({color:0x000444})
//创建一个层级模型统一管理mesh并加入场景
const group=new THREE.Group()
scene.add(group)
//创建三个mesh
const mesh =new THREE.Mesh(geometry,material)
//调整mesh的位置
mesh.position.set(100,0,0)
group.add(mesh)
const mesh1 =new THREE.Mesh(geometry,material)
mesh1.position.set(0,100,0)
group.add(mesh1)
const mesh2 =new THREE.Mesh(geometry,material)
mesh2.position.set(0,0,100)
group.add(mesh2)
//创建一个光源
const light=new THREE.AmbientLight(0x404040)
light.intensity=1000
scene.add(light)

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

//实例化composer组合器
const composer=new EffectComposer(renderer)
//实例化render路径
const render=new RenderPass(scene,camera)
composer.addPass(render)
//创建发光线pass路径
const outline=new OutlinePass(new THREE.Vector2(window.innerWidth,window.innerHeight),scene,camera)
//设置发光线参数
outline.selectedObjects=[mesh1]
//亮度设置
outline.edgeStrength=20
//强度设置
outline.edgeGlow=0.9
//粗细设置
outline.edgeThickness=9
//显隐设置
outline.clear=true
//颜色设置
outline.visibleEdgeColor.set(0x111fff)
//composer加入composer组合器
 composer.addPass(outline)
//实例化发光通道
const bloom=new UnrealBloomPass(new THREE.Vector2( window.innerWidth, window.innerHeight ))
//设置发光强度
bloom.strength=0.8
composer.addPass(bloom)
//创建相机轨道控制工具。
const controls = new OrbitControls(camera, renderer.domElement);



//相机位置与观察目标点最大值


// //相机距离观察目标点最小值
// controls.minDistance =200;
// //相机距离观察目标点最大值
// controls.maxDistance = 500;//更新相机
controls.update()
// //dom元素噶变后执行事件监听
// controls.addEventListener('change',()=>{
//   console.log(camera.position);
//   //改变后重新渲染
//   renderer.render(scene,camera);
// })
//创建一个请求动画帧以实现一个渲染循环。

function animation(){
//更新帧率
state.update();
//渲染器更新
// renderer.render(scene,camera);
composer.render()
//执行渲染循环。
requestAnimationFrame(animation)
}
//调用函数
animation();

//画布大小随屏幕大小变化
window.onresize=()=>{
  //重新设置画布大小
  renderer.setSize(window.innerWidth,window.innerHeight);
  //重新设置相机宽高比
  const k = window.innerWidth / window.innerHeight; //canvas画布宽高比
  camera.aspect=k
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
     .bu {
            background: rgba(255, 255, 255, 0.1);
            width: 60px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            color: #fff;
            display: inline-block;
            border-radius: 30px;
        }

        .bu:hover {
            cursor: pointer;
        }

        .pos {
            position: absolute;
            left: 50%;
            margin-left: -100px;
            bottom: 100px;
        }
   
</style>