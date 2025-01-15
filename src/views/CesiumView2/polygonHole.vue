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
viewer.entities.add({
    position:Cesium.Cartesian3.fromDegrees(120,39,2),
    polygon:{
        hierarchy:{
            positions:Cesium.Cartesian3.fromDegreesArray([
            120,30,
            120.1,30,
            120.1,30.1,
            120,30.1]),
            holes:[
        { 
            positions:Cesium.Cartesian3.fromDegreesArray([
            120.025,30.025,
            120.075,30.025,
            120.075,30.075,
            120.025,30.075,
           ]),
           holes:[{
             positions:Cesium.Cartesian3.fromDegreesArray([
            120.04,30.04,
            120.06,30.04,
            120.06,30.06,
            120.04,30.06,
           ])
           }
        ]
        }
               ],
        },
        material:Cesium.Color.RED.withAlpha(1.0),
        extrudedHeight:1000
    }
})
viewer.zoomTo(viewer.entities)
})
function initCesium(){
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiZDBiOWI1Ni0yN2NlLTRjNTYtYTg5Mi01N2VlN2M5MWRhMTMiLCJpZCI6MjA0NzMzLCJpYXQiOjE3MTE1MTQ5ODZ9.EmuPT8se7QBJvBIdvA9r2Y_OEa0CabzpU0XqRMkmiWw'
viewer=new Cesium.Viewer('cesiumContainer',{
    //animation:false,//动画控件
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
    height: 91%;
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
