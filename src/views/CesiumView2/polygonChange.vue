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
 // 设置时间
const start = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16));
const stop = Cesium.JulianDate.addSeconds(start,12,new Cesium.JulianDate());
viewer.clock.startTime = start.clone();
viewer.clock.stopTime = stop.clone();
viewer.clock.currentTime = start.clone();
viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; 
viewer.clock.multiplier = 1;
viewer.clock.shouldAnimate = true;
//viewer.timeline.zoomTo(start, stop);
// 创建插值
function createDynamicPt(lonlat1,lonlat2){
    const pos1 = Cesium.Cartesian3.fromDegrees(lonlat1[0],lonlat1[1]);
    const pos2 = Cesium.Cartesian3.fromDegrees(lonlat2[0],lonlat2[1]);
    const position = new Cesium.SampledPositionProperty();
    position.addSample(start, pos1);
    position.addSample(stop, pos2);
    return position;
}
// 创建三角形的三个点
let ptArr = [];
ptArr.push(createDynamicPt([-115.0,37.0],[-115.0,40.0]));
ptArr.push(createDynamicPt([-115.0,32.0],[-118.0,32.0]));
ptArr.push(createDynamicPt([-107.0,33.0],[-107.0,30.0]));
// 构建形状
const redPolygon = viewer.entities.add({
    name: "Red polygon on surface",
    polygon: {
        // hierarchy: Cesium.Cartesian3.fromDegreesArray([
        // -115.0,37.0,
        // -115.0,32.0,
        // -107.0,33.0,
        // ]),
        hierarchy:new Cesium.CallbackProperty(function (time, result) {
            let arr = [];
            for(let i=0;i<ptArr.length;++i)
                arr.push(ptArr[i].getValue(time, new Cesium.Cartesian3()));

            // 重点
            return new Cesium.PolygonHierarchy(arr, []);
        }, false),

        material: Cesium.Color.RED,
    },
});
viewer.zoomTo(viewer.entities);
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