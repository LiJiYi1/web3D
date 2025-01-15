<template>
    <div>  
    <div id="container" ref="container"></div>
    <div id="stat" ref="stateref"></div>
 <div class="pos">
        <div  id="x" class="bu" ref="x" @click="xChange()">x</div>
        <div  id="y" class="bu" style="margin-left: 10px;"  ref="x" @click="yChange">y</div>
        <div  id="z" class="bu" style="margin-left: 10px;"  ref="x" @click="zChange">z</div>
    </div>
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
camera.position.set(300, 300, 300);
//相机视线方向
camera.lookAt(0, 0, 0)

function xChange(){
    camera.position.set(500, 0, 0); //x轴方向观察
    camera.lookAt(0, 0, 0); //重新计算相机视线方向
}
function yChange(){
    camera.position.set(0, 500, 0); //x轴方向观察
    camera.lookAt(0, 0, 0); //重新计算相机视线方向
}
function zChange(){
    camera.position.set(0, 0, 500); //x轴方向观察
    camera.lookAt(0, 0, 0); //重新计算相机视线方向
}
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
//创建光源
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//光源位置设置、
directionalLight.position.set(-4,-4,-1)
//将光源添加到场景中
scene.add(directionalLight);
//创建样条曲线
const curve = new THREE.CubicBezierCurve3(
	new THREE.Vector3( -100, 0, 0 ),
	new THREE.Vector3( -50, 150, 100 ),
	new THREE.Vector3( -200, -150, 200 ),
	new THREE.Vector3( 100, 40, 20)
);
//创建纹理贴图
const texture=new THREE.TextureLoader().load('../../public/初级篇学习资源/diffuse.jpg')
//纹理阵列开启
texture.wrapS=THREE.RepeatWrapping
//实现阵列
texture.repeat =new THREE.Vector2(5,1)
//拿到曲线里点的坐标
const points=curve.getSpacedPoints(900)
console.log(points);
//通过点坐标来设置自定义几何体
const geometry = new THREE.TubeGeometry(curve,64,6,8);
//创建几何体的材质
const material = new THREE.MeshLambertMaterial( { 
     color: 0xf0009f,//颜色会和贴图一起计算
    side: THREE.DoubleSide,
    map:texture//把贴图给管子
 } );
//创建管道模型
const Tube=new THREE.Mesh(geometry,material)
//模型加入场景
scene.add(Tube)






//创建一个渲染器
const renderer = new THREE.WebGLRenderer({
  antialias:true,
});
//设置canvas画布大小
renderer.setSize(width, height);
//设置设备像素比
renderer.setPixelRatio(window.devicePixelRatio);
// //刷个画布底色
renderer.setClearColor(0x0ff000,.8);
//渲染
renderer.render(scene, camera);
//放入dom元素里面
container.value.appendChild(renderer.domElement);

//创建相机轨道控制工具。
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(points[1].x,points[1].y,points[1].z )
controls.minDistance = 200;
//相机位置与观察目标点最大值
controls.maxDistance = 500;

// 上下旋转范围
controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI/2;
// 左右旋转范围
controls.minAzimuthAngle = -Math.PI/2;
controls.maxAzimuthAngle = Math.PI/2;

// //相机距离观察目标点最小值
// controls.minDistance =200;
// //相机距离观察目标点最大值
// controls.maxDistance = 500;
//更新相机
controls.update()
// //dom元素噶变后执行事件监听
// controls.addEventListener('change',()=>{
//   console.log(camera.position);
//   //改变后重新渲染
//   renderer.render(scene,camera);
// })
//创建一个请求动画帧以实现一个渲染循环。
let i=0;
function animation(){
//相机位置设置到管道里
if(i<points.length-1)
{camera.position.copy(points[i])
//设置相机的lookAt参数
camera.lookAt(points[i+1])
//设置control
controls.target.set(points[i+1].x,points[i+1].y,points[i+1].z )
i++;
}
else{
    camera.position.set(300,300,300),
    camera.lookAt(0,0,0)
    i=0
}
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
//设置相机的上方向
camera.up.set(0,1,1)

console.log(x);

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