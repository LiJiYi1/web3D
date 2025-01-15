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
//设置时间
const beforeStart = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16));
const start = Cesium.JulianDate.addSeconds(beforeStart,1,new Cesium.JulianDate());
let tmpStart = start.clone();
const stop = Cesium.JulianDate.addSeconds(start,120,new Cesium.JulianDate());

//设置时间
viewer.clock.startTime = start.clone();
viewer.clock.stopTime = stop.clone();
viewer.clock.currentTime = beforeStart.clone(); // 当前时间在开始时间之前
viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //Loop at the end
viewer.clock.multiplier = 1;
viewer.clock.shouldAnimate = true;

// 创建路径的数量,可以设置多条path
let range = 1;
//创建线对象
let lines = {};
//线的id
let key = "line";
//随机id
function getRandomID(){
    return key + Math.floor((Math.random()*range)+1);
}
//随机位置
function getRandomLocation(){
    let position = Cesium.Cartesian3.fromDegrees(112+Math.random(), 26+Math.random(), 10);
    viewer.entities.add({
        position: position,
        point: {
            pixelSize: 10,
            color: Cesium.Color.YELLOW,
            // disableDepthTestDistance: Number.POSITIVE_INFINITY,
        },
    });
    return position;
}
//创建我们我们想要数量的线
for(let i=1;i<=range;i++){
    lines[key + i] =  new Cesium.SampledPositionProperty();
    viewer.entities.add({
        position: lines[key + i],
        // name: "path",
        path: {
            material: new Cesium.PolylineGlowMaterialProperty({
                glowPower: 0.1,
                color: Cesium.Color.YELLOW,
            }),
            leadTime: 0,
            trailTime: 60,
            width: 10,
        },
    });
}
let gcount=1;
//随着时间改变位置数据实现动态效果
setInterval(() => {
    tmpStart = Cesium.JulianDate.addSeconds(tmpStart,1,new Cesium.JulianDate());
    for(let i=1;i<=range;i++){ 
        let id = key + i;
        let position = getRandomLocation();
        lines[id].addSample(tmpStart.clone(),position);
    }
},1000);

viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(112.42946289755982, 26.21271461780105, 1000000),
    duration:0,
});
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