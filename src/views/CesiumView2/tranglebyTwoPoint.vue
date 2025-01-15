<template>
  <div id="main">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue';
let viewer;
onMounted(()=>{
initCesium()
//绘制线条
viewer.entities.add({
  id:'line',
  polyline:{
    positions:Cesium.Cartesian3.fromDegreesArray([120.88,37,119,38,122,38.9,122,39]),
    material:Cesium.Color.RED
  }
})
//垂足点位置
const lon=122
const lat=38.9
//顶点位置
const lon1=122
const lat1=39
//根据顶点位置和垂足点位置计算一个矢量方向
const pos1=new Cesium.Cartesian3.fromDegrees(lon,lat,0)
const pos2=new Cesium.Cartesian3.fromDegrees(lon1,lat1,0)
const dir1=new Cesium.Cartesian3()
Cesium.Cartesian3.subtract(pos2,pos1,dir1)
//归一化
Cesium.Cartesian3.normalize(dir1,dir1)
//垂足点本身的卡笛尔3坐标也是一个矢量方向
const dir2=new Cesium.Cartesian3.fromDegrees(lon,lat,0)
//归一化
Cesium.Cartesian3.normalize(dir2,dir2)
//两个方向矢量叉乘获得,三角形另外两个点的方向
const dir3=new Cesium.Cartesian3()
Cesium.Cartesian3.cross(dir1,dir2,dir3)
const dir4=new Cesium.Cartesian3()
Cesium.Cartesian3.cross(dir2,dir1,dir4)
//归一化
Cesium.Cartesian3.normalize(dir3,dir3)
Cesium.Cartesian3.normalize(dir4,dir4)
//利用射线找到这两个点
const ray1=new Cesium.Ray(pos1, dir3)
const ray2=new Cesium.Ray(pos1, dir4)
const pos3=new Cesium.Cartesian3()
const pos4=new Cesium.Cartesian3()
Cesium.Ray.getPoint(ray1, 3000, pos3)
Cesium.Ray.getPoint(ray2, 3000, pos4)
console.log(pos3);
//根据三个顶点位置通过polygon绘制三角形
viewer.entities.add({
  id:"trangle",
  polygon:{
   hierarchy:[pos2,pos3,pos4],
   material:Cesium.Color.BLUE
  }
})
viewer.camera.setView({
    destination:Cesium.Cartesian3.fromDegrees(120.88,37,500000),
    orientation:{
        heading:Cesium.Math.toRadians(90),
        pitch:Cesium.Math.toRadians(-95),
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