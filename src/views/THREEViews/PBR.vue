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
camera.position.set(-200,300,300);;
//相机视线方向
camera.lookAt(0, 0, 0)
//把相机加入场景
scene.add(camera)
//创建一个坐标系
const axesHelper = new THREE.AxesHelper(5);
//将坐标系插入到场景中去
scene.add(axesHelper);
// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(100, 60, 50);
// scene.add(directionalLight);
// const ambient = new THREE.AmbientLight(0xffffff, 0.4);
// scene.add(ambient);
//创建gltf加载控件
const loader=new GLTFLoader()
//创建一个folder
const jin=gui.addFolder('金属材质')
const rough=gui.addFolder('金属粗糙')
//创建立方体贴图
const cubeTexture=new THREE.CubeTextureLoader()
	.setPath( '/环境贴图/环境贴图1/' )
	.load( [
				'px.jpg',
				'nx.jpg',
				'py.jpg',
				'ny.jpg',
				'pz.jpg',
				'nz.jpg'
			] );
 scene.environment=cubeTexture           
//loader加载模型
loader.load('/初级篇学习资源/金属.glb',(gltf)=>{
 gltf.scene.traverse((obj)=>{
    if(obj.isMesh){
    //     //加载环境贴图
    //     obj.material.envMap=cubeTexture
    //     //环境贴图的影响程度
    //    obj.material.envMapIntensity=1.0
        // console.log(obj);
        jin.add(obj.material,'metalness',0,1).name(obj.name)
        rough.add(obj.material,'roughness',0,1).name(obj.name)
    }
 })
 gltf.scene.position.z+=150
scene.add(gltf.scene)
})
//加载轿车模型
loader.load('/初级篇学习资源/车pbr.glb',(gltf)=>{
//获得车壳子
const carke=gltf.scene.getObjectByName('外壳01')
carke.material = new THREE.MeshPhysicalMaterial({
        color: carke.material.color, //默认颜色
        // color: 0x222222,//换一种颜色
        metalness: 0.9,//车外壳金属度
        roughness: 0.5,//车外壳粗糙度
        clearcoat: 1, //清漆层
        clearcoatRoughness: 0.01, //清漆层粗糙度
        envMap: cubeTexture, //环境贴图
        envMapIntensity: 2.5, //环境贴图对Mesh表面影响程度
    })
gui.add(carke.material,'roughness',0,1).name('车壳子粗糙度')
gui.add(carke.material,'metalness',0,1).name('车壳子金属度')
gui.add(carke.material,'clearcoat',0,1).name('车壳子清漆')
gui.add(carke.material,'clearcoatRoughness',0,1).name('清漆粗糙度')
gui.add(carke.material,'envMapIntensity',0,10).name('环境贴图影响')
//关于物体颜色
const palette = {
  color1: '#FF0000', // CSS string
  color2: [0, 128, 255], // RGB array
  color3: [0, 128, 255, 0.3], // RGB with alpha
  color4: { h: 350, s: 0.9, v: 0.3 } // Hue, saturation, value
};
gui.addColor(palette, 'color1').name('车壳子颜色').onChange((value)=>{
carke.material.color.set(value)
});
//获得玻璃
const mesh = gltf.scene.getObjectByName('玻璃01')
mesh.material = new THREE.MeshPhysicalMaterial({
        metalness: 0.0,//玻璃非金属 
        roughness: 0.0,//玻璃表面光滑
        envMap:cubeTexture,//环境贴图
        envMapIntensity: 1.0, //环境贴图对Mesh表面影响程度
        transmission: 1.0, //玻璃材质透光率，transmission替代opacity 
        ior:1.5,//折射率
})
gui.add(mesh.material,'transmission',0,1).name('玻璃透光率')
gui.add(mesh.material,'ior',0,2).name('玻璃折射率')
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