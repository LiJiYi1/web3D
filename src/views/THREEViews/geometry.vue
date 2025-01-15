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
import { camelize, onMounted,ref, render} from 'vue';
import Threebasic from './Threebasic.vue';
import { Color } from 'three';

const container=ref(null);
//拿到dom元素
const stateref=ref(null);
onMounted(()=>{
  initThree()
})
function initThree(){
//创建场景
const scene=new THREE.Scene();
//创建一个自定义几何体
const geometry=new THREE.BufferGeometry();
//类型化数组创建我们想要的几何体顶点
const vertex=new Float32Array([
    4,0,0,//第一个点的顶点
    0,4,0,//第二个点的顶点
    0,0,4//第三个点的顶点
])
//创建索引缓冲区
const attribute=new THREE.BufferAttribute(vertex,3)
//把缓冲区数据赋值给几何体
geometry.attributes.position=attribute
//创建材质
// const materialPoint = new THREE.PointsMaterial( { color: 0x888fff } );
const materialLine = new THREE.LineBasicMaterial( {
	color: 0xffffff,
	linewidth: 1,
	linecap: 'round', //ignored by WebGLRenderer
	linejoin:  'round' //ignored by WebGLRenderer
} );
//创建网格模型
const Points=new THREE.LineLoop(geometry,materialLine)
//把网格模型加入场景
scene.add(Points)

//创建一个几何体材质
const geometry1=new THREE.BufferGeometry()
//创建一个类型化数组储存顶点数据
const vertexRect=new Float32Array([
    0,0,0,//第一个点0
    4,0,0,//第二个点1
    0,4,0,//第三个点2
    // 0,4,0,//第四个点
    // 4,0,0,//第五个点
    4,4,0//第六个点3
])
//创建一个顶点缓冲区
const attribute1=new THREE.BufferAttribute(vertexRect,3)
//顶点缓冲区给几何体
geometry1.attributes.position=attribute1;
//创建索引缓冲区
const index=new Uint16Array([
    0,1,2,2,1,3
])
//索引缓冲区给几何体
geometry1.index=new THREE.BufferAttribute(index,1);
//创建材质
const material1=new THREE.MeshLambertMaterial()
//创建一个类型化数组存法线数据
const normal=new   Float32Array([
    0,0,1,
    0,0,1,
    0,0,1,
    0,0,1
])
geometry1.attributes.normal=new THREE.BufferAttribute(normal,3)
//创建网格
const mesh=new THREE.Mesh(geometry1,material1)
//网格入场景
scene.add(mesh)
console.log(new THREE.BoxGeometry(4,5,5));
//创建光源
const light=new THREE.PointLight(0xffffff, 10, 100)
light.position.set(5,5,5);
scene.add(light)
const lightHelper=new THREE.PointLightHelper(light)
scene.add(lightHelper)

//创建相机
const camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,1000);
//配置相机参数
camera.position.set(6,6,6)
camera.lookAt(0,0,0)
//相机加入场景
scene.add(camera)
//创建渲染器
const renderer=new THREE.WebGLRenderer(
    {
        antialias:true,//开启抗锯齿
    }
);
//创建一个辅助坐标系并放入场景中
const axesHelper = new THREE.AxesHelper(5);
scene.add( axesHelper );
//设置canvas画布的大小
renderer.setSize(window.innerWidth,window.innerHeight);
//设置像素
renderer.setPixelRatio(window.devicePixelRatio);
//刷个canvas画布的底色
renderer.setClearColor(0x000);
//渲染出图
renderer.render(scene,camera);
//插入dom中
container.value.appendChild(renderer.domElement);
//屏幕适配
window.onresize=()=>{
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
}
//创建相机轨道控制
const control=new OrbitControls(camera,renderer.domElement);
control.addEventListener('change',()=>{
    renderer.render(scene,camera);
})
}

</script>

<style scoped>
#container{
    position: relative;
}
#stat{
margin-left:100px
}
</style>