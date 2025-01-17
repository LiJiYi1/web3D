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
//创建一个层级模型统一管理mesh并加入场景
const group=new THREE.Group()
scene.add(group)
//创建三个mesh
const mesh =new THREE.Mesh(geometry,material.clone())
//调整mesh的位置
group.add(mesh)
const mesh1 =new THREE.Mesh(geometry,material.clone())
mesh1.position.x=100
group.add(mesh1)
const mesh2 =new THREE.Mesh(geometry,material.clone())
mesh2.position.y=100
scene.add(mesh2)
//创建一个光源
const light=new THREE.AmbientLight(0x404040)
light.intensity=1000
scene.add(light)
scene.updateMatrixWorld()
//创建一个射线对象
const ray=new THREE.Ray()
ray.origin=new THREE.Vector3(0,0,0)
ray.direction=new THREE.Vector3(100,0,0).normalize()
//三角形的三个顶点
const p=new THREE.Vector3(188,25,0)
const p1=new THREE.Vector3(188,-25,-25)
const p2=new THREE.Vector3(188,-25,25)
//创建一个三角形
const Triangle=new THREE.BufferGeometry()
Triangle.setFromPoints([p,p1,p2])
const TriangleMesh=new THREE.Mesh(Triangle,material)
scene.add(TriangleMesh)
//创建一个矢量接收交叉点
const v=new THREE.Vector3()
//计算与三角形的相交
const res=ray.intersectTriangle(p,p1,p2,false,v)
// console.log(ray);
// console.log(v);

//创建一个光线拾取,并设置好参数
const rayCaster=new THREE.Raycaster(new THREE.Vector3(-100, 0, 0),new THREE.Vector3(1, 0,0))
rayCaster.ray.origin=new THREE.Vector3(-100,0,0)
rayCaster.ray.direction=new THREE.Vector3(1,0,0)
//得到相交结果
const intersect=rayCaster.intersectObjects([mesh,TriangleMesh,mesh1])
console.log(intersect);

// if(intersect.length>0){
//     intersect[0].object.material.color.set(0xff0000);
// }
const loader=new THREE.TextureLoader()
const texture=loader.load('/初级篇学习资源/光点.png')
//创建一个光点精灵图
const spriteMaterial=new THREE.SpriteMaterial({
          map:texture
})
const spirite=new THREE.Sprite(spriteMaterial)
spirite.change=()=>{
    mesh1.material.color.set(0x11112222)
    return 1
}
spirite.scale.set(100,100,0)
spirite.position.set(122,122,122)
scene.add(spirite)
//实现屏幕坐标转设备坐标
document.addEventListener('click',(e)=>{
const x=(e.offsetX/window.innerWidth)*2-1
const y=-(e.offsetY/window.innerHeight)*2+1
console.log('x',x,'y',y);
rayCaster.setFromCamera( new THREE.Vector2(x,y), camera );


const intersect=rayCaster.intersectObjects([mesh1,mesh2,mesh,TriangleMesh,spirite])
if(intersect.length>0){
    intersect[0].object.material.color.set(0xff0000);
    if(intersect[0].object.change()){
         intersect[0].object.change()
    }
   
    console.log(intersect);
    
}
})

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