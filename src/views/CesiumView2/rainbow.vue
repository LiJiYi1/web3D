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
//创建彩虹的圆弧
//起始点经纬度和高度
const startLon=121.0
const startLat=36.95
//结束点点经纬度和高度
const endLon=121.0
const endLat=37.05
//圆心的经纬度
const midLon=121.0
const midLat=37.0
//彩虹的半径
const R=(endLat-startLat)*20000
//根据三个点绘制一个圆弧polyline
const arr=[]
for(let i=0;i<180;i++){
//计算角度
const radius=Cesium.Math.toRadians(i)
//计算每个点的经纬度和高度
const lon=121.0
const lat=startLat+((endLat-startLat)/180.0)*i
const height=R*Math.sin(radius)
arr.push(lon,lat,height)
}
//添加彩虹
const polyline = new Cesium.PolylineGeometry({
  positions : Cesium.Cartesian3.fromDegreesArrayHeights(arr),
  width : 40.0,
  vertexFormat : Cesium.MaterialAppearance.VERTEX_FORMAT
});
const geometry = Cesium.PolylineGeometry.createGeometry(polyline);
const polylineInstance = new Cesium.GeometryInstance({
  geometry : geometry,
  id : 'rectangle',
  attributes : {
    color : new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 1.0)
  }
});
//自定义一个彩虹材质
const material=new Cesium.Material({
    fabric:{
        type:'rainbow',
        uniforms:{},
        source:`
        czm_material czm_getMaterial(czm_materialInput materialInput)
{
    czm_material material = czm_getDefaultMaterial(materialInput);
    vec2 st = materialInput.st;
    if(st.t>=0.0&&st.t<=0.14){
       material.diffuse = vec3(1.0,0.0,0.0);
    }
    else if(st.t>=0.14&&st.t<=0.28){
       material.diffuse = vec3(1.0,0.647,0.0);
    }
    else if(st.t>=0.28&&st.t<=0.42){
       material.diffuse = vec3(1.0,1.0,0.0);
    }
    else if(st.t>=0.42&&st.t<=0.56){
       material.diffuse = vec3(0.0,1.0,0.0);
    }
    else if(st.t>=0.56&&st.t<=0.70){
       material.diffuse = vec3(0.0,1.0,1.0);
    }
    else if(st.t>=0.70&&st.t<=0.84){
       material.diffuse = vec3(0.294,0.0,0.51);
    }
    else{
     material.diffuse = vec3(0.502,0.0,0.502);
       }
    material.alpha = 0.25;

    return material;
}
        
        `
    }
})
viewer.scene.primitives.add(new Cesium.Primitive({
  geometryInstances : polylineInstance,
  appearance :new Cesium.PolylineMaterialAppearance({
    material:material
  }),
  asynchronous:false
}));
//设置相机位置
viewer.camera.setView({
    destination:Cesium.Cartesian3.fromDegrees(120.88,37,1000),
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