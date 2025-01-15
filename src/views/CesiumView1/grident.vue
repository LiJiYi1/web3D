<template>
  <div id="main">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue';
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiZDBiOWI1Ni0yN2NlLTRjNTYtYTg5Mi01N2VlN2M5MWRhMTMiLCJpZCI6MjA0NzMzLCJpYXQiOjE3MTE1MTQ5ODZ9.EmuPT8se7QBJvBIdvA9r2Y_OEa0CabzpU0XqRMkmiWw'
onMounted(()=>{
const Viewer=initCesium()
//entites的add方法参数可以是几何体，也可以是几何体的配置项
Viewer.entities.add({
name:'entities',
id:'entities',
position:new Cesium.Cartesian3.fromDegrees(114.25,39.95,300.0),
wall:{
    positions:[new Cesium.Cartesian3.fromDegrees(114.0,39.9,5000),new Cesium.Cartesian3.fromDegrees(114.0,40,5000),new Cesium.Cartesian3.fromDegrees(114.5,40,5000),new Cesium.Cartesian3.fromDegrees(114.5,39.9,5000),new Cesium.Cartesian3.fromDegrees(114.0,39.9,5000)],
    material:new Cesium.ImageMaterialProperty({
        image:getColorRamp("slope"),
        transparent:true
    }),
    outline:true,
    outlineColor:new Cesium.Color(1.0,1.0,0.0,1.0),
    outlineWidth:100.0,
   
}
})
const s=Viewer.scene.pick(new Cesium.Cartesian2(100.0, 200.0))
console.log(s);

//Viewer.scene.shadows=true
//Viewer的视角切到entities那
Viewer.zoomTo(Viewer.entities)
})
const elevationRamp = [0.0, 0.045, 0.1, 0.15, 0.37, 0.54, 1.0];
const slopeRamp = [0.0, 0.29, 0.5, Math.sqrt(2) / 2, 0.87, 0.91, 1.0];
const aspectRamp = [0.0, 0.2, 0.4, 0.6, 0.8, 0.9, 1.0];
function getColorRamp(selectedShading) {
  const ramp = document.createElement("canvas");
  ramp.width = 100;
  ramp.height = 100;
  const ctx = ramp.getContext("2d");

  let values;
  if (selectedShading === "elevation") {
    values = elevationRamp;
  } else if (selectedShading === "slope") {
    values = slopeRamp;
  } else if (selectedShading === "aspect") {
    values = aspectRamp;
  }

  const grd = ctx.createLinearGradient(0, 0, 1, 100);
  grd.addColorStop(values[0], "#000000"); //black
  grd.addColorStop(values[1], "#2747E0"); //blue
  grd.addColorStop(values[2], "#D33B7D"); //pink
  grd.addColorStop(values[3], "#D33038"); //red
  grd.addColorStop(values[4], "#FF9742"); //orange
  grd.addColorStop(values[5], "#ffd700"); //yellow
  grd.addColorStop(values[6], "#ffffff"); //white

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0,100, 100);

  return ramp;
}
function initCesium(){
const viewer=new Cesium.Viewer('cesiumContainer',{
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
return viewer
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
</style>