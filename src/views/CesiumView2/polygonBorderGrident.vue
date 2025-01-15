<template>
  <div id="main">
    <div id="cesiumContainer"></div>
  </div>
</template>

<script setup>
import * as Cesium from 'cesium'
import { onMounted } from 'vue';
let viewer;
onMounted(()=>{
initCesium()


var lon = 128.055;
var lat = 0;
var offset = 5;
var doubleoffset = offset*2;

//设置初始位置
viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(lon+offset, lat+offset, 5000000)
});

//用primitive方式改写
var oneTypeLineInstances = [];
oneTypeLineInstances.push(
    new Cesium.GeometryInstance({
        geometry : new Cesium.PolygonGeometry({
            polygonHierarchy : new Cesium.PolygonHierarchy( Cesium.Cartesian3.fromDegreesArrayHeights([
            lon, lat, 2500,
            lon + doubleoffset, lat, 2500,
            lon + doubleoffset, lat + doubleoffset, 2500,
            lon , lat + doubleoffset, 2500,
        ])),
        vertexFormat : Cesium.PolylineMaterialAppearance.VERTEX_FORMAT
        }),
    })
);
let f_shader = `
    czm_material czm_getMaterial(czm_materialInput materialInput) { 
        czm_material material = czm_getDefaultMaterial(materialInput);
        vec2 st = materialInput.st;
        vec2 position = -1.0 + 2.0 *st;
        // 动态颜色
        float time = czm_frameNumber * animationSpeed;
        float r = abs( cos( position.x * position.y + time / 5.0 ) );
        float g = abs( sin( position.x * position.y + time / 4.0 ) );
        float b = abs( cos( position.x * position.y + time / 3.0 ) );
        material.diffuse = vec3( r, g, b);

        // 渐变
        float width = gradientwidth;
        material.alpha = 1.0;
        // 横向
        if(st.s < width)
            material.alpha *= st.s/width;
        else if(st.s > 1.0-width)
            material.alpha *= (1.0-st.s)/width;

        // 纵向
        if(st.t < width)
            material.alpha *= st.t/width;
        else if(st.t > 1.0-width)
            material.alpha *= (1.0-st.t)/width;

        return material;
    }
`;
const oneTypeLinesPrimitive = new Cesium.Primitive({
    geometryInstances : oneTypeLineInstances,
    appearance : new Cesium.MaterialAppearance({
        material :  new Cesium.Material({
            fabric: {
                uniforms : {
                    // 动效速度
                    animationSpeed: 0.1,
                    // 渐变宽度
                    gradientwidth:0.2
                },
                source :f_shader,
            }
        })
    }),
    asynchronous : true
});
viewer.scene.primitives.add(oneTypeLinesPrimitive);

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

</style>