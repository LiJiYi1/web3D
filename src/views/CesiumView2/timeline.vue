<template>
  <div id="main">
    <div id="container" ref="CesiumContainer"></div>
    <div id="add" @click="AddTimeLine()">添加时间线</div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted,ref } from 'vue';
const CesiumContainer=ref(null)
let viewer;
let timeline=null;
let animation=null;
let clock = new Cesium.Clock();
// clock.shouldAnimate = true;
let clockViewModel = new Cesium.ClockViewModel(clock);
function AddTimeLine()
{
    if(!animation){
        const animationContainer = document.createElement("div");
        animationContainer.className = "cesium-viewer-animationContainer";
        animationContainer.style.position='absolute';
        animationContainer.style.top='76%'
        CesiumContainer.value.appendChild(animationContainer);
        animation = new  Cesium.Animation(
            animationContainer,
            new  Cesium.AnimationViewModel(clockViewModel)
        );
        //注意要改z-index,否则看不到控件
        animationContainer.style.zIndex=99;
    }
    if(!timeline){
        const timelineContainer = document.createElement("div");
        timelineContainer.className = "cesium-viewer-timelineContainer";
        timelineContainer.className = "cesium-viewer-timelineContainer";
        timelineContainer.style.position='absolute';
        timelineContainer.style.top='88%'
        CesiumContainer.value.appendChild(timelineContainer);
        timeline = new Cesium.Timeline(timelineContainer, clock);
        //timeline.addEventListener("settime", onTimelineScrubfunction, false);
        timeline.zoomTo(clock.startTime, clock.stopTime);
        //注意要改z-index,否则看不到控件
        timelineContainer.style.zIndex=99;
    }
    //Switch to the cesium-lighter theme.
document.body.className = 'cesium-lighter';
animation.applyThemeChanges();
}
onMounted(()=>{
initCesium()

  },
)
function initCesium(){
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiZDBiOWI1Ni0yN2NlLTRjNTYtYTg5Mi01N2VlN2M5MWRhMTMiLCJpZCI6MjA0NzMzLCJpYXQiOjE3MTE1MTQ5ODZ9.EmuPT8se7QBJvBIdvA9r2Y_OEa0CabzpU0XqRMkmiWw'
viewer=new Cesium.Viewer('container',{
    timeline:false,
    animation:false
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
#add{
    position: absolute;
    left: 0px;
    top:0px;
    background-color: rgb(202, 212, 212);
    border:2px solid red;
}
#add:hover{
    position: absolute;
    left: 0px;
    top:0px;
    background-color: rgb(34, 144, 144);
    border:2px solid rgb(6, 29, 143);
    cursor: pointer;
}
</style>