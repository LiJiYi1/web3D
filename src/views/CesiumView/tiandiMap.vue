<template>
  <div id="main">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue';
let viewer;
const subdomains = ['0', '1', '2', '3', '4', '5', '6', '7'];
//天地图矢量图
const imglayer = new Cesium.ImageryLayer(new Cesium.WebMapTileServiceImageryProvider({
            url: 'http://t{s}.tianditu.gov.cn/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=af982aa2aee4a6958ec8c814c2bff6dc',
            layer: 'USGSShadedReliefOnly',
            subdomains: subdomains,
            style: 'default',
            format: 'image/jpeg',
            tileMatrixSetID: 'default028mm',
            //tileMatrixLabels : ['default028mm:0', 'default028mm:1', 'default028mm:2' ],
            maximumLevel: 18,
            credit: new Cesium.Credit('U. S. Geological Survey')
        }))
onMounted(()=>{

initCesium()
//天地图注释图
        viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
            url: "http://t{s}.tianditu.com/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=af982aa2aee4a6958ec8c814c2bff6dc"
            ,
            layer: 'USGSShadedReliefOnly',
            subdomains: subdomains,
            style: 'default',
            format: 'image/jpeg',
            tileMatrixSetID: 'default028mm',
            //tileMatrixLabels : ['default028mm:0', 'default028mm:1', 'default028mm:2' ],
            maximumLevel: 18,
            credit: new Cesium.Credit('U. S. Geological Survey')
        }))
  
        viewer.camera.flyTo(
           {
            destination: Cesium.Cartesian3.fromDegrees(117.16, 32.71, 15000.0)
           }
        )
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
    baseLayer: imglayer
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