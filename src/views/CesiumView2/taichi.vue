<template>
  <div id="main">
    <div id="cesiumContainer"></div>
    <div id="click">点击地面创建太极图案</div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue';
let viewer;
onMounted(()=>{
initCesium()
let i=0;
const handeler=new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
handeler.setInputAction((event)=>{
const pos=new Cesium.Cartesian3()
i+=1
viewer.camera.pickEllipsoid(event.position, viewer.scene.ellipsoid, pos)
console.log(pos);
let x=10;
let y=10;
let color=1;
let angle=0
if(pos.x){
viewer.entities.add({
    id:'ellipse'+i,
    position:pos,
    ellipse:{
       semiMajorAxis:new Cesium.CallbackProperty(function(){
        x+=10
        return x
       }, false),
       semiMinorAxis:new Cesium.CallbackProperty(function(){
           y+=10
            return y
       }, false),
       material:new Cesium.ImageMaterialProperty({
        image:'/../CesiumBasicSource/taiji.jpg',
        color:new Cesium.CallbackProperty(function(){
        if(color>=0)color-=0.01
        else{
            viewer.entities.removeById(this.id)
        }
        return Cesium.Color.WHITE.withAlpha(color)
       }, false),
       }),
       extrudedHeight:1,
       stRotation:new Cesium.CallbackProperty(function(){
           angle+=2
           return Cesium.Math.toRadians(angle)
       }, false),
    //    rotation:
    }
})}
}, Cesium.ScreenSpaceEventType.LEFT_CLICK)
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
#main{
    width:100%;
    height: 100%;
}
#cesiumContainer{
    width: 98%;
    height: 98%;
}
#click{
    position: absolute;
    left:0px;
    top:0px;
    background-color: red;
    cursor: pointer;
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