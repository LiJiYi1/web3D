<template>
  <div id="main">
    <div id="container"></div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue';
import customCylinder from '../../assets/Core/customShape/customCylinder'
let viewer;
onMounted(()=>{
initCesium()
//创建entity的圆锥
viewer.entities.add({
    id:'cylinder',
    position:new Cesium.Cartesian3.fromDegrees(120,38,300),
    cylinder:{
topRadius:1000,
bottomRadius:0,
material:new Cesium.ImageMaterialProperty({
    image:'/../CesiumBasicSource/earthMap.jpg',
    //transparent:true
}),
length:700,
outline:true,
outlineColor:Cesium.Color.RED,
outlineWidth:11
    }
})
viewer.camera.setView({
    destination:new Cesium.Cartesian3.fromDegrees(120,37.98,1200),
    orientation:{
        heading:Cesium.Math.toRadians(0),
        pitch:Cesium.Math.toRadians(-15),
        roll:Cesium.Math.toRadians(0),
    }
})
//创建primitive的圆锥
const cylinder = new customCylinder({
    length: 700,
    topRadius: 1000,
    bottomRadius: 0,
    vertexFormat:Cesium.VertexFormat.ALL
});
const geometry = customCylinder.createGeometry(cylinder);
viewer.scene.primitives.add(new Cesium.Primitive({
  geometryInstances : new Cesium.GeometryInstance({
    geometry : geometry,
    modelMatrix : Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
      Cesium.Cartesian3.fromDegrees(120, 38.02)), new Cesium.Cartesian3(0.0, 0.0, 300.0), new Cesium.Matrix4()),
    id : 'ellipsoid',
    attributes : {
      color : Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.AQUA)
    }
  }),
  appearance :new Cesium.EllipsoidSurfaceAppearance({
    material : Cesium.Material.fromType('Image',{
        image:'/../CesiumBasicSource/earthMap.jpg',
    }),
renderState:{
   
  cull:{
    enabled:false,
    // face:Cesium.WebGLConstants.FRONT,
    // face:Cesium.WebGLConstants.BACK,
    // face:Cesium.WebGLConstants.FRONT_AND_BACK,
  }
}
  }),
  asynchronous : false
}));





let handler;
const entity = viewer.entities.add({
      label: {
        show: false,
        showBackground: true,
        font: "14px monospace",
        horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
        verticalOrigin: Cesium.VerticalOrigin.TOP,
        pixelOffset: new Cesium.Cartesian2(15, 0),
      },
    });
    // Mouse over the globe to see the cartographic position
    handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction(function (movement) {
      const cartesian = viewer.camera.pickEllipsoid(
        movement.endPosition,
        viewer.scene.globe.ellipsoid,
      );
      if (cartesian) {
        const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
        const longitudeString = Cesium.Math.toDegrees(
          cartographic.longitude,
        ).toFixed(2);
        const latitudeString = Cesium.Math.toDegrees(
          cartographic.latitude,
        ).toFixed(2);

        entity.position = cartesian;
        entity.label.show = true;
        entity.label.text =
          `Lon: ${`   ${longitudeString}`.slice(-7)}\u00B0` +
          `\nLat: ${`   ${latitudeString}`.slice(-7)}\u00B0`;
      } else {
        entity.label.show = false;
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  },

)
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
  width:98%;
  height: 92%;
}

</style>