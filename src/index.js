import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//引入stats库
import State from 'three/examples/jsm/libs/stats.module'
//引入GUI库
import * as dat from 'dat.gui';
//创建State对象
const state=new State();
//state对象加入dom
document.body.appendChild(state.domElement);
//测试一下是否成功引入了
console.log(THREE.Scene);
//创建一个场景
const scene = new THREE.Scene();
//为透视投影相机准备宽高比
const width = window.innerWidth;
const height = window.innerHeight;
//创建一个相机(透视投影)
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
//相机位置
camera.position.set(10, 10, 10);
//相机视线方向
camera.lookAt(0, 0, 0)
//创建一个圆环并给与参数
const geometry = new THREE.TorusGeometry(5, 0.8, 5, 100, Math.PI * 2);
//创建第二个椭圆给与参数
const geometry2 = new THREE.TorusGeometry(4, 0.7, 5, 100, Math.PI * 2);
//创建第三个椭圆给与参数
const geometry3 = new THREE.TorusGeometry(3, 0.6, 5, 100, Math.PI * 2);
//创建一种材质
const material = new THREE.MeshPhongMaterial(
  {
    transparent:true,
    color: 0xff00000, 
    opacity: 0.8,
    shininess:100,
    // specular:0xf11
    }
);
//创建第二种材质
const material2 = new THREE.MeshPhongMaterial(
  {
    transparent: true,
    color: 0x00ff00,
    opacity: 0.8,
    shininess: 100,
    // specular:0xf11
  }
);
//创建第三种材质
const material3 = new THREE.MeshPhongMaterial(
  {
    transparent: true,
    color: 0x000fff,
    opacity: 0.8,
    shininess: 100,
    // specular:0xf11
  }
);
//创建一个物体网格
const mesh = new THREE.Mesh(geometry, material);
//创建第二物体网格
const mesh2=new THREE.Mesh(geometry2,material2);
//创建第三物体网格
const mesh3 = new THREE.Mesh(geometry3, material3);
//把相机加入场景
scene.add(camera);
//把网格几何体加入场景
scene.add(mesh);
//第二个网格也要加入场景
scene.add(mesh2);
//第三个网格也要加入场景
scene.add(mesh3);
//网格位置设置
mesh.position.set(0,0, 0);
mesh2.position.set(0, 0, 0);
//创建一个坐标系
const axesHelper = new THREE.AxesHelper(5);
//将坐标系插入到场景中去
scene.add(axesHelper);

//创建光源
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//光源位置设置、
directionalLight.position.set(4,4,1)
//将光源添加到场景中
scene.add(directionalLight);
//创建可视化平行光
const helper = new THREE.DirectionalLightHelper(directionalLight, 2);
scene.add(helper);
//创建一个GUI对象
const gui = new dat.GUI();
//创建一个关于坐标的折叠框
const coord = gui.addFolder('坐标');
//往坐标的折叠框里加入x,y,z坐标
coord.add(mesh3.position, 'x', 0, 100);
coord.add(mesh3.position, 'y', 0, 100);
coord.add(mesh3.position, 'z', 0, 100);
//创建一个关于光照颜色的折叠框
const color = gui.addFolder('光照颜色');
//往颜色的折叠框里加入r,g,b,a
console.log(directionalLight);
color.add(directionalLight.color, 'r',0,1).name('red').step(0.1);
color.add(directionalLight.color, 'g', 0, 1).name('blue').step(0.1);
color.add(directionalLight.color, 'b', 0, 1).name('green').step(0.1);
//选择框
//把材质加进去
const materia=gui.addFolder('材质透明度');
console.log(material3);
materia.add(material3,'transparent',true)
//关于物体颜色
const palette = {
  color1: '#FF0000', // CSS string
  color2: [0, 128, 255], // RGB array
  color3: [0, 128, 255, 0.3], // RGB with alpha
  color4: { h: 350, s: 0.9, v: 0.3 } // Hue, saturation, value
};
gui.addColor(palette, 'color1').name('物体颜色').onChange((value)=>{
  console.log(value);
material3.color.set(value);
});
//调画布颜色
gui.addColor(palette, 'color1').name('画布颜色').onChange((value) => {
  console.log(value);
  renderer.setClearColor(value, .8);
});
//创建一个渲染器
const renderer = new THREE.WebGLRenderer({
  antialias:true,
});
//设置canvas画布大小
renderer.setSize(width, height);
//设置设备像素比
renderer.setPixelRatio(window.devicePixelRatio);
// //刷个画布底色
// renderer.setClearColor(0x0ffff0,.8);
//渲染
renderer.render(scene, camera);
//放入dom元素里面
document.body.appendChild(renderer.domElement);



//创建一个clock
const clock=new THREE.Clock();

//创建一个请求动画帧以实现一个渲染循环。
function animation(){
//clock的一个时间
const  spt=clock.getDelta()*1000;
// console.log(spt);
//关于帧率
// console.log(1000/spt);
//更新帧率
state.update();
//用mesh的旋转属性实现一个旋转
mesh.rotateX(0.02);
//旋转第二个网格
mesh2.rotateY(0.02);
//渲染器更新
renderer.render(scene,camera);
//执行渲染循环。
requestAnimationFrame(animation)
}
//调用函数
animation();

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