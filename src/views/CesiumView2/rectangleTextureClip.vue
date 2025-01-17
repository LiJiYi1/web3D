<template>
  <div id="main">
    <div id="cesiumContainer"></div>
    <div id="clip" @click="clip()">裁剪</div>
    <div id="all" @click="all()">全图</div>
  </div>
</template>

<script setup>
import { destination } from '@turf/turf';
import * as Cesium from 'cesium'
import { onMounted } from 'vue';
let viewer;

const rectangleInstance = new Cesium.GeometryInstance({
  geometry : new Cesium.RectangleGeometry({
    rectangle : Cesium.Rectangle.fromDegrees(90.0, 20.0, 120.0, 40.0),
    vertexFormat : Cesium.MaterialAppearance.VERTEX_FORMAT
  }),
  id : 'rectangle',
  attributes : {
    color : new Cesium.ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 1.0)
  }
});

const primitive=new Cesium.Primitive({
  geometryInstances : rectangleInstance,
  appearance : new Cesium.EllipsoidSurfaceAppearance({
    material:Cesium.Material.fromType('Image',{
        image:'/../CesiumBasicSource/科比(1).jpg',
    })
  })
})
const material=new Cesium.Material({
  fabric: {
    type: 'customTrangle',
    uniforms: {
     image:'/../CesiumBasicSource/科比(1).jpg'
    },
    source:`
    bool isSame(vec3 A, vec3 B,vec3 C,vec3 P){
    vec3 AB=B-A;
    vec3 AP=P-A;
    vec3 AC=C-A;

    vec3 V1=cross(AB,AC);
    vec3 V2=cross(AB,AP);

    return dot(V1,V2)>=0.0;
    }
    uniform sampler2D image;
    czm_material czm_getMaterial(czm_materialInput materialInput)
    {
    czm_material material = czm_getDefaultMaterial(materialInput);
    vec2 st=materialInput.st;
    vec4 color=texture(image, materialInput.st);
    material.diffuse = vec3(color.rgb);
    vec3 A=vec3(0.5,0.8,0.0);
    vec3 B=vec3(0.25,0.4,0.0);
    vec3 C=vec3(0.75,0.4,0.0);
    vec3 P=vec3(st,0.0);
    if(isSame(A,B,C,P)&&isSame(B,C,A,P)&&isSame(C,A,B,P)){
      material.alpha = 1.0;
    }
    else{
        material.alpha = 0.0;
    }
    return material;
}
    `
  }
});
function clip(){
    primitive.appearance.material=material
}
function all(){
    primitive.appearance.material=new Cesium.Material({
        fabric:{
        type:'Image',
        uniforms:{
            image:'/../CesiumBasicSource/科比(1).jpg'
        }
        }

    })
}
onMounted(()=>{
initCesium()



viewer.scene.primitives.add(primitive);
viewer.camera.setView({
    destination:Cesium.Cartesian3.fromDegrees(105,30,10000000)
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
#clip{
    position: absolute;
    left: 0px;
    top:0px;
    width: 100px;
    height: 20px;
    text-align: center;
    background-color: red;
    cursor: pointer;
}
#clip:hover{
    position: absolute;
    left: 0px;
    top:0px;
    width: 100px;
    height: 20px;
    text-align: center;
    background-color: rgb(179, 158, 158);
    cursor: pointer;
}
#all{
    position: absolute;
    left: 0px;
    top:30px;
    width: 100px;
    height: 20px;
    text-align: center;
    background-color: red;
    cursor: pointer;
}
#all:hover{
    position: absolute;
    left: 0px;
    top:30px;
    width: 100px;
    height: 20px;
    text-align: center;
    background-color: rgb(179, 158, 158);
    cursor: pointer;
}
</style>