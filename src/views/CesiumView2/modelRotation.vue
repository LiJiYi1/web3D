<template>
  <div id="main">
    <div id="cesiumContainer"></div>
    <div id='rotateX' @click="EntityX()">Entity绕X轴旋转</div>
    <div id='rotateY' @click="EntityY()">Entity绕Y轴旋转</div>
    <div id='rotateZ' @click="EntityY()">Entity绕Z轴旋转</div>
    <div id='rotateS' @click="EntityS()">Entity单个部件的旋转</div>
    <div id='rotateX1' @click="primitivesX()">Primitive绕X轴旋转</div>
    <div id='rotateY1' @click="primitivesY()">Primitive绕Y轴旋转</div>
    <div id='rotateZ1' @click="primitivesZ()">Primitive绕Z轴旋转</div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue';
let angleX=0;
let angleY=0;
let angleZ=0;
let angleS=0;
function EntityX(){
angleX+=0.01
const model=viewer.entities.getById('model')
//console.log(model.nodeTransformations);
model.orientation._value.x=angleX
}
function EntityY(){
angleY+=0.01
const model=viewer.entities.getById('model')
model.orientation._value.y=angleY
}
function EntityZ(){
angleZ+=0.01
const model=viewer.entities.getById('model')
model.orientation._value.z=angleZ
}

function EntityS(){
angleS+=0.01
const model=viewer.entities.getById('model')
const s='_'+model._model.nodeTransformations._propertyNames[0]
model._model.nodeTransformations[s]=new Cesium.NodeTransformationProperty({
  translation:new Cesium.Cartesian3(100,2,0),
  rotation:new Cesium.Quaternion(angleS, 0, 0, 1)
})
}
let anglex=0.0;
let angley=0.0;
let anglez=0.0;
function primitivesX(){
anglex+=0.01;
//获得原来的模型矩阵
let modelMatrix=model.modelMatrix
//获得三维旋转矩阵
let Matrix=Cesium.Matrix3.fromRotationX(anglex) 
//把旋转矩阵乘到模型矩阵上
model.modelMatrix=Cesium.Matrix4.multiplyByMatrix3(modelMatrix, Matrix,modelMatrix)
}
function primitivesY(){
angley+=0.01;
//获得原来的模型矩阵
let modelMatrix=model.modelMatrix
//获得三维旋转矩阵
let Matrix=Cesium.Matrix3.fromRotationY(angley) 
//把旋转矩阵乘到模型矩阵上
model.modelMatrix=Cesium.Matrix4.multiplyByMatrix3(modelMatrix, Matrix,modelMatrix)
}
function primitivesZ(){
anglez+=0.01;
//获得原来的模型矩阵
let modelMatrix=model.modelMatrix
//获得三维旋转矩阵
let Matrix=Cesium.Matrix3.fromRotationZ(anglez) 
//把旋转矩阵乘到模型矩阵上
model.modelMatrix=Cesium.Matrix4.multiplyByMatrix3(modelMatrix, Matrix,modelMatrix)

}


let viewer;
let model;
onMounted(async()=>{
initCesium()
//用entity创建模型
viewer.entities.add({
id:'model',
orientation:Cesium.Quaternion.fromHeadingPitchRoll(new Cesium.HeadingPitchRoll(110,101,100.7)),
position:Cesium.Cartesian3.fromDegrees(120,39.9,3),
model:{
uri:'../../../CesiumBasicSource/轿车.glb',
scale:0.1,
nodeTransformations:{'后备箱':new Cesium.NodeTransformationProperty({
  translation:new Cesium.Cartesian3(100,2,0)
})}
}
})
//用primitive创建模型

const position = Cesium.Cartesian3.fromDegrees(
 120,39.8996,3
);
const headingPositionRoll = new Cesium.HeadingPitchRoll();
const fixedFrameTransform = Cesium.Transforms.localFrameToFixedFrameGenerator(
  "north",
  "west"
);
let animations;
model = await Cesium.Model.fromGltfAsync({
   url: "../../../CesiumBasicSource/无人机居中.glb",
     modelMatrix: Cesium.Transforms.headingPitchRollToFixedFrame(
     position,
     headingPositionRoll,
     Cesium.Ellipsoid.WGS84,
  
     fixedFrameTransform,

   ),
   gltfCallback:(gltf)=>{
    animations = gltf.animations
    //console.log(animations);
    
    
     },
   minimumPixelSize: 128,
   //clampAnimations:false
 });
 model.readyEvent.addEventListener(() => {
   model.activeAnimations.add({
     index: animations.length - 1,
     loop: Cesium.ModelAnimationLoop.REPEAT,
     multiplier: 0.5,
   });})
 viewer.scene.primitives.add(model);
viewer.camera.setView({
  destination:Cesium.Cartesian3.fromDegrees( 120,39.9,200),
  orientation:{
heading:Cesium.Math.toRadians(-30),
pitch:Cesium.Math.toRadians(-100),
roll:Cesium.Math.toRadians(0),
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
    shouldAnimate:true
})
}
</script>

<style scoped>
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
#rotateX{
  position:absolute;
  left:0px;
  top:10px;
  width:110px;
  height: 30px;
  background-color: #fff;
  cursor: pointer;
}
#rotateX:hover{
  position:absolute;
  left:0px;
  top:10px;
  width:110px;
  height: 30px;
  background-color: #c41919;
  cursor: pointer;
}
#rotateY{
  position:absolute;
  left:120px;
  top:10px;
  width:110px;
  height: 30px;
  background-color: #fff;
  cursor: pointer;
}
#rotateY:hover{
  position:absolute;
  left:120px;
  top:10px;
  width:110px;
  height: 30px;
  background-color: #c41919;
  cursor: pointer;
}
#rotateZ{
  position:absolute;
  left:240px;
  top:10px;
  width:110px;
  height: 30px;
  background-color: #fff;
}
#rotateZ:hover{
  position:absolute;
  left:240px;
  top:10px;
  width:110px;
  height: 30px;
  background-color:#c41919;
}


#rotateX1{
  position:absolute;
  left:0px;
  top:80px;
  width:130px;
  height: 30px;
  background-color: #fff;
  cursor: pointer;
}
#rotateX1:hover{
  position:absolute;
  left:0px;
  top:80px;
  width:130px;
  height: 30px;
  background-color: #75d61f;
  cursor: pointer;
}
#rotateY1{
  position:absolute;
  left:140px;
  top:80px;
  width:130px;
  height: 30px;
  background-color: #fff;
  cursor: pointer;
}
#rotateY1:hover{
  position:absolute;
  left:140px;
  top:80px;
  width:130px;
  height: 30px;
  background-color:  #75d61f;
  cursor: pointer;
}
#rotateZ1{
  position:absolute;
  left:280px;
  top:80px;
  width:130px;
  height: 30px;
  background-color: #fff;
  cursor: pointer;
}
#rotateZ1:hover{
  position:absolute;
  left:280px;
  top:80px;
  width:130px;
  height: 30px;
  background-color:  #75d61f;
  cursor: pointer;
}
#rotateS{
  position:absolute;
  left:400px;
  top:10px;
  width:150px;
  height: 30px;
  background-color:#c41919;
}
#rotateS:hover{
  position:absolute;
  left:400px;
  top:10px;
  width:150px;
  height: 30px;
  background-color:#191ca6;
  cursor: crosshair;
}
</style>