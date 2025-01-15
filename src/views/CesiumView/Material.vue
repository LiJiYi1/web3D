<template>
  <div id="main">
    <div id="cesiumContainer"></div>
    <div id="Color" @click="colorMaterial()">ColorMaterialProperty颜色材质</div>
    <div id="Composite" @click="GridMaterial()">GridMaterialProperty网格材质</div>
    <div id="Image" @click="ImageMaterial()">ImageMaterialProperty图片材质</div>
    <div id="Stripe" @click="StripeMaterial()">StripeMaterialProperty条纹材质</div>
    <div id="Checkerboard" @click="CheckerboardMaterial()">CheckerboardMaterialProperty棋盘材质</div>
    <div id="PolylineGlow" @click="PolylineGlowMaterial()">PolylineGlowMaterialProperty粗线发光材质</div>
    <div id="PolylineOutline" @click="PolylineOutlineMaterial()">PolylineOutlineMaterialProperty粗线边框材质</div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted,ref} from 'vue';

let viewer;
let material=new Cesium.ColorMaterialProperty(Cesium.Color.RED.withAlpha(0.5))
const box=new Cesium.BoxGraphics({
        dimensions:new Cesium.Cartesian3.fromArray([10000,10000,1000]),
        material:material
})
//改变材质
function colorMaterial(){
    console.log(viewer.entities.getById('box')._box);
    viewer.entities.getById('box')._box.material=new Cesium.ColorMaterialProperty(Cesium.Color.BLUE.withAlpha(0.5))
    viewer.scene.requestRender()
}
function GridMaterial(){
    console.log(viewer.entities.getById('box')._box);
    viewer.entities.getById('box')._box.material=new Cesium.GridMaterialProperty()
    viewer.scene.requestRender()
}
function ImageMaterial(){
    console.log(viewer.entities.getById('box')._box);
    viewer.entities.getById('box')._box.material=new Cesium.ImageMaterialProperty({
        image:'../../../public/前端页面资源/image2.jpg'
    })
    viewer.scene.requestRender()
}
function StripeMaterial(){
    console.log(viewer.entities.getById('box')._box);
    viewer.entities.getById('box')._box.material=new Cesium.StripeMaterialProperty({
    evenColor: Cesium.Color.RED,
    oddColor:Cesium.Color.BLUE,
    repeat:10,
    offset:20000
    })
    viewer.scene.requestRender()
}
function CheckerboardMaterial(){
    console.log(viewer.entities.getById('box')._box);
    viewer.entities.getById('box')._box.material=new Cesium.CheckerboardMaterialProperty({
    evenColor: Cesium.Color.RED,
    oddColor:Cesium.Color.GREEN,
    repeat:new  Cesium.Cartesian2(4.0, 4.0), 
    })
    viewer.scene.requestRender()
}
function PolylineGlowMaterial(){
    console.log(viewer.entities.getById('PolyLine')._polyline);
    viewer.entities.getById('PolyLine')._polyline.material=new Cesium.PolylineGlowMaterialProperty({
color:Cesium.Color.RED,
glowPower:0.7,

    })
    viewer.scene.requestRender()
}
 function PolylineOutlineMaterial(){
   console.log(viewer.entities.getById('PolyLine')._polyline);
    viewer.entities.getById('PolyLine')._polyline.material=new Cesium.PolylineOutlineMaterialProperty({
color:Cesium.Color.RED,
outlineColor:Cesium.Color.GREEN,
outlineWidth:6,

    })
    viewer.scene.requestRender()
 }
onMounted(()=>{
initCesium()
viewer.entities.add({
    id:'box',
    name:'box',
    position:new Cesium.Cartesian3.fromDegrees(119,34,0),
    box:box
 })
viewer.entities.add({
    id:'PolyLine',
    name:'PolyLine',
    position:new Cesium.Cartesian3.fromDegrees(119,34,1000),
    polyline:{
        positions:Cesium.Cartesian3.fromDegreesArray([118.9,33.95,118.9,34.06]),
        width:10
    }
 })
 viewer.scene.requestRender()
viewer.zoomTo(viewer.entities)
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
#Color{
    position: absolute;
    left: 2%;
    top: 2%;
    width:180px;
    text-align: center;
    background-color: #bc1414;
    color: aliceblue;
    cursor: pointer;
    opacity: 0.8;
}
#Color:hover{
    background-color: aqua;
    color: #bc1414;
}
#Composite{
    position: absolute;
    left: 2%;
    top: 10%;
    width:180px;
    text-align: center;
    background-color: #bc1414;
    color: aliceblue;
    cursor: pointer;
    opacity: 0.8;
}
#Composite:hover{
    background-color: aqua;
    color: #bc1414;
}
#Image{
    position: absolute;
    left: 2%;
    top: 20%;
    width:180px;
    text-align: center;
    background-color: #bc1414;
    color: aliceblue;
    cursor: pointer;
    opacity: 0.8;
}
#Image:hover{
    background-color: aqua;
    color: #bc1414;
}
#Stripe{
    position: absolute;
    left: 2%;
    top: 30%;
    width:180px;
    text-align: center;
    background-color: #bc1414;
    color: aliceblue;
    cursor: pointer;
    opacity: 0.8;
}
#Stripe:hover{
    background-color: aqua;
    color: #bc1414;
}
#Checkerboard{
    position: absolute;
    left: 2%;
    top: 40%;
    width:180px;
    text-align: center;
    background-color: #bc1414;
    color: aliceblue;
    cursor: pointer;
    opacity: 0.8;
}
#Checkerboard:hover{
    background-color: aqua;
    color: #bc1414;
}
#PolylineGlow{
     position: absolute;
    left: 2%;
    top: 50%;
    width:180px;
    text-align: center;
    background-color: #1444bc;
    color: aliceblue;
    cursor: pointer;
    opacity: 0.8; 
}
#PolylineGlow:hover{
    background-color: rgb(9, 255, 0);
    color: #bc1414;
}
#PolylineOutline{
    position: absolute;
    left: 2%;
    top: 60%;
    width:180px;
    text-align: center;
    background-color: #1444bc;
    color: aliceblue;
    cursor: pointer;
    opacity: 0.8; 
}
#PolylineOutline:hover{
      background-color: rgb(9, 255, 0);
    color: #bc1414;
}
#main{
    width:100%;
    height:99%;
}
#cesiumContainer{
    width: 100%;
    height: 100%;
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