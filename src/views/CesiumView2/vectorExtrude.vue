<template>
  <div id="main">
    <div id="cesiumContainer"></div>
    <div id="lon">拉伸方向(经度)</div>
    <div id="lat">拉伸方向(纬度)</div>
    <div id="distance">拉伸距离</div>
    <input type="number" placeholder="拉伸方向(经度)" max="121" min="119" id="ray" v-model="lon" @input="extrude()">
    <input type="number" placeholder="拉伸方向(纬度)" max="41" min="39" id="ray1" v-model="lat" @input="extrude()">
    <input type="number" placeholder="拉伸距离" max="100" min="-100" id="dis" v-model="distance" @input="extrude()">

  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue';
let viewer;
let lon=119;
let lat=39;
let distance=0;
function extrude(){
    viewer.entities.removeById('point1')
    viewer.entities.removeById('point2')
    viewer.entities.removeById('point3')
    viewer.entities.removeById('point4')
    viewer.entities.removeById('secondFace')
    const start=Cesium.Cartesian3.fromDegrees(120,40.2,0)
    const end=Cesium.Cartesian3.fromDegrees(lon,lat,0)
    console.log(start,end);
    const dir=new Cesium.Cartesian3()
    Cesium.Cartesian3.subtract(end.clone(),start.clone(),dir)
    Cesium.Cartesian3.normalize(dir,dir)
    //根据经纬度获得方向创建射线
    const ray=new Cesium.Ray(new Cesium.Cartesian3.fromDegrees(120,40.2,0),dir.clone())
    const ray1=new Cesium.Ray(new Cesium.Cartesian3.fromDegrees(119.9,40.2,0),dir.clone())
    const ray2=new Cesium.Ray(new Cesium.Cartesian3.fromDegrees(120,40.2,4000),dir.clone())
    const ray3=new Cesium.Ray(new Cesium.Cartesian3.fromDegrees(119.9,40.2,4000),dir.clone())
    //根据射线获得点
    const res=new Cesium.Cartesian3()
    const res1=new Cesium.Cartesian3()
    const res2=new Cesium.Cartesian3()
    const res3=new Cesium.Cartesian3()
    Cesium.Ray.getPoint(ray,distance*500,res);
    Cesium.Ray.getPoint(ray1,distance*500,res1);
    Cesium.Ray.getPoint(ray2,distance*500,res2);
    Cesium.Ray.getPoint(ray3,distance*500,res3);
    //创建四个点
    viewer.entities.add({
    id:'point1',
    position:res,
    point:{
        pixelSize:20,
        outlineColor:Cesium.Color.RED,
        outlineWidth:5
    }
})
    viewer.entities.add({
    id:'point2',
    position:res1,
    point:{
        pixelSize:20,
        outlineColor:Cesium.Color.RED,
        outlineWidth:5
    }
})
    viewer.entities.add({
    id:'point3',
    position:res2,
    point:{
        pixelSize:20,
        outlineColor:Cesium.Color.RED,
        outlineWidth:5
    }
})
    viewer.entities.add({
    id:'point4',
    position:res3,
    point:{
        pixelSize:20,
        outlineColor:Cesium.Color.RED,
        outlineWidth:5
    }
})
//创建拉伸几何体
viewer.entities.add({
id:'secondFace',
polygon:{
hierarchy:[res,res1,Cesium.Cartesian3.fromDegrees(119.9,40.2,0),Cesium.Cartesian3.fromDegrees(120,40.2,0)],
material:Cesium.Color.RED.withAlpha(0.2),
extrudedHeight:0,
height:4000
    }
})






}
onMounted(()=>{ 
initCesium()
//四个点的坐标
const pos1=Cesium.Cartesian3.fromDegrees(120,40.2,0)
const pos2=Cesium.Cartesian3.fromDegrees(119.9,40.2,0)
const pos3=Cesium.Cartesian3.fromDegrees(120,40.2,4000)
const pos4=Cesium.Cartesian3.fromDegrees(119.9,40.2,4000)
//创建四个点
viewer.entities.add({
    position:pos1,
    point:{
        pixelSize:20,
        outlineColor:Cesium.Color.RED,
        outlineWidth:5
    }
})
viewer.entities.add({
    position:pos2,
    point:{
        pixelSize:20,
        outlineColor:Cesium.Color.RED,
        outlineWidth:5
    }
})
viewer.entities.add({
    position:pos3,
    point:{
        pixelSize:20,
        outlineColor:Cesium.Color.RED,
        outlineWidth:5
    }
})
viewer.entities.add({
    position:pos4,
    point:{
        pixelSize:20,
        outlineColor:Cesium.Color.RED,
        outlineWidth:5
    }
})
//四个点创建一个面
viewer.entities.add({
id:'firstFace',
polygon:{
hierarchy:new Cesium.Cartesian3.fromDegreesArrayHeights([120,40.2,0,119.9,40.2,0,120,40.2,4000,119.9,40.2,0,120,40.2,4000,119.9,40.2,4000]),
material:Cesium.Color.RED.withAlpha(0.2),
extrudedHeight:0,
height:4000
    }
})

viewer.camera.setView({
  destination:Cesium.Cartesian3.fromDegrees( 120,39.9,20000),
  orientation:{
heading:Cesium.Math.toRadians(-0),
pitch:Cesium.Math.toRadians(-20),
roll:Cesium.Math.toRadians(0),
  }
})
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
#ray{
    position: absolute;
    left: 2%;
    top: 30px;
    width: 150px
}
#ray1{
    position: absolute;
    left: 2%;
    top: 80px;
    width: 150px
}
#dis{
    position: absolute;
    left: 2%;
    top: 140px;
    width: 150px;
}
#lon{
    position: absolute;
    left: 2%;
    top: 10px;
    width: 150px;
    background-color: #fff;
}
#lat{
    position: absolute;
    left: 2%;
    top: 60px;
    width: 150px;
    background-color: #fff
}
#distance{
    position: absolute;
    left: 2%;
    top: 120px;
    width: 150px;
    background-color: #fff
}
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