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
import { BufferAttribute } from 'three';
import { Scene } from 'three';
import Threebasic from './Threebasic.vue';
//创建一个GUI对象
const gui = new dat.GUI();
const container=ref(null);
const container1=ref(null);
const percentDiv=ref(null);
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
const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
//相机位置
camera.position.set(-200,300,300);;
//相机视线方向
camera.lookAt(0, 0, 0)
//把相机加入场景
scene.add(camera)
//创建一个坐标系
const axesHelper = new THREE.AxesHelper(888);
//将坐标系插入到场景中去
scene.add(axesHelper);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

//创建一个bufferGeometry
const geometry=new THREE.BufferGeometry();
//创建一个数组存顶点
const PointArray=[];
//规定一下半径，和两个点之间相隔的角度
const R=100;
const angle=Math.PI*2/50;
//for循环给点x,y坐标搞出来
for(let i=0;i<50;i++){
    const x=R*Math.cos(angle*i)
    const y=R*Math.sin(angle*i)
    PointArray.push(x,y,0)
}
const arr=new Float32Array(PointArray)
geometry.attributes.position=new BufferAttribute(arr,3)
//创建材质
const material=new THREE.MeshLambertMaterial()
//创建mesh
const line=new THREE.LineLoop(geometry,material)
//把line放入场景
scene.add(line)

//创建一个bufferGeometry
const geometry1=new THREE.BufferGeometry();
//创建一个数组存顶点
const PointArray1=[
new THREE.Vector3(50,50,100),
new THREE.Vector3(-50,-50,100),
new THREE.Vector3(-50,50,100),
new THREE.Vector3(50,-50,100),
];
geometry1.setFromPoints(PointArray1)
//创建材质
const material1=new THREE.MeshLambertMaterial({
    color:0x111111
})
//创建mesh
const line1=new THREE.LineLoop(geometry1,material1)
//把line放入场景
scene.add(line1)

//创建一个曲线
const curve = new THREE.EllipseCurve(
	0,  90,            // ax, aY
	60, 60,           // xRadius, yRadius
	0,  2 * Math.PI,  // aStartAngle, aEndAngle
	false,            // aClockwise
	0                 // aRotation
);
const points = curve.getPoints( 50 );
const geometry2=new THREE.BufferGeometry();
geometry2.setFromPoints(points)
const material2=new THREE.MeshLambertMaterial({
    color:0x222222
})
const line2=new THREE.LineLoop(geometry2,material2)
scene.add(line2)

//创建一个样条曲线
const curve1 = new THREE.CatmullRomCurve3( [
	   new THREE.Vector3(-50, 20, 90),
    new THREE.Vector3(-10, 40, 40),
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(60, -60, 0),
    new THREE.Vector3(70, 0, 80)
] );
const points1 = curve1.getPoints(100);
const geometry3=new THREE.BufferGeometry();
geometry3.setFromPoints(points1)
const material3=new THREE.MeshLambertMaterial({
    color:0x111188
})
const line3=new THREE.Line(geometry3,material3)
scene.add(line3)
//贝塞尔曲线
const curve2 = new THREE.QuadraticBezierCurve3(
	new THREE.Vector3( -100, 0, 0 ),
	new THREE.Vector3( 200, 150, 0 ),
	new THREE.Vector3( 100, 0, 0 )
);

const points2 = curve2.getPoints( 50 );
const geometry4 = new THREE.BufferGeometry().setFromPoints( points2 );

const material4 = new THREE.LineBasicMaterial( { color: 0xff0000 } );

// Create the final object to add to the scene
const curveObject = new THREE.Line( geometry4, material4 );
scene.add(curveObject)
//创建网格辅助
const gridHelper = new THREE.GridHelper( 1000, 10);
scene.add( gridHelper );

//使用样条曲线实现飞线********************************************************
const curve3 = new THREE.CatmullRomCurve3( [
	new THREE.Vector3( 300, 0, 300 ),
	new THREE.Vector3( 0, 200, 0 ),
	new THREE.Vector3( -300, 0, -300 ),
	
] );
const points3 = curve3.getPoints( 50 );
const geometry5 = new THREE.BufferGeometry().setFromPoints( points3 );
const material5 = new THREE.LineBasicMaterial( { color: 0xff0000 } );
// Create the final object to add to the scene
const curveObject1 = new THREE.Line( geometry5, material5 );
scene.add(curveObject1)
const materialPoint=new THREE.PointsMaterial({
    size:20
})
const geometryPoint=new THREE.BufferGeometry()
geometryPoint.setFromPoints([new THREE.Vector3( 300, 0, 300 ),
	new THREE.Vector3( 0, 200, 0 ),
	new THREE.Vector3( -300, 0, -300 )])
const curveObject2 = new THREE.Points( geometryPoint, materialPoint);
scene.add(curveObject2)
//使用贝塞尔曲线实现飞线******************************************************、
const curveBezier = new THREE.QuadraticBezierCurve3(
	new THREE.Vector3( -300, 0, 300),
	new THREE.Vector3( 0, 300, 0 ),
	new THREE.Vector3( 300, 0, -300 )
);
const pointsBezier = curveBezier.getPoints( 50 );
const geometryBezier = new THREE.BufferGeometry().setFromPoints( pointsBezier );
const materialBezier = new THREE.LineBasicMaterial( { color: 0xff0000 } );
// Create the final object to add to the scene
const curveObjectBezier = new THREE.Line( geometryBezier, materialBezier );
scene.add(curveObjectBezier)
//贝塞尔曲线所用点
const geometryPoint1=new THREE.BufferGeometry()
geometryPoint1.setFromPoints([new THREE.Vector3( -300, 0, 300 ),
	new THREE.Vector3( 0, 300, 0 ),
	new THREE.Vector3( 300, 0, -300 )])
const curveObject3 = new THREE.Points( geometryPoint1, materialPoint);
scene.add(curveObject3)
//将点连成线
const geometryLine=new THREE.BufferGeometry()
geometryLine.setFromPoints([new THREE.Vector3( -300, 0, 300 ),
	new THREE.Vector3( 0, 300, 0 ),
	new THREE.Vector3( 300, 0, -300 )])
 const materialLine=new THREE.LineBasicMaterial()
const curveObjectLine = new THREE.Line( geometryLine, materialLine);
scene.add(curveObjectLine)
//曲线拼接curvePath
//创建两条直线
const R1=200;
const STRIT1=new THREE.LineCurve3(new THREE.Vector3(400-R1,R1,0),new THREE.Vector3(400-R1,400,0))
const STRIT=new THREE.LineCurve3(new THREE.Vector3(400+R1,400,0),new THREE.Vector3(400+R1,R1,0))
//创建一条圆弧
const radius= new THREE.ArcCurve(400, R1, R1, 0, Math.PI, true);
 const curvePath=new THREE.CurvePath()
 curvePath.curves.push(STRIT,radius,STRIT1)
 const PointArray2=curvePath.getPoints(50)
 const curvePathGeometry=new THREE.BufferGeometry()
 curvePathGeometry.setFromPoints(PointArray2)
 const curvePathLine=new THREE.Line(curvePathGeometry,material4)
 scene.add(curvePathLine)
 //加点点进去
 const curvePathPoint=new THREE.Points(curvePathGeometry,materialPoint)
 scene.add(curvePathPoint)

//创建管道
// 创建多段线条的顶点数据
const p1 = new THREE.Vector3(0, 0,100)
const p2 = new THREE.Vector3(0, 0,30);
const p3 = new THREE.Vector3(0, 0,0);
const p4 = new THREE.Vector3(30, 0, 0);
const p5 = new THREE.Vector3(100, 0, 0);
// 1. 3D直线线段
const lines = new THREE.LineCurve3(p1, p2);
// 2. 三维二次贝塞尔曲线
const curves = new THREE.QuadraticBezierCurve3(p2, p3, p4);
// 3. 3D直线线段
const lines1 = new THREE.LineCurve3(p4, p5);

const curvePath1 = new THREE.CurvePath(); 
// 三条线拼接为一条曲线
curvePath1.curves.push(lines, curves, lines1); 
 const geometryTube = new THREE.TubeGeometry(curvePath1, 50, 2, 25);
 const materialTube = new THREE.MeshPhongMaterial( { color: 0x00ff00,
    side: THREE.DoubleSide,
  } );
 const tube = new THREE.Mesh( geometryTube, materialTube);
 scene.add( tube );
//旋转成面
const geometryRotate = new THREE.LatheGeometry( [new THREE.Vector3(400,0,300),new THREE.Vector3(400,200,400)] );
const materialRotate = new THREE.MeshBasicMaterial( { color: 0xffff00 ,
    side:THREE.DoubleSide
} );
const lathe = new THREE.Mesh( geometryRotate, materialRotate );
scene.add( lathe );
//几何体填充
const x = 0, y = 0;
const heartShape = new THREE.Shape([new THREE.Vector2(400,400),new THREE.Vector2(400,0),new THREE.Vector2(0,0),new THREE.Vector2(0,400)]);
const shape = new THREE.ShapeGeometry( heartShape );
const shapeMaterial = new THREE.MeshPhongMaterial( { color: 0x00ff88 ,
} );
const shapeMesh= new THREE.Mesh( shape, shapeMaterial ) ;
scene.add( shapeMesh );
//几何体拉伸
const shape1 = new THREE.Shape([new THREE.Vector2(20,0),new THREE.Vector2(20,20),new THREE.Vector2(0,20),new THREE.Vector2(0,0)]);
const extrudeSettings = {
	steps: 2,
	depth: 114,
	bevelEnabled: true,
	bevelThickness: 1,
	bevelSize: 1,
	bevelOffset: 0,
	bevelSegments: 1
};
const geometryEX = new THREE.ExtrudeGeometry( shape1, extrudeSettings );
const materialEX = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
const mesh = new THREE.Mesh( geometryEX, materialEX ) ;
scene.add( mesh );
//几何体拉伸（按曲线扫描）
//创建一个贝塞尔曲线
const Bezier = new THREE.CubicBezierCurve3(
	new THREE.Vector3( -100, 0, 0 ),
	new THREE.Vector3( -50, 150, 0 ),
	new THREE.Vector3( 200, 150, 0 ),
	new THREE.Vector3( 100, 0, 0 )
);
//创建一个shape
const shape2=new THREE.Shape([ 
    new THREE.Vector2(0,0), //多边形起点
    new THREE.Vector2(0,10),
    new THREE.Vector2(10,10),
    new THREE.Vector2(10,0),])
//创建拉伸几何体
const geometryEX1 = new THREE.ExtrudeGeometry( shape2, {
    extrudePath:Bezier,//按照哪条曲线拉伸
    steps:200//沿拉伸方向的细分数。决定了拉伸曲线的圆滑度。
} );
const materialEX1 = new THREE.MeshPhongMaterial( { color: 0x82ff00 } );
const meshEX1 = new THREE.Mesh( geometryEX1, materialEX1 ) ;
scene.add( meshEX1 );
//shape的操作
const shapeReal=new THREE.Shape()
//改变当前点位
shapeReal.currentPoint=new THREE.Vector2(-200,0)
//画直线
shapeReal.lineTo(-400,0);
shapeReal.lineTo(-400,200)
//画圆弧
// shapeReal.arc(0,-200,200,Math.PI/2,0,true)
shapeReal.absarc(-400,0,200,Math.PI/2,0,true)
//创建path用来做孔洞的形状
const path=new THREE.Path()
path.lineTo(-300,0)
path.lineTo(-300,50)
path.lineTo(-250,50)
path.lineTo(-250,0)
const path1=new THREE.Path()
path1.arc(-350,50,4,0,Math.PI*2)
//孔洞path加入孔洞属性里
shapeReal.holes.push(path,path1)
//创建一个shape填充几何体
const ShapeGeometry=new THREE.ShapeGeometry(shapeReal)
//创建材质
const shapeMaterial1=new THREE.MeshLambertMaterial({
    color:0x00f111
})
//创建网格模型
const shapeMesh1=new THREE.Mesh(ShapeGeometry,shapeMaterial1)
scene.add(shapeMesh1)
//创建几何体
const BUFF=new THREE.BufferGeometry()
BUFF.setFromPoints([new THREE.Vector3(100,0,-200),new THREE.Vector3(-100,0,-200),new THREE.Vector3(100,50,-200)])
const color=new Float32Array([
    0.1,0.1,0.1,
    0,0.5,0.5,
    1,1,1
])
BUFF.attributes.color=new THREE.BufferAttribute(color,3)
const materialbuff=new THREE.MeshBasicMaterial({
    side:THREE.DoubleSide,
    vertexColors:true
})
const meshbuff=new THREE.Mesh(BUFF,materialbuff)
scene.add(meshbuff)
//加载gltf
const LOAD=new GLTFLoader()
LOAD.load('../../public/初级篇学习资源/建筑模型.gltf',function(gltf){
    gltf.scene.traverse((obj)=>{
        if(obj.isMesh){
            const edges = new THREE.EdgesGeometry( obj.geometry );
            const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xfff00f } ) );
             obj.add( line );
             obj.position.x-=100
        }
    })
scene.add(gltf.scene)
})
//创建一个三维样条曲线
const curveYang = new THREE.CatmullRomCurve3( [
	new THREE.Vector3( -500, 0, 100 ),
	new THREE.Vector3( -400, 50, 500 ),
	new THREE.Vector3( 500, 50, 500 ),
	
] );
const pointsYang = curveYang.getSpacedPoints( 50 );
const geometryYang = new THREE.BufferGeometry().setFromPoints( pointsYang );
//创建一个数组储存颜色
const ColorArray=[]
//顶点数量
// console.log(geometryYang.attributes.position.count);
const count=geometryYang.attributes.position.count;
//遍历我们生成的点
for(let i=0;i<count;i++){
    //点在所有点钟所处的位次
    const percent=i/count;
    ColorArray.push(1-percent,percent,0)
}
const Array=new Float32Array(ColorArray)
geometryYang.attributes.color=new THREE.BufferAttribute(Array,3)
const materialYang = new THREE.LineBasicMaterial( {
    vertexColors:true//开启顶点颜色识别
} );
//创建一个几何体并加入场景
const curveObjectYang = new THREE.Line( geometryYang, materialYang );
scene.add(curveObjectYang)
//创建一个样条曲线
const curveYang1 = new THREE.CatmullRomCurve3( [
	new THREE.Vector3( -500, 0, 100 ),
	new THREE.Vector3( -400, 100, 500 ),
	new THREE.Vector3( -500, 100, 500 ),
] );
const point=curveYang1.getPoints(20)
//创建几何体
const geometryb=new THREE.BufferGeometry().setFromPoints(point)
//获得几何体顶点的数量
const counts=geometryb.attributes.position.count;
//创建一个红色
const red=new THREE.Color(1,0,0)
//创建一个蓝色
const blue=new THREE.Color(0,0,1)
//创建数组接收颜色
const color1=[]
//遍历几何体顶点
for(let i=0;i<counts;i++){
    const percent=i/counts;//获取几何体顶点的位次位置
    const c=red.clone().lerp(blue,percent)
    console.log(c);
   color1.push(c.r,c.g,c.b)

}
const ColorArray1=new Float32Array(color1)
geometryb.attributes.color=new THREE.BufferAttribute(ColorArray1,3)
//创建一个几何体并加入场景
const curveObjectYang1 = new THREE.Line( geometryb, materialYang );
scene.add(curveObjectYang1)
//加载外部模型
const GLTFLoader1=new GLTFLoader()
GLTFLoader1.load('../../public/初级篇学习资源/地形.glb',(gltf)=>{
    console.log(gltf.scene.children[0]);
    const terrian=gltf.scene.children[0]
    terrian.position.x-=700
    //获得地形GLTF的顶点数
    const count=terrian.geometry.attributes.position.count
    // console.log(count);
    //创建一个数组储存顶点Y坐标
    const Yarr=[]
    //对顶点进行遍历
    for(let i=0;i<count;i++){
    //拿到y坐标
    const y= terrian.geometry.attributes.position.getY(i)
    //将模型的Y坐标翻倍
    terrian.geometry.attributes.position.setY(i,y*2)
    Yarr.push(y*2)
    }
    //进行一个排序
    Yarr.sort();
   //最大Y高度差给算出来
    const max=Yarr[count-1]-Yarr[0]
    // console.log(max);
    //准备三个颜色
    const red=new THREE.Color(1,0,0)
    const green=new THREE.Color(0,1,0)
    const blue=new THREE.Color(0,0,1)
    //创建一个数组存色
    const CARRAY=[]
    //再次对顶点进行遍历
     for(let i=0;i<count;i++){
    //拿到y坐标
    const y= terrian.geometry.attributes.position.getY(i)
    //Y坐标相对于最大高差的比例
    const bi=y/max
    // console.log(bi);
    //创建一个变量储存颜色
    let C=null

    //对比例进行判断
    if(bi<=0.5){
    C=blue.clone().lerp(green,bi*2)
    }
   else{
     C=red.clone().lerp(green,(1-bi)*2)
    }
     CARRAY.push(C.r,C.g,C.b)
    }
    const Arr=new Float32Array(CARRAY)
    //赋值给顶点颜色
    terrian.geometry.attributes.color=new THREE.BufferAttribute(Arr,3)
    //改一下材质
    terrian.material=new THREE.MeshLambertMaterial({
        vertexColors:true
    })
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
animation()
renderer.render(scene,camera);
//创建相机轨道控制工具。
const controls = new OrbitControls(camera, renderer.domElement);
// //dom元素噶变后执行事件监听
controls.addEventListener('change',()=>{
console.log(camera.position);
console.log(controls.target);
})
renderer.setClearAlpha(1.)
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

</style>