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
//直接创建一个立方体,六个面用同一个贴图。
viewer.entities.add({
    id:'box1',
    position:new Cesium.Cartesian3.fromDegrees(120,38.7,200000),
    box:{
        dimensions:new Cesium.Cartesian3(100000,100000,100000),
        material:new Cesium.ImageMaterialProperty({
            image:'/../CesiumBasicSource/kebi.jpg'
        })
    }
})
//用六个平面拼一个立方体,每个面用不同的贴图
viewer.entities.add({
    id:'plane1',
    position:new Cesium.Cartesian3.fromDegrees(119.2,37.4,120000),
    plane:{
        plane:new Cesium.Plane(Cesium.Cartesian3.UNIT_X, 0.0),
        dimensions:new Cesium.Cartesian2(100000,100000),
        material:new Cesium.ImageMaterialProperty({
            image:'/../CesiumBasicSource/kebi.jpg'
        })
    }
})
viewer.entities.add({
    id:'plane2',
    position:new Cesium.Cartesian3.fromDegrees(119.77,37.84,120000),
    orientation:Cesium.Quaternion.fromHeadingPitchRoll(new Cesium.HeadingPitchRoll(1,0.90, 0)),
    plane:{
        plane:new Cesium.Plane(Cesium.Cartesian3.UNIT_X, 0.0),
        dimensions:new Cesium.Cartesian2(100000,100000),
        material:new Cesium.ImageMaterialProperty({
            image:'/../CesiumBasicSource/earthspec1k.jpg'
        })
    }
})
viewer.entities.add({
    id:'plane3',
    position:new Cesium.Cartesian3.fromDegrees(119.77,37.4,170000),
    orientation:Cesium.Quaternion.fromHeadingPitchRoll(new Cesium.HeadingPitchRoll(1.2,-0.7, -0.1)),
    plane:{
        plane:new Cesium.Plane(Cesium.Cartesian3.UNIT_X, 0.0),
        dimensions:new Cesium.Cartesian2(100000,100000),
        material:new Cesium.ImageMaterialProperty({
            image:'/../几何计算资源/乒乓球.png'
        })
    }
})
//创建一个圆柱
viewer.entities.add({
    id:'cylinder',
    position:new Cesium.Cartesian3.fromDegrees(119.77,36.4,120000),
    orientation:Cesium.Quaternion.fromHeadingPitchRoll(new Cesium.HeadingPitchRoll(1,0.90, 0)),
    cylinder:{
       length:100000,
        topRadius:100000,
        bottomRadius:100000,
        material:new Cesium.ImageMaterialProperty({
            image:'/../CesiumBasicSource/earthspec1k.jpg'
        })
    }
})


viewer.camera.setView({
    destination:Cesium.Cartesian3.fromDegrees(118,38,800000),
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