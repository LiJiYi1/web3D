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
viewer.camera.flyTo({
    destination:Cesium.Cartesian3.fromDegrees(120,37,30000),
    orientation:{
    heading:Cesium.Math.toRadians(0),
    pitch:Cesium.Math.toRadians(0),
    roll:Cesium.Math.toRadians(0)
    },
    duration:2.8,
    complete:()=>{
    viewer.camera.flyTo({
    destination:Cesium.Cartesian3.fromDegrees(100,37,30000),
    orientation:{
    heading:Cesium.Math.toRadians(0),
    pitch:Cesium.Math.toRadians(0),
    roll:Cesium.Math.toRadians(0)
    },
    duration:2.8,
})
    }
})
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