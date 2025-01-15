<template>
  <div id="main">
    <div id="container"></div>
    <div id="bubble" style="position: absolute;">气泡窗</div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted,ref } from 'vue';
let viewer;
onMounted(()=>{
initCesium()
const bubbleWindow = document.getElementById("bubble");
const scratch = new Cesium.Cartesian2();
viewer.scene.preRender.addEventListener(function () {
  const position = Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883);
  const canvasPosition = viewer.scene.cartesianToCanvasCoordinates(
    position,
    scratch,
  );
  if (Cesium.defined(canvasPosition)) {
    bubbleWindow.style.top = `${canvasPosition.y}px`;
    bubbleWindow.style.left = `${canvasPosition.x}px`;
  }
});

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
#bubble{
    width: 100px;
    height: 100px;
    background-color: blue;
    z-index: 100
}
</style>