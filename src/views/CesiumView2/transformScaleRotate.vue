<template>
  <div id="main">
    <div id="cesiumContainer"></div>
    <div id="translateX" @click="translatex()">平移X</div>
    <div id="translateY" @click="translatey()">平移Y</div>
    <div id="translateZ" @click="translatez()">平移Z</div>
    <div id="scale"  @click="scale()">缩小</div>
    <div id="Scale"  @click="scale1()">放大</div>
    <div id="rotateX"  @click="rotateX()">X轴旋转</div>
    <div id="rotateY"  @click="rotateY()">Y轴旋转</div>
    <div id="rotateZ"  @click="rotateZ()">Z轴旋转</div>
  </div>
</template>
<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue';
let viewer;
let translateX=0;
let translateY=0;
let translateZ=0;
let Scale=1;
let Scale2=1;
let angleX=0;
let angleY=0;
let angleZ=0;
const box = new Cesium.BoxGeometry({
  vertexFormat : Cesium.VertexFormat.POSITION_ONLY,
  maximum : new Cesium.Cartesian3(250.0, 250.0, 250.0),
  minimum : new Cesium.Cartesian3(-250.0, -250.0, -250.0)
});
const geometry = Cesium.BoxGeometry.createGeometry(box);
const boxInstance = new Cesium.GeometryInstance({
  geometry :geometry,
  modelMatrix : Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
    Cesium.Cartesian3.fromDegrees(121.0, 37)), new Cesium.Cartesian3(0.0, 0.0, 0.0), new Cesium.Matrix4()),
  id : 'box',
  attributes : {
    color : Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.LIGHTSEAGREEN)
  }
});
const primitive=new Cesium.Primitive({
  geometryInstances : boxInstance,
  appearance : new Cesium.PerInstanceColorAppearance({
    flat:true
  }),
  asynchronous:false
})
function translatex(){
translateX+=1
//获得primitive的模型矩阵
const m=primitive.modelMatrix
//获得平移距离矩阵X,Y,Z
const translation=new Cesium.Cartesian3(translateX,0,0)
Cesium.Matrix4.multiplyByTranslation(m, translation, m)
primitive.modelMatrix=m

}
function translatey(){
translateY+=1
//获得primitive的模型矩阵
const m=primitive.modelMatrix
//获得平移距离矩阵X,Y,Z
const translation=new Cesium.Cartesian3(translateX,translateY,translateY)
Cesium.Matrix4.multiplyByTranslation(m, translation, m)
primitive.modelMatrix=m

}
function translatez(){
translateZ+=1
//获得primitive的模型矩阵
const m=primitive.modelMatrix
//获得平移距离矩阵X,Y,Z
const translation=new Cesium.Cartesian3(translateX,translateY,translateZ)
Cesium.Matrix4.multiplyByTranslation(m, translation, m)
primitive.modelMatrix=m

}
function scale(){
//获取这个几何体的中心
const center=primitive._boundingSpheres[0].center
Scale-=0.01
console.log(Scale);
//获得primitive的模型矩阵
const m=primitive.modelMatrix
Cesium.Matrix4.fromUniformScale(2.0);
//获得缩放矩阵
const s = Cesium.Matrix4.fromScale(new Cesium.Cartesian3(Scale,Scale,Scale));
Cesium.Matrix4.multiply(m,s,m)
//缩放完后他默认在地球球心,要把他从球心搞回来
//每次缩放包围盒的中心都会变
const spehe=new Cesium.BoundingSphere()
Cesium.BoundingSphere.transform(primitive._boundingSpheres[0], m, spehe)
const backCatesion3=new Cesium.Cartesian3()
Cesium.Cartesian3.subtract(center, spehe.center,backCatesion3)
//获得一个平移矩阵
const back=new Cesium.Matrix4()
Cesium.Matrix4.fromTranslation(backCatesion3, back)
Cesium.Matrix4.multiply(back, m, m)
primitive.modelMatrix=m
}
function scale1(){
//获取这个几何体的中心
const center=primitive._boundingSpheres[0].center
Scale2+=0.1
//获得primitive的模型矩阵
const m=primitive.modelMatrix
Cesium.Matrix4.fromUniformScale(2.0);
//获得缩放矩阵
const s = Cesium.Matrix4.fromScale(new Cesium.Cartesian3(Scale2,Scale2,Scale2));
Cesium.Matrix4.multiply(m,s,m)
//缩放完后他默认在地球球心,要把他从球心搞回来
//每次缩放包围盒的中心都会变
const spehe=new Cesium.BoundingSphere()
Cesium.BoundingSphere.transform(primitive._boundingSpheres[0], m, spehe)

const backCatesion3=new Cesium.Cartesian3()
Cesium.Cartesian3.subtract(center, spehe.center,backCatesion3)

//获得一个平移矩阵
const back=new Cesium.Matrix4()
Cesium.Matrix4.fromTranslation(backCatesion3, back)
Cesium.Matrix4.multiply(back, m, m)
primitive.modelMatrix=m
}
function rotateX(){
angleX+=1
//获得primitive的模型矩阵
const m=primitive.modelMatrix
//获取这个几何体的中心
const center=primitive._boundingSpheres[0].center
//先把几何体移到球心再旋转
const toCenter=new Cesium.Matrix4()
Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(-center.x,-center.y,-center.z),toCenter)
Cesium.Matrix4.multiply(m, toCenter, m)
const rotateMatrix=Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(angleX))
const rotation=Cesium.Matrix4.fromRotation(rotateMatrix)
Cesium.Matrix4.multiply(m, rotation, m)
//旋转之后的中心并不在球心,获得此时包围盒中心位置
const spehere=new Cesium.BoundingSphere()
Cesium.BoundingSphere.transform(primitive._boundingSpheres[0], m, spehere)
//把包围盒的中心再移回球心
console.log(spehere.center,-spehere.center.x,-spehere.center.y,-spehere.center.z);
const toCenter1=new Cesium.Matrix4()
Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(-spehere.center.x,-spehere.center.y,-spehere.center.z),toCenter1)
Cesium.Matrix4.multiply(toCenter1,m , m)
const spehere1=new Cesium.BoundingSphere()
Cesium.BoundingSphere.transform(primitive._boundingSpheres[0], m, spehere1)
//再移回球心
console.log(spehere1.center);
//移回原来的位置
 const back=new Cesium.Matrix4()
 Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(center.x,center.y,center.z),back)
 Cesium.Matrix4.multiply(back, m, m)
primitive.modelMatrix=m
}
function rotateY(){
angleY+=1
//获得primitive的模型矩阵
const m=primitive.modelMatrix
//获取这个几何体的中心
const center=primitive._boundingSpheres[0].center
//先把几何体移到球心再旋转
const toCenter=new Cesium.Matrix4()
Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(-center.x,-center.y,-center.z),toCenter)
Cesium.Matrix4.multiply(m, toCenter, m)
const rotateMatrix=Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(angleY))
const rotation=Cesium.Matrix4.fromRotation(rotateMatrix)
Cesium.Matrix4.multiply(m, rotation, m)
//旋转之后的中心并不在球心,获得此时包围盒中心位置
const spehere=new Cesium.BoundingSphere()
Cesium.BoundingSphere.transform(primitive._boundingSpheres[0], m, spehere)
//把包围盒的中心再移回球心
console.log(spehere.center,-spehere.center.x,-spehere.center.y,-spehere.center.z);
const toCenter1=new Cesium.Matrix4()
Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(-spehere.center.x,-spehere.center.y,-spehere.center.z),toCenter1)
Cesium.Matrix4.multiply(toCenter1,m , m)
const spehere1=new Cesium.BoundingSphere()
Cesium.BoundingSphere.transform(primitive._boundingSpheres[0], m, spehere1)
//再移回球心
console.log(spehere1.center);
//移回原来的位置
 const back=new Cesium.Matrix4()
 Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(center.x,center.y,center.z),back)
 Cesium.Matrix4.multiply(back, m, m)
primitive.modelMatrix=m
}
function rotateZ(){
angleZ+=1
//获得primitive的模型矩阵
const m=primitive.modelMatrix
//获取这个几何体的中心
const center=primitive._boundingSpheres[0].center
//先把几何体移到球心再旋转
const toCenter=new Cesium.Matrix4()
Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(-center.x,-center.y,-center.z),toCenter)
Cesium.Matrix4.multiply(m, toCenter, m)
const rotateMatrix=Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(angleZ))
const rotation=Cesium.Matrix4.fromRotation(rotateMatrix)
Cesium.Matrix4.multiply(m, rotation, m)
//旋转之后的中心并不在球心,获得此时包围盒中心位置
const spehere=new Cesium.BoundingSphere()
Cesium.BoundingSphere.transform(primitive._boundingSpheres[0], m, spehere)
//把包围盒的中心再移回球心
console.log(spehere.center,-spehere.center.x,-spehere.center.y,-spehere.center.z);
const toCenter1=new Cesium.Matrix4()
Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(-spehere.center.x,-spehere.center.y,-spehere.center.z),toCenter1)
Cesium.Matrix4.multiply(toCenter1,m , m)
const spehere1=new Cesium.BoundingSphere()
Cesium.BoundingSphere.transform(primitive._boundingSpheres[0], m, spehere1)
//再移回球心
console.log(spehere1.center);
//移回原来的位置
 const back=new Cesium.Matrix4()
 Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(center.x,center.y,center.z),back)
 Cesium.Matrix4.multiply(back, m, m)
primitive.modelMatrix=m
}
onMounted(()=>{
initCesium()
viewer.scene.primitives.add(primitive);
viewer.camera.setView({
    destination:Cesium.Cartesian3.fromDegrees(120.97,37,500),
    orientation:{
        heading:Cesium.Math.toRadians(90),
        pitch:Cesium.Math.toRadians(-10),
    }
})
})

function initCesium(){
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiZDBiOWI1Ni0yN2NlLTRjNTYtYTg5Mi01N2VlN2M5MWRhMTMiLCJpZCI6MjA0NzMzLCJpYXQiOjE3MTE1MTQ5ODZ9.EmuPT8se7QBJvBIdvA9r2Y_OEa0CabzpU0XqRMkmiWw'
viewer=new Cesium.Viewer('cesiumContainer',{
    animation:false,//动画控件
    baseLayerPicker:false,//基础图层选择器
    fullscreenButton:false,//全屏按钮
    vrButton:false,//vr按钮
    geocoder:false,//搜索框
    homeButton:false,//主页按钮
    infoBox:false,//infoBox按钮
    sceneModePicker:false,//2D,3D转换按钮
    timeline:false,//时间线
    navigationHelpButton:false,//帮助按钮
    navigationInstructionsInitiallyVisible:false,//不知道什么控件
    selectionIndicator:false,//不知道什么控件
 
})

}
</script>

<style scoped>
#translateX{
position: absolute;
font-size: 30px;
left: 0px;
top:0px;
background-color: #fff;
cursor: pointer;
}
#translateY{
position: absolute;
font-size: 30px;
left: 80px;
top:0px;
background-color: #fff;
cursor: pointer;
}
#translateZ{
position: absolute;
font-size: 30px;
left: 160px;
top:0px;
background-color: #fff;
cursor: pointer;
}
#scale{
position: absolute;
font-size: 30px;
left: 0px;
top:50px;
background-color: #fff;
cursor: pointer;
}
#Scale{
position: absolute;
font-size: 30px;
left: 100px;
top:50px;
background-color: #fff;
cursor: pointer;
}
#rotateX{
position: absolute;
font-size: 30px;
left: 0px;
top:100px;
background-color: #fff;
cursor: pointer;
}
#rotateY{
position: absolute;
font-size: 30px;
left: 120px;
top:100px;
background-color: #fff;
cursor: pointer;
}
#rotateZ{
position: absolute;
font-size: 30px;
left: 240px;
top:100px;
background-color: #fff;
cursor: pointer;
}
#translateY:hover{
position: absolute;
font-size: 30px;
left: 80px;
top:0px;
background-color: #ab1d1d;
cursor: pointer;
}
#translateZ:hover{
position: absolute;
font-size: 30px;
left: 160px;
top:0px;
background-color: #ab1d1d;
cursor: pointer;
}
#translateX:hover{
position: absolute;
font-size: 30px;
left: 0px;
top:0px;
background-color: #ab1d1d;
cursor: pointer;
}
#scale:hover{
position: absolute;
font-size: 30px;
left: 0px;
top:50px;
background-color:#ab1d1d;
cursor: pointer;
}
#Scale:hover{
position: absolute;
font-size: 30px;
left: 100px;
top:50px;
background-color:#ab1d1d;
cursor: pointer;
}
#rotateX:hover{
position: absolute;
font-size: 30px;
left: 0px;
top:100px;
background-color:#ab1d1d;
cursor: pointer;
}
#rotateY:hover{
position: absolute;
font-size: 30px;
left: 120px;
top:100px;
background-color: #ab1d1d;
cursor: pointer;
}
#rotateZ:hover{
position: absolute;
font-size: 30px;
left: 240px;
top:100px;
background-color: #ab1d1d;
cursor: pointer;
}
#main{
    width:100%;
    height: 100%;
}
#cesiumContainer{
    width: 98%;
    height: 98%;
}
      /* 不占据空间，无法点击 */
      .cesium-viewer-toolbar,             /* 右上角按钮组 */
      .cesium-viewer-animationContainer,  /* 左下角动画控件 */
      .cesium-viewer-timelineContainer,   /* 时间线 */
      .cesium-viewer-bottom               /* logo信息 */
      {
        display: none;
      }
      .cesium-viewer-fullscreenContainer  /* 全屏按钮 */
      { position: absolute; top: -999em;  }

</style>