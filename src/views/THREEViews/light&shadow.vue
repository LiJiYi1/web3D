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
import Geometry from './geometry.vue';

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
state.domElement.style.left='2%'
state.domElement.style.top='60.1px'
//state对象加入dom
stateref.value.appendChild(state.domElement);
// //测试一下是否成功引入了
// console.log(THREE.Scene);
// //创建一个场景
// const scene = new THREE.Scene();
// //为透视投影相机准备宽高比
// const width = window.innerWidth;
// const height = window.innerHeight;
// const k=width/height;
// //创建一个相机(透视投影)
// const camera = new THREE.PerspectiveCamera(30,k,1,8000)
// //相机位置
// camera.position.set(300, 300, 300);
// //相机视线方向
// camera.lookAt(0, 0, 0)
//创建坐标系
const axesHelper=new THREE.AxesHelper(180,180,180)

//将坐标系插入到场景中去
 scene.add(axesHelper);
// //创建光源
// const directionalLight = new THREE.DirectionalLight(0xf00000, 1);
// //光源位置设置、
// directionalLight.position.set(4,4,1)
// //将光源添加到场景中
// scene.add(directionalLight);
//创建环境光并加入场景
const light = new THREE.AmbientLight( 0x404ff5 ); // 柔和的白光
scene.add( light );
//创建一个平面几何体
const geometry=new THREE.PlaneGeometry(1600,200)
//创建材质
const material=new THREE.MeshLambertMaterial({
    color:0X0000f0
})
//创建网格模型
const mesh=new THREE.Mesh(geometry,material)
//模型加入场景
scene.add(mesh)
//模型旋转一下
mesh.rotateX(-Math.PI/2)
//创建聚光灯光源
const spotLight=new THREE.SpotLight(0xffffff,10)
spotLight.position.set( -200, 100, 0 );
//设置聚光灯光源的角度
spotLight.angle=Math.PI/8
//设置距离衰减度
spotLight.decay = 0.3
//设置聚光灯的照射点
spotLight.target.position.set(190,0,0)
//照射点要加入场景否则无效
scene.add(spotLight.target);
//聚光灯加入场景
scene.add(spotLight)
//用光源辅助来可视化聚光灯
const spotLightHelper = new THREE.SpotLightHelper( spotLight );
scene.add( spotLightHelper );

//创建平行光
const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
//平行光位置设置
directionalLight.position.set(-600,200,200)
scene.add( directionalLight );
//设置光照位置
directionalLight.target.position.set(-600,0,0)
//光照位置加入场景
scene.add( directionalLight.target );
//光源辅助可视化平行光
const helper = new THREE.DirectionalLightHelper( directionalLight, 9 ); 
scene.add( helper );
//创建一个几何体
const box=new THREE.BoxGeometry(20,100,20)
const material1=new   THREE.MeshLambertMaterial()
const mesh1=new THREE.Mesh(box,material1)
scene.add(mesh1)
//设置几何体位置
mesh1.position.set(-600,50,0)






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

//创建相机轨道控制工具。
const controls = new OrbitControls(camera, renderer.domElement);
//被照射几何体阴影开启
mesh1.castShadow=true
//接受影子的几何体开启阴影接收
mesh.receiveShadow =true
//设置阴影
 directionalLight.shadow.mapSize=new THREE.Vector2(128,1024)
 directionalLight.shadow.radius=2
//光源阴影开启
directionalLight.castShadow =true
//渲染器开启阴影设置
renderer.shadowMap.enabled=true
//可视化调试光源阴影属性中相机范围
directionalLight.shadow.camera.position.set(-600,200,200)
directionalLight.shadow.camera.left = -200;
directionalLight.shadow.camera.right = 200;
directionalLight.shadow.camera.top = 200;
directionalLight.shadow.camera.bottom = -300;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 400;
const helper1 = new THREE.CameraHelper(directionalLight.shadow.camera);
//设置相机位置
console.log(directionalLight.shadow.camera);

scene.add( helper1 );
//再创建一个几何体
const box1=new THREE.BoxGeometry(20,100,20)
const material2=new   THREE.MeshLambertMaterial()
const mesh2=new THREE.Mesh(box1,material2)
mesh2.castShadow=true
mesh2.translateX(-500)
mesh2.translateY(50)
scene.add(mesh2)



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