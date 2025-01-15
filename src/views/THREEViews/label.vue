<template>
<div>  
    <div id="container" ref="container"></div>
    <div id="stat" ref="stateref"></div>
    <div ref="tag" id="tag">我是标签</div>
</div>

</template>
<script setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//引入CSS2DRenderer
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
// 引入CSS2模型对象CSS2DObject
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
//引入stats库
import State from 'three/addons/libs/stats.module'
//引入GUI库
import * as dat from 'dat.gui';
import { onMounted,ref,onUnmounted} from 'vue';
import Spirite from './spirite.vue';
//创建一个GUI对象
const gui = new dat.GUI();
const container=ref(null);
//拿到dom元素
const stateref=ref(null);
const tag=ref(null)
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
const geometry=new THREE.SphereGeometry(25)
//创建立方体的材质
const material=new THREE.MeshLambertMaterial({color:0x000444,
    //  side:THREE.DoubleSide
})
//创建一个球体
const mesh=new THREE.Mesh(geometry,material)
mesh.position.set(150,200,100)
scene.add(mesh)


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

//拿到dom
console.log(tag.value);
//创建一个CSS2Dobject
const tag1=new CSS2DObject(tag.value)
// tag1.position.set(150,200,100)
mesh.add(tag1)
//实例化CSS2DRenderer
const CSSRenderer=new CSS2DRenderer()
//设置Renderer的大小
CSSRenderer.setSize(width,height)
//渲染
CSSRenderer.render(scene,camera)
//插入场景中
container.value.appendChild(CSSRenderer.domElement)
//绝对定位设置dom
CSSRenderer.domElement.style.position='absolute'
CSSRenderer.domElement.style.left=0
CSSRenderer.domElement.style.top=0
//取消标签的点击事件
tag.value.style.pointerEvents='none'
//创建一个点击事件实现点击球体变色
document.addEventListener('click',(e)=>{
    const x=(e.offsetX/window.innerWidth)*2-1
    const y=-(e.offsetY/window.innerHeight)*2+1
//创建raycaster
const raycaster=new THREE.Raycaster()
raycaster.setFromCamera(new THREE.Vector2(x,y),camera)
const intersect=raycaster.intersectObjects([mesh])
if(intersect.length>0){
    intersect[0].object.material.color.set(0x111111)
}
})
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
renderer.render(scene,camera);
CSSRenderer.render(scene,camera)
//执行渲染循环。
requestAnimationFrame(animation)
}
//调用函数
animation();

//画布大小随屏幕大小变化
window.onresize=()=>{
  //重新设置画布大小
  renderer.setSize(window.innerWidth,window.innerHeight);
  CSSRenderer.setSize(window.innerWidth,window.innerHeight);
  //重新设置相机宽高比
  const k = window.innerWidth / window.innerHeight; //canvas画布宽高比
  camera.aspect=k
  //透视投影矩阵更新
  camera.updateProjectionMatrix()
}



}

</script>

<style scoped>
#tag{
    background-color:red ;
    opacity: 0.6;
    border-radius:9.9px;
}











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