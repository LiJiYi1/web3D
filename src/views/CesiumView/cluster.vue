<template>
  <div id="main">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue';
onMounted(()=>{
const viewer=initCesium()

const dataSource=Cesium.GeoJsonDataSource.load('../../../CesiumBasicSource/province.json', {
   stroke: Cesium.Color.GREEN,
   fill: Cesium.Color.RED,
   strokeWidth: 3,
   markerSymbol: '3'
 });
   const pin50 = new Cesium.PinBuilder().fromText("50+", Cesium.Color.BLACK, 48).toDataURL();
 dataSource.then(data=>{
  data.clustering.enabled = true;
  data.clustering.pixelRange = 15;
  data.clustering.minimumClusterSize = 3;
  data.clustering.clusterEvent.addEventListener(function(entities, cluster) {
    cluster.label.show = false;
    cluster.billboard.show = true;
    cluster.billboard.id = cluster.label.id;
    cluster.billboard.image = pin50
    cluster.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
});
    const entities=data._entityCollection._entities._array
    entities.forEach(e=>{
        const name=e._name
        e._billboard._image._value=new Cesium.PinBuilder().fromText(e.name, Cesium.Color.RED, 100).toDataURL();
      
        console.log(e,name);
        
    })
    viewer.dataSources.add(data)
 })







const pos=new Cesium.Cartesian3.fromDegrees(86,10,6000000)
viewer.camera.lookAt(pos,new Cesium.HeadingPitchRange(Cesium.Math.toRadians(30), Cesium.Math.toRadians(-60), Cesium.Math.toRadians(20)))
})
function initCesium(){
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiZDBiOWI1Ni0yN2NlLTRjNTYtYTg5Mi01N2VlN2M5MWRhMTMiLCJpZCI6MjA0NzMzLCJpYXQiOjE3MTE1MTQ5ODZ9.EmuPT8se7QBJvBIdvA9r2Y_OEa0CabzpU0XqRMkmiWw'
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