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
//console.log(Cesium.Material);
class customMaterial{
constructor() {
                Cesium.Material._materialCache.addMaterial('cusmaterial', {
                    fabric: {
                        type: 'cusmaterial',
                        uniforms: {
                            u_img: "../../../public/CesiumBasicSource/kebi.jpg",
                            u_time: 0.0
                        },
                        source: `
uniform sampler2D u_img;
uniform float u_time;
czm_material czm_getMaterial(czm_materialInput materialInput)
{
    czm_material material = czm_getDefaultMaterial(materialInput);
    vec4 imgColor=texture(u_img,fract(vec2(materialInput.st.x+u_time,materialInput.st.y)));
    material.diffuse =vec3(imgColor.rgb);
    material.alpha =materialInput.st.x;
    return material;
}
`
                    },
                    translucent: true,
                });
            };
            getType() {
                return 'cusmaterial'
            };
            getValue(time, result) {
                result.u_time += 0.001;
                //console.log(result);
                return result;
            }
        }
const cusmaterial = new customMaterial;
//创建一个平面Entity,使用这个材质
const plane=new Cesium.Entity({
id:'entity',
position:new Cesium.Cartesian3.fromDegrees(120,38),
plane:{
dimensions:new Cesium.Cartesian2(1000,1000),
material:Cesium.Color.RED,
outline:true,
outlineWidth:11,
outlineColor:Cesium.Color.WHEAT,
plane:new Cesium.Plane(Cesium.Cartesian3.UNIT_X, 0.0)
     }
})
//创建一个平面的Primitive,使用这个材质
const instance = new Cesium.GeometryInstance({
  geometry : new Cesium.EllipseGeometry({
      center : Cesium.Cartesian3.fromDegrees(120.0, 37.9),
      semiMinorAxis : 5000.0,
      semiMajorAxis : 10000.0,
      rotation : Cesium.Math.PI_OVER_FOUR,
      vertexFormat : Cesium.VertexFormat.POSITION_AND_ST
  }),
  id : 'object returned when this instance is picked and to get/set per-instance attributes'
});
const primitive=new Cesium.Primitive({
  geometryInstances : instance,
  appearance : new Cesium.EllipsoidSurfaceAppearance({
    material :new Cesium.Material({
          fabric: {
                        type: 'cusmaterial',
                        uniforms: {
                            u_img: "../../../public/CesiumBasicSource/kebi.jpg",
                            u_time: 0.0
                        },
                        source: `
uniform sampler2D u_img;
uniform float u_time;
czm_material czm_getMaterial(czm_materialInput materialInput)
{
    czm_material material = czm_getDefaultMaterial(materialInput);
    vec4 imgColor=texture(u_img,fract(vec2(materialInput.st.x+u_time,materialInput.st.y)));
    material.diffuse =vec3(imgColor.rgb);
    material.alpha =materialInput.st.x;
    return material;
}
`
                    },
    })
  })
});
setInterval(() => {
    primitive.appearance.material.uniforms.u_time+=0.01
}, 100)
viewer.scene.primitives.add(primitive);
 viewer.entities.add(plane)
 viewer.entities.add({
            rectangle: {
                coordinates: Cesium.Rectangle.fromDegrees(119.7, 38, 120, 38.2),
                material: cusmaterial
            }
        })
// primitive.appearance.material=new Cesium.Material({
//   // strict:true,
//   // translucent:false,
//     fabric: {
//       type:'Water' ,
//       uniforms: {
//         //baseWaterColor:Cesium.Color.BISQUE,
//         specularMap: "../../../public/CesiumBasicSource/earthspec1k.jpg",
//         normalMap: Cesium.buildModuleUrl("../../../public/CesiumBasicSource/normalmap.png"),
//         frequency: 10000.0,
//         animationSpeed: 0.01,
//         amplitude:5.0,
//         //specularIntensity:1.0
//         //closed:true
//       },
//     } })
//viewer.zoomTo(viewer.entities)
viewer.camera.setView({
    destination:new Cesium.Cartesian3.fromDegrees(120.1,38,100000),
    orientation:{
        heading:Cesium.Math.toRadians(-92),
        pitch:Cesium.Math.toRadians(-70),
        roll:Cesium.Math.toRadians(0)
    }
})



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