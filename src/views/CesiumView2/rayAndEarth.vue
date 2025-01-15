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

var startPosition = Cesium.Cartesian3.fromDegrees(-89.3350,34.65874, 6000);
viewer.scene.globe.depthTestAgainstTerrain = true;
var heading = Cesium.Math.toRadians(2); // Convert to radians
var pitch = Cesium.Math.toRadians(-30);
var roll = Cesium.Math.toRadians(0);
var direction = new Cesium.Matrix3();
Cesium.Matrix3.fromHeadingPitchRoll(new Cesium.HeadingPitchRoll(heading, pitch, roll), direction);

// Create a ray from the starting position and direction
let dir = Cesium.Matrix3.getColumn(direction, 2, new Cesium.Cartesian3());

//The ray points to the sky, so there is no intersection with the ground,use it
Cesium.Cartesian3.negate( dir,  dir);

// show direct
let v = Cesium.Cartesian3.multiplyByScalar(dir, 100000, new Cesium.Cartesian3());
let endPosition = Cesium.Cartesian3.add(startPosition,v, new Cesium.Cartesian3());
console.log(dir);

const redLine = viewer.entities.add({
  name: "Red line on terrain",
  polyline: {
    positions: [startPosition,endPosition],
    width: 15,
    arcType: Cesium.ArcType.NONE,
    material: new Cesium.PolylineArrowMaterialProperty(
      Cesium.Color.RED
    ),
  },
});

viewer.zoomTo(redLine);
const ray = new Cesium.Ray(startPosition, dir);

// test
//const ray = new Cesium.Ray(startPosition, new Cesium.Cartesian3(0,0,-100));

// Get the intersection point with the ground
//const intersection = Cesium.IntersectionTests.grazingAltitudeLocation(ray, Cesium.Ellipsoid.WGS84);
const intersection = Cesium.IntersectionTests.rayEllipsoid(ray, viewer.scene.globe.ellipsoid);

// If there is an intersection with the ground
if (intersection) {
    console.log(intersection);
    const point = Cesium.Ray.getPoint(ray, intersection.start);
    console.log(point);
    //const intersectionPosition = Cesium.Cartographic.toCartesian(intersection,Cesium.Ellipsoid.WGS84,new Cesium.Cartesian3());
    const groundLatLng = Cesium.Cartographic.fromCartesian(point);
    const groundLat = Cesium.Math.toDegrees(groundLatLng.latitude);
    const groundLng = Cesium.Math.toDegrees(groundLatLng.longitude);
    const groundAlt = groundLatLng.height;

    console.log("Ground intersection point:");
    console.log("Latitude: " + groundLat);
    console.log("Longitude: " + groundLng);
    console.log("Altitude: " + groundAlt);
} else {
    console.log("No intersection with the ground!");
}

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