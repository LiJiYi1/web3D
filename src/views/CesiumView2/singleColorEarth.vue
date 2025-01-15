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
viewer.scene.globe.depthTestAgainstTerrain = false;
viewer.scene.skyAtmosphere.show = false;
viewer.scene.globe.imageryLayers.get(0).alpha = 0.0;  
viewer.scene.globe.baseColor = new Cesium.Color(1, 1, 0, 0); //默认为蓝色，这里改成绿色
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
  height: 90%;
}

</style>