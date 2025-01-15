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
const positions = new Float64Array([
  0.0, 0.0, 0.0,
  950000.0, 0.0, 0.0,
  0.0, 950000.0, 0.0
]);

const geometry = new Cesium.Geometry({
  attributes : {
    position : new Cesium.GeometryAttribute({
      componentDatatype : Cesium.ComponentDatatype.DOUBLE,
      componentsPerAttribute : 3,
      values : positions
    })
  },
  indices : new Uint16Array([0, 1, 1, 2, 2, 0]),
  primitiveType : Cesium.PrimitiveType.LINES,
  boundingSphere : Cesium.BoundingSphere.fromVertices(positions),
});
const instance = new Cesium.GeometryInstance({
  geometry : geometry,
  modelMatrix : Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
    Cesium.Cartesian3.fromDegrees(-110.59777, 20.03883)), new Cesium.Cartesian3(0.0, 0.0, 1000.0), new Cesium.Matrix4()),
  attributes : {
    color : Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.AQUA)
  },
  id : 'bottom'
});
viewer.scene.primitives.add(new Cesium.Primitive({
  geometryInstances : instance,
  appearance : new Cesium.PerInstanceColorAppearance({
    flat:true,
    translucent:false,
//closed:true
  }),
  asynchronous:false
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
  width: 98%;
  height: 92%;
}

</style>