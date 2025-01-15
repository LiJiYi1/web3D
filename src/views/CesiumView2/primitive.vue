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
const primitive=new Cesium.Primitive({
  geometryInstances : new Cesium.GeometryInstance({
    geometry : Cesium.EllipsoidGeometry.createGeometry(new Cesium.EllipsoidGeometry({
      radii : new Cesium.Cartesian3(500000.0, 500000.0, 1000000.0),
      vertexFormat : Cesium.VertexFormat.POSITION_AND_NORMAL
    })),
    modelMatrix : Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
      Cesium.Cartesian3.fromDegrees(-95.59777, 40.03883)), new Cesium.Cartesian3(0.0, 0.0, 500000.0), new Cesium.Matrix4()),
    id : 'ellipsoid',
    attributes : {
      color : Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.AQUA)
    }
  }),
  appearance : new Cesium.PerInstanceColorAppearance(),
  asynchronous : false
})
viewer.scene.primitives.add(primitive);

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