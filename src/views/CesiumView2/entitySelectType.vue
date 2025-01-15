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
viewer.entities.add({
    id:'box',
    position:new Cesium.Cartesian3.fromDegrees(100,30,30),
    box:{
       dimensions:new Cesium.Cartesian3(1000,1000,1000),
       material:Cesium.Color.RED.withAlpha(0.3)
    }
})
viewer.zoomTo(viewer.entities)


const g=document.getElementsByClassName('cesium-viewer-selectionIndicatorContainer')[0].getElementsByTagName('g')[0]
g.innerHTML=`<circle cx="0" cy="0" r="80" style="fill:#cc0;"/>`
console.log(g);

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