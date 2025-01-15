<template>
  <div id="main">
    <div id="container"></div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'

import { onMounted } from 'vue';
let viewer;
onMounted(()=>{
initCesium()
//显示的范围
const coffeeBeltRectangle = Cesium.Rectangle.fromDegrees(
  -60.0,
  -40.43687,
  60.0,
  40.43687,
);
viewer.scene.globe.cartographicLimitRectangle = coffeeBeltRectangle;
viewer.scene.globe.showSkirts = false;
viewer.scene.globe.backFaceCulling = false;
viewer.scene.globe.undergroundColor = undefined;
viewer.scene.skyAtmosphere.show = false;

})
function initCesium(){
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiZDBiOWI1Ni0yN2NlLTRjNTYtYTg5Mi01N2VlN2M5MWRhMTMiLCJpZCI6MjA0NzMzLCJpYXQiOjE3MTE1MTQ5ODZ9.EmuPT8se7QBJvBIdvA9r2Y_OEa0CabzpU0XqRMkmiWw'
viewer=new Cesium.Viewer('container',{
})
}
</script>

<style scoped>
#main{
  width:100%;
  height: 100%;
}
#container{
  width: 98%;
  height: 92%;
}

</style>