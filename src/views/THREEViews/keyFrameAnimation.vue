<template>
    <div>  
    <div id="container" ref="container"></div>
    <div id="stat" ref="stateref"></div>
    <div class="pos">
        <div id="stop" class="bu" @click="stop()">停止</div>
        <div id="play" class="bu" style="margin-left: 10px;" @click="play">播放</div>
        <div ref="paused" id="pause" class="bu" style="margin-left:16px;" @click="pause()">暂停</div>
        <div id="next" class="bu" style="margin-left:20px;" @click="next()">下一步</div>
    </div>
</div>

</template>
<script setup>
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//引入stats库
import State from 'three/examples/jsm/libs/stats.module'
//引入GUI库
import * as dat from 'dat.gui';
import { onMounted,ref,onUnmounted} from 'vue';
import { Clock } from 'three';


//创建一个GUI对象
const gui = new dat.GUI();
gui.domElement.style.position='absolute'
gui.domElement.style.top='60.1px'
gui.domElement.style.right='2%'
const container=ref(null);
const paused=ref(null)
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
//创建一个正方体
const geometry=new THREE.BoxGeometry(25,25,25)
const material=new THREE.MeshLambertMaterial()
const mesh =new THREE.Mesh(geometry,material)
scene.add(mesh)
mesh.name='box'
//创建两个关键帧
const frame1=new THREE.KeyframeTrack('box.position',[0,3,6],[0,0,0,100,0,0,0,0,100])
const frame2=new THREE.KeyframeTrack('box.material.color',[0,4,6],[0,0,0,1,1,0,1,1,1])
//两个关键帧合成一个animationClip
const clip=new THREE.AnimationClip('STATE',6,[frame1,frame2])
//创建一个mixer
const mixer=new THREE.AnimationMixer(mesh)
//clip给mixer的clipAction从而返回一个animationAction
const animate=mixer.clipAction(clip)

function stop(){
    //停止播放
    animate.stop()
}
function play(){
    //继续播放
    animate.play()
}
function next(){
    //实现点击下一步
    animate.time+=0.5
}
function pause(){
    //暂停播放
    if(animate.paused){
        animate.paused=false;
        paused.value.innerHTML='暂停'
        return
    }
    animate.paused=true
    paused.value.innerHTML='继续'
}
//控制倍速
gui.add(animate,'timeScale',0,2).name('倍速')
//通过控制time控制模型位置
gui.add(animate,'time',0,6).name('time时间控制位置')



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
directionalLight.position.set(4,4,1)
//将光源添加到场景中
scene.add(directionalLight);
//加载士兵模型到场景中
const Loader=new GLTFLoader()
Loader.load('../../初级篇学习资源/士兵.glb',(gltf)=>{
    console.log(gltf.animations);
    const mixer=new THREE.AnimationMixer(gltf.scene)
    const animate=mixer.clipAction(gltf.animations[1])
    animate.play()
    const clock=new THREE.Clock()
    function loop(){
        mixer.update(clock.getDelta())
        requestAnimationFrame(loop)
    }
    loop()
    scene.add(gltf.scene)
})

Loader.load('../../初级篇学习资源/机械装配动画.glb',(gltf)=>{
    const mixer=new THREE.AnimationMixer(gltf.scene)
    console.log(gltf.animations);
    const animate= mixer.clipAction(gltf.animations[0])
    const animation=gltf.animations
    console.log(animation);
    
    animate.play()
    gui.add(animate,'time',0,animation.duration).name('拆解').step(1)
    const clock=new THREE.Clock()
    function loop(){
        mixer.update(clock.getDelta())
        requestAnimationFrame(loop)
    }
    loop()
    gltf.scene.traverse((obj)=>{
        if(obj.isMesh){
           obj.material.metalness=0.9    
        }
    })
    gltf.scene.position.set(100,0,100)
    scene.add(gltf.scene)
})


//让他只循环一次
animate.loop=THREE.LoopOnce
//动画停止在最后一帧
animate.clampWhenFinished =true
//执行一下play方法
animate.play()
//提供两个变形的顶点数据
const p1=new THREE.BoxGeometry(25,100,25).attributes.position
const p2=new THREE.BoxGeometry(100,25,100).attributes.position
//创建一个几何体
const geometry=new THREE.BoxGeometry(25,25,25)
const material=new THREE.MeshLambertMaterial()
geometry.morphAttributes.position=[p1,p2]
const mesh1=new THREE.Mesh(geometry,material)
mesh1.position.set(-100,-100,-100)
scene.add(mesh1)
//变形占比设置
mesh1.morphTargetInfluences[0]=1
const obj={
    t1:0,
    t2:0
}
const change=gui.addFolder('变形')
//用GUI库调节形变
change.add(obj,'t1',0,1).name('变高').onChange((value)=>{
    mesh1.morphTargetInfluences[0]=value
})
change.add(obj,'t2',0,1).name('变粗').onChange((value)=>{
    mesh1.morphTargetInfluences[1]=value
})
//加载鸟模型
Loader.load('../../初级篇学习资源/鸟.glb',(gltf)=>{
    const mixer=new THREE.AnimationMixer(gltf.scene)
    const animate=mixer.clipAction(gltf.animations[0])
    animate.play()
    const clock=new THREE.Clock()
    function loop(){
        mixer.update(clock.getDelta())
        requestAnimationFrame(loop)
    }
    loop()
    gltf.scene.position.set(0,100,0)
    scene.add(gltf.scene)
})
//创建一个Floader折叠框子，用来调节人
const person=gui.addFolder('调节人的体型')
//加载人模型
Loader.load('../../初级篇学习资源/人.glb',(gltf)=>{
    // console.log(gltf.scene.children[0].morphTargetDictionary);
    gltf.scene.position.set(100,0,0)
    scene.add(gltf.scene)
    const arr=['变胖', '丰乳肥臀', '增肌', '年龄', '变瘦']
    
    //创建一个OBJ对象配合gui库使用
    const obj={}
    //利用for循环批量创建gui来调节模型变化
    for(let i=0;i<arr.length;i++){
        obj['t'+ i]=0;
        person.add(obj,'t' + i,0,1).name(arr[i]).onChange((v)=>{
            gltf.scene.children[0].morphTargetInfluences[i]=v
        })
    }
        //利用for循环批量创建gui来调节模型变化
    //   for (let i = 0; i < arr.length; i++) {
    //     obj['t' + i] = 0;//obj批量定义一个属性表示变性目标的权重系数
    //     // 批量设置要改变的obj属性，对应name名字，和对应权重
    //     person.add(obj, 't' + i, 0, 1).name(arr[i]).onChange((v)=> {
    //         gltf.scene.children[0].morphTargetInfluences[i] = v;
    //     })
    // }
})

const Bone1 = new THREE.Bone(); //关节1，用来作为根关节
const Bone2 = new THREE.Bone(); //关节2
const Bone3 = new THREE.Bone(); //关节3
//创建数组存放骨骼
const bones=[]
bones.push(Bone1)
bones.push(Bone2)
bones.push(Bone3)
// 设置关节父子关系   多个骨头关节构成一个树结构
Bone1.add(Bone2);
Bone2.add(Bone3);
//根关节Bone1默认位置是(0,0,0)
Bone2.position.y = 60; //Bone2相对父对象Bone1位置
Bone3.position.y = 30; //Bone3相对父对象Bone2位置
Bone1.position.set(50,0,50);//平移Bone1，Bone2、Bone3跟着平移
scene.add(Bone1)
const skeletonHelper = new THREE.SkeletonHelper(Bone1);
scene.add(skeletonHelper)
//把上面的骨骼都放入一个骨架里
const armSkeleton = new THREE.Skeleton( bones );
//创建蒙皮网格模型
const geo=new THREE.CylinderGeometry( 5, 5, 5, 5, 15, 5, 30 );
const mesh=new THREE.SkinnedMesh(geo,material)
mesh.bind(armSkeleton)
// scene.add(mesh)

//用GUI库控制骨骼移动
const gu=gui.addFolder('骨骼')
gu.add(Bone1.rotation,'x',0,Math.PI)
gu.add(Bone2.rotation,'x',0,Math.PI)

const solider=gui.addFolder('士兵')
Loader.load('../../初级篇学习资源/士兵.glb',(gltf)=>{
gltf.scene.position.set(10,0,0)
const skeletonHelper = new THREE.SkeletonHelper(gltf.scene);
scene.add(skeletonHelper)
const mesh=gltf.scene.children[0]
console.log(mesh.getObjectByName('mixamorigHips').children);
const boneArr=mesh.getObjectByName('mixamorigHips').children
const obj1={}
//循环创建UI拖动条
for(let i=0;i<boneArr.length;i++){
    obj['t'+i]=0
    solider.add(obj,'t'+i,0,Math.PI).onChange((value)=>{
        mesh.getObjectByName('mixamorigHips').children[i].rotation.x=value
    })
}
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
// //刷个画布底色
renderer.setClearColor(0x000,1.);
//渲染
renderer.render(scene, camera);
//放入dom元素里面
container.value.appendChild(renderer.domElement);

//创建相机轨道控制工具。
const controls = new OrbitControls(camera, renderer.domElement);
// controls.minDistance = 200;
// //相机位置与观察目标点最大值
// controls.maxDistance = 500;

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
const clock=new THREE.Clock()
function animation(){
//获得间隔
const jian=clock.getDelta()
mixer.update(jian)
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
            margin-left: -65px;
            bottom: 100px;
        }
   
</style>