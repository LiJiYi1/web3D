<template>
  <div id="main">
    <div id="container" ref="CesiumContainer"></div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted,ref } from 'vue';
import * as turf from '@turf/turf'
const CesiumContainer=ref(null)
let viewer;
onMounted(()=>{
initCesium()
//先用Cesium画个点
viewer.entities.add({
    id:'point',
    position:new Cesium.Cartesian3.fromDegrees(114,30,0),
    point:{
pixelSize:20,
color:Cesium.Color.RED
    }
})
//根据turf算出这个点的缓冲区范围
const point=turf.point([114,30])
const buffer=turf.buffer(point,40)
//拿到这个区的数据
const data=buffer.geometry.coordinates[0]
console.log(buffer.geometry.coordinates[0]);
//解析成Cesium能用的
const posArr=[]
data.forEach(e=>{
   posArr.push(e[0],e[1])
})
//画出缓冲区
viewer.entities.add({
    id:'pointPolygon',
    //position:new Cesium.Cartesian3.fromDegrees(100,20,0),
    polygon:{
        hierarchy:Cesium.Cartesian3.fromDegreesArray(posArr),
        material:Cesium.Color.WHITE
    }
})

//先用Cesium画个线
viewer.entities.add({
    id:'line',
    //position:new Cesium.Cartesian3.fromDegrees(100,20,0),
    polyline:{
        positions:Cesium.Cartesian3.fromDegreesArray([113.5,29.5,114.5,29.5,114.5,30.5,113.5,30.5]),
        material:Cesium.Color.RED,
        width:1
    }
})
//根据turf算出这个线的缓冲区范围
const line=turf.lineString([[113.5,29.5],[114.5,29.5],[114.5,30.5],[113.5,30.5]],{name: 'line 1'})
console.log(line);
const buffer1=turf.buffer(line,10)
//拿到这个区的数据
const data1=buffer1.geometry.coordinates[0]
console.log(buffer1.geometry.coordinates[0]);
//解析成Cesium能用的
const lineArr=[]
data1.forEach(e=>{
   lineArr.push(e[0],e[1])
})
//画出缓冲区
viewer.entities.add({
    id:'linePolygon',
    //position:new Cesium.Cartesian3.fromDegrees(100,20,0),
    polygon:{
        hierarchy:Cesium.Cartesian3.fromDegreesArray(lineArr),
        material:Cesium.Color.WHITE
    }
})

//先用Cesium画个区域
viewer.entities.add({
    id:'polygon',
    //position:new Cesium.Cartesian3.fromDegrees(100,20,0),
    polygon:{
        hierarchy:Cesium.Cartesian3.fromDegreesArray([113,29,115,29,115,31,113,31]),
        material:Cesium.Color.RED
    }
})
//根据turf算出这个线的缓冲区范围
const polygon=turf.polygon([[[113,29],[115,29],[115,31],[113,31],[113,29]]])
console.log(line);
const buffer2=turf.buffer(polygon,10)
//拿到这个区的数据
const data2=buffer2.geometry.coordinates[0]
//解析成Cesium能用的
const polygonArr=[]
data2.forEach(e=>{
   polygonArr.push(e[0],e[1])
})
//画出缓冲区
viewer.entities.add({
    id:'Polygon',
    //position:new Cesium.Cartesian3.fromDegrees(100,20,0),
    polygon:{
        hierarchy:Cesium.Cartesian3.fromDegreesArray(polygonArr),
        material:Cesium.Color.GREENYELLOW
    }
})
//var polygon = turf.polygon([[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]], { name: 'poly1' });
viewer.zoomTo(viewer.entities)
  }
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
</style>