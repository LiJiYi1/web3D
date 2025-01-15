<template>
  <div id="main">
    <div id="container"></div>
    <div id="intersect" ref="intersect"></div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'

import { onMounted,ref } from 'vue';
const intersect=ref(null)
let viewer;
onMounted(()=>{
initCesium()
//创建射线
const ray=new Cesium.Ray(new Cesium.Cartesian3.fromDegrees(100,20,300),new Cesium.Cartesian3(10,0,0))
const ellipsoid=viewer.scene.globe.ellipsoid
const Interval=Cesium.IntersectionTests.rayEllipsoid(ray, ellipsoid)
console.log(Interval);
intersect.value.innerHTML=`射线与地球相交近端点距射线原点的距离：${Interval.start},</br>射线与地球相交远端点距射线原点的距离：${Interval.stop}`
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
#intersect{
    position: absolute;
    left: 0px;
    top: 0px;
    background-color: aqua;
}
</style>