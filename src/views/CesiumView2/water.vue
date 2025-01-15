<template>
  <div id="main">
    <div id="container"></div>

  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted,ref } from 'vue';
let viewer;
onMounted(()=>{
initCesium()
const rectangleInstance = new Cesium.GeometryInstance({
  geometry : new Cesium.RectangleGeometry({
    rectangle : Cesium.Rectangle.fromDegrees(-180.0, -90.0, 180.0, 90.0),
    vertexFormat:Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT,
    
  }),
  id : 'rectangle',
  attributes : {
    color : new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 0.0, 1.0)
  }
});

const primitive=new Cesium.Primitive({
  geometryInstances : rectangleInstance,
  appearance :  new Cesium.EllipsoidSurfaceAppearance({
    material : Cesium.Material.fromType('Water')
  })
})
viewer.scene.primitives.add(primitive);
primitive.appearance.material=new Cesium.Material({
   strict:true,
   translucent:false,
    fabric: {
      type:'Water' ,
      uniforms: {
        specularMap: "../../../public/CesiumBasicSource/earthspec1k.jpg",
        normalMap: Cesium.buildModuleUrl("../../../public/CesiumBasicSource/normalmap.png"),
        frequency: 10000.0,
        animationSpeed: 0.01,
        amplitude: 1.0,
      },
    } })
    //viewer.scene.light.intensity=1000.0
viewer.camera.setView({
  destination:Cesium.Cartesian3.fromDegrees(133,38,5000),
  orientation:{
    heading:Cesium.Math.toRadians(-90),
    pitch:Cesium.Math.toRadians(-30),
    rool:Cesium.Math.toRadians(60),
  }
})
})
function initCesium(){
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiZDBiOWI1Ni0yN2NlLTRjNTYtYTg5Mi01N2VlN2M5MWRhMTMiLCJpZCI6MjA0NzMzLCJpYXQiOjE3MTE1MTQ5ODZ9.EmuPT8se7QBJvBIdvA9r2Y_OEa0CabzpU0XqRMkmiWw'
viewer=new Cesium.Viewer('container',{
   terrain: Cesium.Terrain.fromWorldTerrain({
    requestWaterMask: true,
    requestVertexNormals: false,
  }),
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