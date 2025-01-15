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
viewer.scene.globe.depthTestAgainstTerrain = false;
//polylineVolumn
function computeCircle(radius) {
  const positions = [];
  for (let i = 0; i < 360; i++) {
    const radians = Cesium.Math.toRadians(i);
    positions.push(new Cesium.Cartesian2(radius * Math.cos(radians), radius * Math.sin(radians)));
  }
  return positions;
}
const volume = new Cesium.PolylineVolumeGeometry({
  vertexFormat : Cesium.VertexFormat.ALL,
  polylinePositions :Cesium.Cartesian3.fromDegreesArrayHeights([
    120.0, 40.0,0,
    90.0, 35.0,1000000,
    75.0, 30.0,900000,
    75.0, 33.0,0,
  ]),
  shapePositions : computeCircle(100000.0)
});

viewer.scene.primitives.add(new Cesium.Primitive({
  geometryInstances : new Cesium.GeometryInstance({
    geometry : volume,
    // modelMatrix : Cesium.Matrix4.multiplyByTranslation(Cesium.Transforms.eastNorthUpToFixedFrame(
    //   Cesium.Cartesian3.fromDegrees(120, 40.03883,0.0)), new Cesium.Cartesian3(0.0, 0.0, 0.0), new Cesium.Matrix4()),
    attributes : {
      color : Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.AQUA.withAlpha(0.2))
    }
  }),
  appearance : new Cesium.PerInstanceColorAppearance({
     flat : true,
    translucent : false
  }),
  asynchronous : false
}));


// 截面 section 二维点
function computeStar(arms, rOuter, rInner) {
    const angle = Math.PI / arms;
    const length = 2 * arms;
    const positions = new Array(length);
    for (let i = 0; i < length; i++) {
        const r = i % 2 === 0 ? rOuter : rInner;
        positions[i] = new Cesium.Cartesian2(
        Math.cos(i * angle) * r,
        Math.sin(i * angle) * r
        );
    }
    return positions;
}
function getVector2(ptStart,ptEnd){
    let v = Cesium.Cartesian3.subtract(ptEnd,ptStart,new Cesium.Cartesian3());
    Cesium.Cartesian3.normalize(v, v);
    // console.log("v1",v);
    return v;
} 
function addLine(arr){
    viewer.entities.add({
        polyline: {
            positions: arr,
            width: 2,
            arcType: Cesium.ArcType.NONE,
            material: new Cesium.PolylineOutlineMaterialProperty({
                color: Cesium.Color.BLUE,
                outlineWidth: 0,
                outlineColor: Cesium.Color.BLACK,
            }),
        },
    });
    
}
/*
sectionPts 二维截面的点
*/
function computerCircle3DPt4(sectionPts,vectorStartToEnd,ptStart){
    let car3Start = ptStart;
    let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(car3Start);
    let realy = Cesium.Matrix4.getColumn(modelMatrix, 1, new Cesium.Cartesian4());

    // let tmp = Cesium.Cartesian3.normalize(car3Start,new Cesium.Cartesian3());
    let ay = Cesium.Cartesian3.normalize(vectorStartToEnd,new Cesium.Cartesian3());
    let ax = Cesium.Cartesian3.cross( new Cesium.Cartesian3(realy.x,realy.y,realy.z),ay,new Cesium.Cartesian3());
    Cesium.Cartesian3.normalize(ax,ax);
    let az = Cesium.Cartesian3.cross(ax,ay,new Cesium.Cartesian3());
    Cesium.Cartesian3.normalize(az,az);
    let mat = new Cesium.Matrix3(
        ax.x,ay.x,az.x,
        ax.y,ay.y, az.y,
        ax.z,ay.z,az.z
    );

    let result =[];
    sectionPts.forEach((v,index)=>{
        // v 里面是x z
        let pt2d = new Cesium.Cartesian3(v.y,0,v.x);
        let tmpV = Cesium.Matrix3.multiplyByVector(mat,pt2d,new Cesium.Cartesian3());
        let tmpPt = Cesium.Cartesian3.add(car3Start,tmpV,new Cesium.Cartesian3());
        // viewer.entities.add({
        //     position:tmpPt,
        //     label:{
        //         text:""+index
        //     },
        //     point: {
        //         pixelSize: 10,
        //         color: Cesium.Color.BLUE,
        //     },
        // });
        result.push(tmpPt);

    });
    //addLine(result);
    return result;
}

const arr = [
    90.064391154,30.64452018,100, 
    90.168344730,30.64450762,10000,
    90.368354737,30.64116754,100000, 
    90.564921344,30.64126136,500000, 
    91.065203748,30.64030779,900000, 
    94.068420869,30.64016537,1300000, 
    98.070963240,30.64021828,1400000, 
    104.07189450,30.64429928,1200000, 
    112.07064427,30.64452012,700000, 
    119.07011034,30.64035622,400000, 
    125.06936621,30.64035013,100000, 
    128.06959512,30.64431128,6000, 
    134.06491237,30.63936779,1000,
];
// 显示线
const orangeOutlined = viewer.entities.add({
    polyline: {
        positions: Cesium.Cartesian3.fromDegreesArrayHeights(arr),
        width: 5,
        material: new Cesium.PolylineOutlineMaterialProperty({
            color: Cesium.Color.ORANGE,
            outlineWidth: 2,
            outlineColor: Cesium.Color.BLACK,
        }),
    },
});
//星形状
let clipSegCount = 14;
let sectionPts = computeStar(clipSegCount/2, 70000, 50000);
function GetSegmentInfos(ptArr)
{
    let result =[];
    let ptCount = ptArr.length/3; // 点个数
    if(ptCount <2){
        return result;
    }else if(ptCount == 2){
        let pre = Cesium.Cartesian3.fromDegrees(ptArr[0],ptArr[1],ptArr[2]);
        let cur = Cesium.Cartesian3.fromDegrees(ptArr[3],ptArr[4],ptArr[5]);
        let v1 = getVector2(pre,cur);
        result.push(...[pre,v1,cur,v1]);
    }else{
        // 第一个点 i=0
        {
            let pre = Cesium.Cartesian3.fromDegrees(ptArr[0],ptArr[1],ptArr[2]);
            let cur = Cesium.Cartesian3.fromDegrees(ptArr[3],ptArr[4],ptArr[5]);
            let v1 = getVector2(pre,cur);
            result.push(...[pre,v1]);
        }
        // 第二到最后一个
        for(let i=1;i<ptCount-1;++i){
            let pre = Cesium.Cartesian3.fromDegrees(ptArr[(i-1)*3],ptArr[(i-1)*3+1],ptArr[(i-1)*3+2]);
            let cur = Cesium.Cartesian3.fromDegrees(ptArr[i*3],ptArr[i*3+1],ptArr[i*3+2]);
            let next = Cesium.Cartesian3.fromDegrees(ptArr[(i+1)*3],ptArr[(i+1)*3+1],ptArr[(i+1)*3+2]);
            let v1 = getVector2(pre,cur);
            let v2 = getVector2(cur,next);
            let vCur = Cesium.Cartesian3.add(v1,v2,new Cesium.Cartesian3());
            Cesium.Cartesian3.normalize(vCur, vCur);
            result.push(...[cur,vCur]);
        }
        // 最后一个 i=ptCount-1
        {
            let pre = Cesium.Cartesian3.fromDegrees(ptArr[(ptCount-2)*3],ptArr[(ptCount-2)*3+1],ptArr[(ptCount-2)*3+2]);
            let cur = Cesium.Cartesian3.fromDegrees(ptArr[(ptCount-1)*3],ptArr[(ptCount-1)*3+1],ptArr[(ptCount-1)*3+2]);
            let v1 = getVector2(pre,cur);
            result.push(...[cur,v1]);
        }
    }
    return result; // 一个点位配一个方向
}

let segmentInfos = GetSegmentInfos(arr);
let clipFaceCount = segmentInfos.length/2;

let allPt = [];//Cartesian3集合
for(let i=0;i<clipFaceCount;++i){
    let section3dPtStar3 = computerCircle3DPt4(sectionPts,segmentInfos[2*i+1],segmentInfos[2*i]);
    allPt.push(...section3dPtStar3);
}

function GetIndices(pts,segCount,clipSegCount){
    let indices = [];
    
    for (let j = 0; j < segCount; j++) {
        let curSIndex = j*clipSegCount;
        let nextSIndex = (j+1)*clipSegCount;
        for (let i = 0; i < clipSegCount-1; i++) {
            indices.push(...[
                curSIndex+i,curSIndex+i+1,nextSIndex+i+1,
                curSIndex+i,nextSIndex+i+1,nextSIndex+i,
            ]);
        }
        indices.push(...[
            curSIndex+clipSegCount-1,curSIndex,nextSIndex,
            curSIndex+clipSegCount-1,nextSIndex,nextSIndex+clipSegCount-1,
        ]);
    }

    return indices;
}
//14个点，13段， 每个截面clipSegCount (12)个点
// 构建形状
const indices = GetIndices(allPt,clipFaceCount-1,clipSegCount);

let positions = [];
allPt.forEach(pt=>{
    positions.push(...[pt.x,pt.y,pt.z]);
});

// function addFace(pt,clipSegCount,startIndex)
// {
//     positions.push(...[pt.x,pt.y,pt.z]);// 加到顶点集合中
//     let curCenterIndex = positions.length/3-1;
//     for (let i = 0; i < clipSegCount-1; i++) {
//         indices.push(...[curCenterIndex,startIndex+i,startIndex+i+1]);
//     }
//     indices.push(...[curCenterIndex,startIndex+clipSegCount-1,startIndex+0]);
// }
// 首尾两个面
// let first = Cesium.Cartesian3.fromDegrees(arr[0],arr[1],arr[2]);
// addFace(first,clipSegCount,0);
// let last = Cesium.Cartesian3.fromDegrees(arr[arr.length-3],arr[arr.length-2],arr[arr.length-1]);
// addFace(last,clipSegCount,positions.length/3-1-clipSegCount);// 1 是起点处的圆心

//画出轮廓线
// for (let i = 0; i < clipSegCount-1; i++) {
//     let ptArr = [];
//     for (let j = 0; j < clipFaceCount; j++) {
//         ptArr.push(allPt[j*clipSegCount+i]);
//     }
//     addLine(ptArr);
// }

const geometry = new Cesium.Geometry({
    attributes: {
        position: new Cesium.GeometryAttribute({
            componentDatatype: Cesium.ComponentDatatype.DOUBLE,
            componentsPerAttribute: 3,
            values: new Float32Array(positions)
        }),
    },
    indices: new Uint16Array(indices),
    primitiveType: Cesium.PrimitiveType.TRIANGLES,
    boundingSphere: Cesium.BoundingSphere.fromVertices(positions)
});

const instance = new Cesium.GeometryInstance({
    geometry: geometry,
    // modelMatrix: modelMatrix,
    attributes: {
        color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.RED.withAlpha(1.0)) 
    }
});

//加入场景
let prim = viewer.scene.primitives.add(new Cesium.Primitive({
    geometryInstances: instance,
    appearance: new Cesium.PerInstanceColorAppearance({
        flat: true,
        translucent: false
    }),
     asynchronous: false
}));

viewer.zoomTo(viewer.entities);

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