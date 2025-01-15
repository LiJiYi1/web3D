<template>
  <div id="main">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue';
let viewer;
let handler;
alert('点击物体改变物体颜色')
onMounted(()=>{
initCesium()
//创建一些物体用于被选中
//经纬度
const longitude=120.0
const latitude=37.0
for(let i=0;i<10;i++){
const lon=longitude+0.1*i
for(let j=0;j<10;j++){
let id=i+''+j
const lat=latitude+0.1*j
//在此创建实体
viewer.entities.add({
    id:'box'+id,
    position:new Cesium.Cartesian3.fromDegrees(lon,lat,20),
    box:{
       dimensions:new Cesium.Cartesian3(2000,2000,30000),
       material:Cesium.Color.WHITE
    }
})
}
}
handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction(function (movement) {
//获得点击的屏幕位置
const pos=movement.position
//通过camera的getPcikRay方法根据pos创建射线
const ray=viewer.camera.getPickRay(pos)
console.log(ray);
//再配合scene的drillPick方法拿到射线拾取的第一个物体
const intersect=viewer.scene.drillPick(pos)
console.log(intersect);

if(intersect[0]){
console.log(intersect[0].id.box.material);
intersect[0].id.box.material=Cesium.Color.RED
}
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);



viewer.camera.setView({
    destination:Cesium.Cartesian3.fromDegrees(120,37.5,200000),
    orientation:{
        heading:Cesium.Math.toRadians(90),
        pitch:Cesium.Math.toRadians(-80),
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