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
let m1 = Cesium.Transforms.eastNorthUpToFixedFrame(viewer.scene.globe.ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-100.0, 40.0)));
Cesium.Matrix4.multiplyByTranslation(m1, new Cesium.Cartesian3(0.0, 0.0, 20.0), m1);
let modelMatrix = Cesium.Matrix4.multiplyByUniformScale(m1, 1.0, m1);
/*
    这里只加了上下两排点
*/
let segCount = 150; // 每排横向分段数，段数越多，曲面效果越好
let height = 10.0;  // 旗帜宽
let width = 15.0;   // 旗帜高
let pts = [];
let uvs =[];
let nms =[];
let step = width/segCount;
let uvstep = 1.0/segCount;
for(let i=0;i<=segCount;++i){
    // 顶点
    pts.push( 0.0,step * i, 0.0);
    pts.push( 0.0,step * i, 1.0*height);
    // 纹理坐标
    uvs.push(1 - uvstep * i,0);
    uvs.push(1 - uvstep * i,1);
    // 法向
    nms.push(1.0,0.0,0.0);
    nms.push(1.0,0.0,0.0);
}

let indices = [];
// 每4个点对应2个面
for (let i = 1; i <= segCount; i++) {
    let before = 2*(i-1);
    let cur = 2*i;
    indices.push(
        before + 0, before + 1, cur + 1,      // 0,1,3
        before + 0, cur + 1, cur,             // 0,3,2
    );
}

const positions = new Float64Array(pts);
const sts = new Float32Array(uvs);
const normals = new Float32Array(nms);

const geometry = new Cesium.Geometry({
    attributes: {
        position: new Cesium.GeometryAttribute({
            componentDatatype: Cesium.ComponentDatatype.DOUBLE,
            componentsPerAttribute: 3,
            values: positions
        }),
        st: new Cesium.GeometryAttribute({
            componentDatatype: Cesium.ComponentDatatype.FLOAT,
            componentsPerAttribute: 2,
            values: sts
        }),
        normal : new Cesium.GeometryAttribute({
            componentDatatype: Cesium.ComponentDatatype.FLOAT,
            componentsPerAttribute: 3,
            values: normals,
        })
    },
    indices: new Uint16Array(indices),
    primitiveType: Cesium.PrimitiveType.LINE_STRIP, // 线框
    primitiveType: Cesium.PrimitiveType.TRIANGLES,
    vertexFormat: Cesium.EllipsoidSurfaceAppearance.ALL,
    boundingSphere: Cesium.BoundingSphere.fromVertices(positions)
});

const instance = new Cesium.GeometryInstance({
    geometry: geometry,
    modelMatrix: modelMatrix,
});

//加入场景
viewer.scene.primitives.add(new Cesium.Primitive({
    geometryInstances: instance,
    /*注意这里用EllipsoidSurfaceAppearance的话，背面不显示*/
    // appearance: new Cesium.EllipsoidSurfaceAppearance({
    appearance: new Cesium.MaterialAppearance({
        material:new Cesium.Material({
            fabric: {
                type: "Image",
                uniforms: {
                    image: "../../../CesiumBasicSource/Flag.png",
                },
            },
        }),
        vertexShaderSource: `
        in vec3 position3DHigh;
        in vec3 position3DLow;
        in vec3 normal;
        in vec3 tangent;
        in vec3 bitangent;
        in vec2 st;
        in float batchId;
        out vec3 v_positionEC;
        out vec3 v_normalEC;
        out vec3 v_tangentEC;
        out vec3 v_bitangentEC;
        out vec2 v_st;
        float rand(vec2 co)
        {
            return fract(sin(dot(co.xy ,vec2(12.9898, 78.233))) * 43758.5453);
        }
        void main()
        {
            vec4 p = czm_computePosition();
            float noiseValue = rand(p.xy+sin(czm_frameNumber)) * 1.0;

            // 效果一
            float range =10.0;//幅度
            p.y += sin(range*p.x)*sin(czm_frameNumber*3.14159265/180.0);

            v_positionEC = (czm_modelViewRelativeToEye * p).xyz;      // position in eye coordinates
            v_normalEC = czm_normal * normal;                         // normal in eye coordinates
            v_tangentEC = czm_normal * tangent;                       // tangent in eye coordinates
            v_bitangentEC = czm_normal * bitangent;                   // bitangent in eye coordinates
            v_st = st;

            gl_Position = czm_modelViewProjectionRelativeToEye * p;
            // 效果二
            // gl_Position.y += sin(gl_Position.x)*sin(czm_frameNumber*3.14159265*10.0/180.0);//+noiseValue;
        }
        `,
    }),
    asynchronous:false
}));

viewer.camera.flyTo({
    destination: new Cesium.Cartesian3(-849669.380384398, -4818389.484212656, 4078016.4602457224),
    orientation: {
        heading: 1.6256212189222454,
        pitch: -0.3600880235248547,
        roll: 6.283184158001929,
    },
    duration:0.1
});

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