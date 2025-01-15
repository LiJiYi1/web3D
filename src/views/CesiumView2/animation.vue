<template>
  <div id="main">
    <div id="container"></div>
    <div id="dark" @click="toDark()">黑暗风格</div>
    <div id="light" @click="toLight()">光明风格</div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiZDBiOWI1Ni0yN2NlLTRjNTYtYTg5Mi01N2VlN2M5MWRhMTMiLCJpZCI6MjA0NzMzLCJpYXQiOjE3MTE1MTQ5ODZ9.EmuPT8se7QBJvBIdvA9r2Y_OEa0CabzpU0XqRMkmiWw'
function toLight(){
document.body.className = 'cesium-lighter';
viewer.animation.applyThemeChanges();
}
function toDark(){
  document.body.className = '';
viewer.animation.applyThemeChanges();
}
import { onMounted } from 'vue';
let viewer;
onMounted(()=>{
initCesium()
})
function initCesium(){
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
#dark{
  position: absolute;
  left:2%;
  top: 2%;
  background-color: red;
}
#dark:hover{
  position: absolute;
  left: 2%;
  top: 2%;
  background-color: aqua;
  cursor: pointer;
}
#light{
  position: absolute;
  left: 2%;
  top: 50px;
  background-color: red;
}
#light:hover{
  position: absolute;
  left: 0px;
  top: 50px;
  background-color: aqua;
  cursor: pointer;
}
</style>