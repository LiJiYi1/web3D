<template>
    <div class="menu">
    <RouterView style="position:fixed;top:60.1px;left:0%;"></RouterView>
  <el-alert title="注意:此项目更倾向于学习web3D的个人学习案例总结,在前端的设计方面可能并不是很完美。
  在canvas画布销毁方面:由于实际开发中并不会一次创建很多个canvas画布所以很少有人遇到并解决这个问题,
  本人也一直没有头绪,故直接采用路由守卫配合刷新页面的方法利用浏览器的清理机制来清除canvas画布。
  Cesium部分没有采用本地地图图层,是从网络请求的图层,请在连网的环境下打开。" center   effect="dark" class="alert"/>
  <!-- 顶部导航栏 -->
  <el-menu
    router
    class="el-menu-demo"
    mode="horizontal"
    background-color="#000000"
    text-color="#fff"
    :default-active=$route.path
    active-text-color="#5D00FF"
    @select="handleSelect"
    style="background-image:url('../../前端页面资源/bgc/bgcMain4.gif');position:absolute;z-index:1"
  >
    

      <!-- THREE.JS学习 -->
      <el-sub-menu index="1">
          <template #title>
            <span>THREE.JS学习</span>
          </template>
          <!-- 简介 -->
          <el-menu-item index="/THREEIntroduction" route="/THREEIntroduction" style="background-image:url('../../前端页面资源/bgc/bgcMain16.gif');">THREE.JS简介</el-menu-item>
          <!-- 初级篇 -->
        <el-sub-menu index="1-1" style="background-image:url('../../前端页面资源/bgc/bgcMain16.gif');">
        <template #title>初级篇:模型与动画</template>
        <el-menu-item index="/threeBasic" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/threeBasic">Three.js快速入门</el-menu-item>
        <el-menu-item index="/geometry"  style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/geometry">几何体BufferGeometry顶点</el-menu-item>
        <el-menu-item index="/model&material"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/model&material">模型对象,材质</el-menu-item>
        <el-menu-item index="/group"  style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/group">层级模型</el-menu-item>
        <el-menu-item index="/texture"  style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/texture">几何顶点UV坐标,纹理贴图</el-menu-item>
        <el-menu-item index="/gltfLoader"  style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"     route="/gltfLoader">加载外部模型(gltf)</el-menu-item>
        <el-menu-item index="/PBR"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/PBR">PBR材质</el-menu-item>
        <el-menu-item index="/canvas"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/canvas">canvasUI</el-menu-item>
        <el-menu-item index="/curve&geometry"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/curve&geometry">生成曲线、几何体</el-menu-item>
        <el-menu-item index="/camera"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/camera">正交投影相机和包围盒调参数</el-menu-item>
        <el-menu-item index="/camera1"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/camera1">相机参数，相机控件</el-menu-item>
        <el-menu-item index="/lightAndShadow"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/lightAndShadow">光源和阴影</el-menu-item>
        <el-menu-item index="/factory"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/factory">工厂案例</el-menu-item>
        <el-menu-item index="/spirite"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/spirite">spirite精灵图</el-menu-item>
        <el-menu-item index="/EffectComposer"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/EffectComposer">EffectComposer场景后处理</el-menu-item>
        <el-menu-item index="/ray"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/ray">ray射线拾取模型</el-menu-item>
        <el-menu-item index="/label"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/label">标签标注场景</el-menu-item>
        <el-menu-item index="/keyFrameAnimation"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/keyFrameAnimation">关键帧动画</el-menu-item>
        <el-menu-item index="/granary"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/granary">初级篇终：粮仓案例</el-menu-item>
        <el-menu-item index="/phone"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/phone">初级篇终：手机产品展示</el-menu-item>
        <el-menu-item index="/car"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/car">初级篇终：轿车产品展示</el-menu-item>
        </el-sub-menu>
        <!-- 进阶篇 -->
        <el-sub-menu index="1-2" style="background-image:url('../../前端页面资源/bgc/bgcMain16.gif');">
        <template #title>进阶篇:数学几何计算</template>
     <el-menu-item index="/basic"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/basic">几何计算基础(向量)</el-menu-item>
     <el-menu-item index="/speedAddspeed"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/speedAddspeed">位移速度加速度向量</el-menu-item>
     <el-menu-item index="/dotCross"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/dotCross">向量点乘叉乘</el-menu-item>
     <el-menu-item index="/EulerQuaternion"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/EulerQuaternion">欧拉角和四元数</el-menu-item>
     <el-menu-item index="/Matrix"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/Matrix">THREE.JS矩阵</el-menu-item>
     <el-menu-item index="/Ramble"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/Ramble">第一,三人称漫游</el-menu-item>
     <el-menu-item index="/Ortree"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/Ortree">八叉树碰撞检测</el-menu-item>
     <el-menu-item index="/CannonJS"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/CannonJS">Cannon.js物理引擎</el-menu-item>
     <el-menu-item index="/worldMap"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/worldMap">世界地图(GeoJSON数据解析,墨卡托坐标系)</el-menu-item>
     <el-menu-item index="/chinaMap"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/chinaMap">中国大屏(射线拾取,标签标注,光圈热点)</el-menu-item>
     <el-menu-item index="/chinaMapColor"    style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/chinaMapColor">中国大屏(颜色)</el-menu-item>
     <el-menu-item index="/chinaMapHeight"    style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/chinaMapHeight">中国大屏(高度)</el-menu-item>
     <el-menu-item index="/chinaBubbleMap"    style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/chinaBubbleMap">中国大屏(气泡图)</el-menu-item>
     <el-menu-item index="/chinaColumnMap"    style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/chinaColumnMap">中国大屏(柱状图)</el-menu-item>
     <el-menu-item index="/chinaPointMap"    style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/chinaPointMap">中国大屏(密集点图)</el-menu-item>
     <el-menu-item index="/chinaLineMap"    style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/chinaLineMap">中国大屏(密集线图)</el-menu-item>
     <el-menu-item index="/worldPeople"    style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/worldPeople">世界大屏(密集柱图)</el-menu-item>
     <el-menu-item index="/chinaMapFlyLine"    style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/chinaMapFlyLine">综合:中国大屏(飞线)</el-menu-item>
     <el-menu-item index="/earthCoordinates"    style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/earthCoordinates">经纬度坐标转球坐标</el-menu-item>
     <el-menu-item index="/worldMapEarth"    style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/worldMapEarth">保存渲染效果做贴图</el-menu-item>
     <el-menu-item index="/worldMapSepherLine"    style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/worldMapSepherLine">球边界(线合并,密集点)</el-menu-item>
     <el-menu-item index="/worldMapSepherLines"    style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/worldMapSepherLines">球体密集线图</el-menu-item>
     <el-menu-item index="/worldMapSepherLabel"    style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/worldMapSepherLabel">球面标注</el-menu-item>
     <el-menu-item index="/triangulation"    style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/triangulation">三角剖分(球面Mesh,turf.js)</el-menu-item>
     <el-menu-item index="/sphereMesh"    style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/sphereMesh">球面绘制Mesh柱状图</el-menu-item>
     <el-menu-item index="/earthPoints"    style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/earthPoints">球面点阵模型(inside库)</el-menu-item>
     <el-menu-item index="/earthColumn"    style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/earthColumn">球面密集柱模型</el-menu-item>
     <el-menu-item index="/earthFlyLine"    style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/earthFlyLine">球面飞线可视化</el-menu-item>
          </el-sub-menu>
        <!-- 高级篇 -->
        <el-sub-menu index="1-3" style="background-image:url('../../前端页面资源/bgc/bgcMain16.gif');">
        <template #title>高级篇:shader着色器</template>
        <el-menu-item index="/shaderMaterial"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/shaderMaterial">THREE.JS的shaderMaterial材质</el-menu-item>
        <el-menu-item index="/onBeforeCompile"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/onBeforeCompile">THREE.JS的onBeforeCompile修改材质</el-menu-item>
        <el-menu-item index="/smartCity"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/smartCity">智慧城市</el-menu-item>
          </el-sub-menu>
      </el-sub-menu>

      <!-- Cesium.JS学习 -->
      <el-sub-menu index="2">
          <template #title>
            <span>Cesium.JS学习</span>
          </template>
        <el-menu-item index="/CesiumIntroduction" route="/CesiumIntroduction" style="background-image:url('../../前端页面资源/bgc/bgcMain16.gif');">Cesium.JS简介</el-menu-item>
           <el-sub-menu index="2-1" style="background-image:url('../../前端页面资源/bgc/bgcMain16.gif');">
            <template #title>Cesium入门:认识基础API</template>
            <el-menu-item index="/cesiumEarthBasic"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/cesiumEarthBasic">创建Cesium地球并隐藏默认控件</el-menu-item>
            <el-menu-item index="/Entity"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/Entity">Cesium绘制形状(Entity,FlyTo)</el-menu-item>
            <el-menu-item index="/cluster"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/cluster">Entity聚合效果</el-menu-item>
            <el-menu-item index="/3DTile"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/3DTile">添加3DTiles并用矩阵和相机调位</el-menu-item>
            <el-menu-item index="/Material"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/Material">Cesium的材质</el-menu-item>
            <el-menu-item index="/geojson"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/geojson">Cesium加载GeoJSON</el-menu-item>
            <el-menu-item index="/arc"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/arc">自定义扇形</el-menu-item>
            <el-menu-item index="/polylineType"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/polylineType">polyline弧段类型</el-menu-item>
            <el-menu-item index="/earthMap"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/earthMap">加载高德地图</el-menu-item>
            <el-menu-item index="/tiandiMap"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/tiandiMap">加载天地图</el-menu-item>
            <el-menu-item index="/baiduMap"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/baiduMap">加载百度地图地图</el-menu-item>
           </el-sub-menu>
           <el-sub-menu index="2-2" style="background-image:url('../../前端页面资源/bgc/bgcMain16.gif');">
            <template #title>Cesium中级:基础API的运用</template>
            <el-menu-item index="/gridentTexture"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/gridentTexture">使用渐变纹理贴图(仿沙盒,canvas)</el-menu-item>
            <el-menu-item index="/InundationAnalysis"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/InundationAnalysis">淹没分析</el-menu-item>
            <el-menu-item index="/groundLine"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/groundLine">Cesium贴地线</el-menu-item>
            <el-menu-item index="/globeTexture"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/globeTexture">全球视频纹理(地球贴纹理)</el-menu-item>
            <el-menu-item index="/CZML"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/CZML">CZML动态数据</el-menu-item>
            <el-menu-item index="/HeatMap"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/HeatMap">Cesium热力图HeatMap</el-menu-item>
            <el-menu-item index="/callbackProperty"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/callbackProperty">callbackProperty动态参数</el-menu-item>
            <el-menu-item index="/eye"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/eye">Cesium鹰眼图(callbackProperty)</el-menu-item>
            <el-menu-item index="/ContourLine"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/ContourLine">等高线</el-menu-item>
            <el-menu-item index="/ElevationRamp"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/ElevationRamp">高程晕眩图</el-menu-item>
            <el-menu-item index="/ElevationBand"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/ElevationBand">高程自由设色图</el-menu-item>
            <el-menu-item index="/polylineUnderGround"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/polylineUnderGround">物体在地下(地图透明,消除相机碰撞检测)</el-menu-item>
            <el-menu-item index="/ColumbusView"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/ColumbusView">二三维,哥伦布视图切换</el-menu-item>
            <el-menu-item index="/pin"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/pin">billBoard的pin类</el-menu-item>
            <el-menu-item index="/polylineVolumn1"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/polylineVolumn1">创建管道几何体</el-menu-item>
            <el-menu-item index="/clipPlane"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/clipPlane">裁剪平面</el-menu-item>
            <el-menu-item index="/divideScreen"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/divideScreen">分屏效果</el-menu-item>
           </el-sub-menu>
          <el-sub-menu index="2-3" style="background-image:url('../../前端页面资源/bgc/bgcMain16.gif');">
            <template #title>Cesium高级:研究API与着色器</template>
            <el-menu-item index="/animation"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/animation">Cesium的Animation控件</el-menu-item>
            <el-menu-item index="/singleColorEarth"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/singleColorEarth">纯色地球</el-menu-item>
            <el-menu-item index="/viewerFlyContinue"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/viewerFlyContinue">视角连续飞行</el-menu-item>
            <el-menu-item index="/picking"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/picking">鼠标位置显示(picking)</el-menu-item>
            <el-menu-item index="/bubbleWindow"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/bubbleWindow">气泡窗(防遮挡)</el-menu-item>
            <el-menu-item index="/entitySelect"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/entitySelect">改变entity选中效果</el-menu-item>
            <el-menu-item index="/limitMap"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/limitMap">限制地图底图范围</el-menu-item>
            <el-menu-item index="/primitive"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/primitive">primitive实体</el-menu-item>
            <el-menu-item index="/dashCircle"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/dashCircle">绘制虚线圆</el-menu-item>
            <el-menu-item index="/customPrimitive"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/customPrimitive">自定义primitive实体</el-menu-item>
            <el-menu-item index="/ray1"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/ray1">射线</el-menu-item>
            <el-menu-item index="/water"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/water">Cesium水面特效</el-menu-item>
            <el-menu-item index="/customMaterial"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/customMaterial">自定义材质用于entity和primitive</el-menu-item>
            <el-menu-item index="/cylinder"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/cylinder">圆锥贴图(仿源码自定义Primitive)</el-menu-item>
            <el-menu-item index="/modelRotation"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/modelRotation">模型旋转(primitive和entity两种模型)</el-menu-item>
            <el-menu-item index="/modelDirection"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/modelDirection">创建多个模型朝向一个点</el-menu-item>
            <el-menu-item index="/polygonHole"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/polygonHole">带洞的多边形效果</el-menu-item>
            <el-menu-item index="/geojsonPointType"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/geojsonPointType">geojson的点样式</el-menu-item>
            <el-menu-item index="/particleSystem"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/particleSystem">Cesium粒子系统(ParticleSystem)</el-menu-item>
            <el-menu-item index="/velocityOrientation"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/velocityOrientation" active-class="active"  >运动方向(VelocityOrientationProperty)</el-menu-item>
            <el-menu-item index="/timeLine"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/timeLine">交互式添加时间线</el-menu-item>
            <el-menu-item index="/turf"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/turf">缓冲区分析(turf)</el-menu-item>
            <el-menu-item index="/mapCenter"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/mapCenter">显示多边形内地图</el-menu-item>
            <el-menu-item index="/textureClip"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/textureClip">矩形纹理裁剪</el-menu-item>
            <el-menu-item index="/rainbow"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/rainbow">绘制彩虹</el-menu-item>
            <el-menu-item index="/transformScaleRotate"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/transformScaleRotate">Primitive的平移缩放旋转</el-menu-item>
            <el-menu-item index="/lookAt"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/lookAt">仿THREE的lookAt示例</el-menu-item>
            <el-menu-item index="/taichi"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/taichi">点击绘制太极</el-menu-item>
            <el-menu-item index="/CZMLClockRange"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/CZMLClockRange">CZML的clock的range属性</el-menu-item>
            <el-menu-item index="/geojsonWater"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/geojsonWater">geojson水面材质</el-menu-item>
            <el-menu-item index="/intersectRay"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/intersectRay">射线拾取物体</el-menu-item>
            <el-menu-item index="/lookAtTransform"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/lookAtTransform">视角跟随效果</el-menu-item>
            <el-menu-item index="/CZMLPointsDivide"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/CZMLPointsDivide">CZML动点二分线段</el-menu-item>
            <el-menu-item index="/customGeometry"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/customGeometry">自定义条带形状</el-menu-item>
            <el-menu-item index="/satelliteScan"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/satelliteScan">卫星拍摄效果</el-menu-item>
            <el-menu-item index="/hide"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/hide">关于物体遮挡</el-menu-item>
            <el-menu-item index="/cubeTexture"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/cubeTexture">关于贴图问题</el-menu-item>
            <el-menu-item index="/likeBufferGeometry"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/likeBufferGeometry">仿THREE的bufferGeometry示例</el-menu-item>
            <el-menu-item index="/ModelMaterial"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/ModelMaterial">仿THREE的Materials/Car示例</el-menu-item>
            <el-menu-item index="/textureOverlay"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/textureOverlay">多重纹理叠加</el-menu-item>
            <el-menu-item index="/trangleByTwoPoints"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/trangleByTwoPoints">根据顶点和垂足两点绘制三角形</el-menu-item>
            <el-menu-item index="/turfDesitination"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/turfDesitination">根据起点,距离,角度找目标点(turf)</el-menu-item>
            <el-menu-item index="/terrianPosition"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/terrianPosition">通过点击获取地形或物体上的位置</el-menu-item>
            <el-menu-item index="/LED"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/LED">LED标志投射灯效果</el-menu-item>
            <el-menu-item index="/entityRotate"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/entityRotate">Entity旋转</el-menu-item>
            <el-menu-item index="/vectorExtrude"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/vectorExtrude">根据矢量方向拉伸面</el-menu-item>
            <el-menu-item index="/colorText"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/colorText">彩色文字</el-menu-item>
            <el-menu-item index="/DynamicDashedLine"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/DynamicDashedLine">动态虚线</el-menu-item>
            <el-menu-item index="/changeGlowLineColor"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/changeGlowLineColor">发光线颜色修改</el-menu-item>
            <el-menu-item index="/lightning"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/lightning">闪电</el-menu-item>
            <el-menu-item index="/lonlatGrid"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/lonlatGrid">绘制公里网格</el-menu-item>
            <el-menu-item index="/vertexShaderChangePoint"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/vertexShaderChangePoint">顶点着色器改大小(PointPrimitiveCollection)</el-menu-item>
            <el-menu-item index="/CZMLConectMovingPoint"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/CZMLConectMovingPoint">CZML动点连线</el-menu-item>
            <el-menu-item index="/Road"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/Road">道路效果</el-menu-item>
            <el-menu-item index="/Flag"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/Flag">模拟旗帜效果(顶点着色器)</el-menu-item>
            <el-menu-item index="/polygonChange"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/polygonChange">polygon随时间变化</el-menu-item>
            <el-menu-item index="/TilePick"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/TilePick">点击3DTile侧面画圆</el-menu-item>
            <el-menu-item index="/THREEDRadar"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/THREEDRadar">立体雷达</el-menu-item>
            <el-menu-item index="/pointInsideCylinder"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/pointInsideCylinder">判断点在圆锥内</el-menu-item>
            <el-menu-item index="/pointInsideCylinder"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/polylineVolumn">polylineVolumn重构</el-menu-item>
            <el-menu-item index="/polylineVolumn"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/path">动态path添加点线(path)</el-menu-item>
            <el-menu-item index="/rayAndEarth"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/rayAndEarth">射线与地球相交</el-menu-item>
            <el-menu-item index="/polygonFull"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/polygonFull">斜线填充多边形</el-menu-item>
            <el-menu-item index="/THREEDTileStyle"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/THREEDTileStyle">3DTile风格调整(customShader)</el-menu-item>
            <el-menu-item index="/cylinderTwoPoint"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/cylinderTwoPoint">两点构建圆锥</el-menu-item>
            <el-menu-item index="/gltfColorGrident"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/gltfColorGrident">gltf模型颜色渐变</el-menu-item>
            <el-menu-item index="/PostProcess"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/PostProcess">视图后处理(postProcess)</el-menu-item>
            <el-menu-item index="/video"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/video">视频显示</el-menu-item>
            <el-menu-item index="/lightningPlus"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/lightningPlus">闪电plus</el-menu-item>
            <el-menu-item index="/eyeCylinderBottom"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/eyeCylinderBottom">视椎体底部坐标</el-menu-item>
            <el-menu-item index="/eyeCylinderBottom1"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/eyeCylinderBottom1">视椎体底部坐标(旋转矩阵获得)</el-menu-item>
            <el-menu-item index="/axes"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/axes">坐标轴</el-menu-item>
            <el-menu-item index="/Fog"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/Fog">雾</el-menu-item>
            <el-menu-item index="/polygonBorderGrident"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/polygonBorderGrident">多边形边缘渐变</el-menu-item>
            <el-menu-item index="/volumnRendering"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/volumnRendering">体渲染</el-menu-item>
            <el-menu-item index="/explosion"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/explosion">爆炸特效</el-menu-item>
            <el-menu-item index="/explosionPlus"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/explosionPlus">爆炸特效plus</el-menu-item>
            <el-menu-item index="/manyEarth"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/manyEarth">显示多个球</el-menu-item>
            <el-menu-item index="/turfTIN"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/turfTIN">显示turf构成的TIN</el-menu-item>
            <el-menu-item index="/entitiesPostProcess"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/entitiesPostProcess">entities后处理</el-menu-item>
            <el-menu-item index="/HeatMap1"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/HeatMap1">动态热力图</el-menu-item>
            <el-menu-item index="/lightStyle"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/lightStyle">发光效果后处理</el-menu-item>
            <el-menu-item index="/skyBox"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/skyBox">天空盒</el-menu-item>
            <el-menu-item index="/rain"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/rain">下雨效果</el-menu-item>
            <el-menu-item index="/snow"   style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/snow">下雪效果</el-menu-item>
           </el-sub-menu>
      </el-sub-menu>
      <!-- webGL学习 -->
      <el-sub-menu index="3">
          <template #title>
            <span>原生webGL学习</span>
          </template>
        <el-menu-item index="/webGLImportance" route="/webGLImportance" style="background-image:url('../../前端页面资源/bgc/bgcMain16.gif');">学习原生webGL的必要性</el-menu-item>
        <el-sub-menu index="3-1" style="background-image:url('../../前端页面资源/bgc/bgcMain16.gif');">
            <template #title>webgl编程基础</template>
        <el-menu-item index="/gl_Point" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/gl_Point">webGL绘制一个点</el-menu-item>
        <el-menu-item index="/gl_Rect" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/gl_Rect" >webGL绘制矩形</el-menu-item>
        <el-menu-item index="/gl_Coordinate" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/gl_Coordinate">webGL标准设备坐标</el-menu-item>
        <el-menu-item index="/gl_Matrix" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/gl_Matrix">绘立方体(模型矩阵)</el-menu-item>
        <el-menu-item index="/gl_CubeIndex" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/gl_CubeIndex">绘立方体(索引绘制)</el-menu-item>
        <el-menu-item index="/gl_DepthTest" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/gl_DepthTest">颜色插值,深度测试</el-menu-item>
        <el-menu-item index="/gl_PointLight" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/gl_PointLight">webGL光照(点光源)</el-menu-item>
        <el-menu-item index="/gl_DirLight" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/gl_DirLight">webGL光照(平行光)</el-menu-item>
        <el-menu-item index="/gl_Rotate" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/gl_Rotate">立方体旋转动画(旋转矩阵)</el-menu-item>
        <el-menu-item index="/gl_Texture" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/gl_Texture">纹理贴图(灰度转换)</el-menu-item>
        <el-menu-item index="/gl_Program" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/gl_Program">切换着色器程序</el-menu-item>
        <el-menu-item index="/gl_aMix" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/gl_aMix">透明度与α融合</el-menu-item>
        <el-menu-item index="/gl_Depth&aMix" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/gl_Depth&aMix">深度测试与α融合</el-menu-item>
        <el-menu-item index="/colorChange" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/colorChange">让颜色动起来</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3-2" style="background-image:url('../../前端页面资源/bgc/bgcMain16.gif');">
            <template #title>GLSL着色器之初始化坐标,颜色</template>
            <el-menu-item index="/externalVariable" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/externalVariable">常见外部输入变量</el-menu-item>
            <el-menu-item index="/coordinateCorrection" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/coordinateCorrection">坐标修正</el-menu-item>
            <el-menu-item index="/colorTransform" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/colorTransform">颜色转换</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3-3" style="background-image:url('../../前端页面资源/bgc/bgcMain16.gif');">
            <template #title>GLSL着色器之常用函数</template>
            <el-menu-item index="/abs" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/abs">abs(取绝对值)</el-menu-item>
            <el-menu-item index="/sign" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/sign">sign(大于零取1,小于零取-1)</el-menu-item>
            <el-menu-item index="/ceil" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/ceil">ceil(向上取整)</el-menu-item>
            <el-menu-item index="/floor" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/floor">floor(向下取整)</el-menu-item>
            <el-menu-item index="/step" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/step">step(x的左右取0,1)</el-menu-item>
            <el-menu-item index="/smoothstep" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/smoothstep">smoothstep(带过渡渐变的step)</el-menu-item>
            <el-menu-item index="/minMax" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/minMax">minMax(最大值,最小值)</el-menu-item>
            <el-menu-item index="/mod" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/mod">mod(取余)</el-menu-item>
            <el-menu-item index="/mix" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/mix">mix(混合)</el-menu-item>
            <el-menu-item index="/clamp" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/clamp">clamp(限制变量范围)</el-menu-item>
            <el-menu-item index="/fract" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/fract">fract(取小数位)</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3-4" style="background-image:url('../../前端页面资源/bgc/bgcMain16.gif');">
            <template #title>GLSL着色器之三角函数</template>
            <el-menu-item index="/radiansAndDegrees" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/radiansAndDegrees">radians and degrees(角度弧度转换)</el-menu-item>
            <el-menu-item index="/sinAndCos" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/sinAndCos">sin and cos(正弦函数和余弦函数)</el-menu-item>
            <el-menu-item index="/tan" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/tan">tan(正切函数)</el-menu-item>
            <el-menu-item index="/asinAndAcos" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/asinAndAcos">asin and acos(反正弦,反余弦)</el-menu-item>
            <el-menu-item index="/atan" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/atan">atan(反正切函数)</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3-5" style="background-image:url('../../前端页面资源/bgc/bgcMain16.gif');">
            <template #title>GLSL着色器之几何函数</template>
            <el-menu-item index="/lengthAndDistance" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/lengthAndDistance">length and distance(长度和距离)</el-menu-item>
            <el-menu-item index="/dotCrossNormalize" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/dotCrossNormalize">dot,cross,normalize(点乘,叉乘,归一化)</el-menu-item>
            <el-menu-item index="/radar" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/radar">雷达(上一个的优化)</el-menu-item>
            <el-menu-item index="/faceforward" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/faceforward">faceforward(关于入射角度)</el-menu-item>
            <el-menu-item index="/reflect" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/reflect">reflect(关于向量的入射反射)</el-menu-item>
            <el-menu-item index="/refract" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/refract">refract(关于向量的折射)</el-menu-item>
        </el-sub-menu>    
        <el-sub-menu index="3-6" style="background-image:url('../../前端页面资源/bgc/bgcMain16.gif');">
            <template #title>GLSL着色器之指数与矢量函数</template>
            <el-menu-item index="/pow" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/pow">pow(取次方)</el-menu-item>
            <el-menu-item index="/exp" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/exp">exp(取e的x次方)</el-menu-item>
            <el-menu-item index="/log" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/log">log(取对数)</el-menu-item>
            <el-menu-item index="/vec" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/vec">矢量函数(对vec矢量进行判断)</el-menu-item>
        </el-sub-menu>  
        <el-sub-menu index="3-7" style="background-image:url('../../前端页面资源/bgc/bgcMain16.gif');">
            <template #title >GLSL着色器之随机数,噪音,分型</template> 
            <el-menu-item index="/random" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/random">随机数(取巧的伪随机数)</el-menu-item>
            <el-menu-item index="/noise" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/noise">噪音(有规律的随机数)</el-menu-item>
            <el-menu-item index="/genotyping" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/genotyping">分型(一种特殊的递归)</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3-8" style="background-image:url('../../前端页面资源/bgc/bgcMain16.gif');">
            <template #title>GLSL着色器之shader实战案例</template> 
            <el-menu-item index="/fire" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/fire">火焰效果</el-menu-item>
            <el-menu-item index="/overlaySpecialEffect" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/overlaySpecialEffect">圆环叠加炫酷特效</el-menu-item>
            <el-menu-item index="/fiveStarFlag" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/fiveStarFlag">五星红旗迎风飘</el-menu-item>
            <el-menu-item index="/batteryCharge" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/batteryCharge">充电特效</el-menu-item>
            <el-menu-item index="/rainGlass" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/rainGlass">雨夜归家</el-menu-item>
            <el-menu-item index="/sea" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/sea">海水</el-menu-item>
            <el-menu-item index="/sun" style="background-image:url('../../前端页面资源/bgc/bgcMain11.gif');background-position: bottom 50px right 0px;"   route="/sun">我!就是太阳!</el-menu-item>
        </el-sub-menu>      
      </el-sub-menu>
    <el-sub-menu index="5">
      <template #title><span>关于我的学习历程</span></template>
      
      <el-menu-item route="/LearningJourney" index="/LearningJourney">学习历程</el-menu-item>
      <el-menu-item route="/LearningScence" index="/LearningScence">学习感受</el-menu-item>
      <el-menu-item route="/TimeLine1" index="/TimeLine1">TimeLine</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/ResourceRecommendation" route="/ResourceRecommendation" style="background-image:url('../../前端页面资源/bgc/bgcMain4.gif');"><el-icon><Guide /></el-icon>学习资源推荐</el-menu-item>
    <el-menu-item index="7" disabled>
          <el-icon><document /></el-icon>
          <span>未完待续！</span>
    </el-menu-item>
  </el-menu>
  <!-- 顶部导航栏下彩蛋 -->
   <div>
      <h1 id="navH1">下滑鼠标中键可查看所有案例~~~</h1>
    <div id='canvasAlert' style="opacity:0.6;z-index:10086;pointer-events:none">
<el-image style="width: 60.0px; height: 60.0px;position:fixed;left:0px;top:0px" src="../前端页面资源/钢铁机器人.png" fit="fill" />
  </div>
  <canvas ref="webgl" id='EasterEgg' width="1520" height="1470"></canvas>
   </div>
   <!-- 加载中的提示 -->
   
<div id="alertH1"> 
    <el-image style="margin-bottom:-30px;display:inline-block;
width: 88px;height:88px;opacity:0.6;z-index:-10;" src="../前端页面资源/loading.gif" fit="fill" />
    <h1 style="display:inline-block;padding-bottom:20px;line-height: 1.8em;"  >正在玩命加载中。。。</h1>
</div>

  
  <!-- 网站icon -->
  <div class="webgl"><img src="../前端页面资源/webgl.png" alt=""></div>
  <div class="webgis"><img src="../前端页面资源/webgis.png" alt=""></div>
  <!-- 1px细线 -->
   <div class="hr"></div>
  <!-- <hr/> -->
  <div class="webglBgc"></div>
  
  <!-- 边框 -->
<div style="background-image:url('../../前端页面资源/bgc/bgcMain19.gif');background-color:red;width:2%;height:96%;position:fixed;left:0px;top:60.2px"></div>
<div style="background-image:url('../../前端页面资源/bgc/bgcMain19.gif');background-color:red;width:100%;height:2%;position:fixed;left:0px;bottom:0px"></div>
<div style="background-image:url('../../前端页面资源/bgc/bgcMain19.gif');background-color:red;width:2%;height:90%;position:fixed;right:0px;top:60.2px"></div>
    </div>
</template>
<script lang='ts' setup>
import { ref,onMounted} from 'vue';
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  PictureRounded,
  Position,
  Grid,
  AlarmClock,
  Guide
} from '@element-plus/icons-vue'
let activeIndex = ref('')
const handleSelect = (key: string, keyPath: string[]) => {
  activeIndex=ref(key)
  console.log(key,keyPath);
}
const webgl=ref(null)
onMounted(()=>{
const gl=webgl.value.getContext('webgl')
gl.viewport(0, 0, webgl.value.width, webgl.value.height);
//顶点着色器
const vertexSource=`
attribute vec4 a_pos;
attribute vec2 a_coord;
varying vec2 v_coord;
void main(){
v_coord=a_coord;
gl_Position=a_pos;
}`
//片元着色器
const fragSource=`
// 所有float类型数据的精度是lowp
precision mediump float;
varying vec2 v_coord;
uniform vec2 st;
uniform float u_time;
uniform sampler2D u_sam;
uniform vec2 u_mouse;
const int ITERATIONS = 40;   //use less value if you need more performance
const float SPEED = 1.;

const float STRIP_CHARS_MIN =  7.;
const float STRIP_CHARS_MAX = 40.;
const float STRIP_CHAR_HEIGHT = 0.15;
const float STRIP_CHAR_WIDTH = 0.10;
const float ZCELL_SIZE = 1. * (STRIP_CHAR_HEIGHT * STRIP_CHARS_MAX);  //the multiplier can't be less than 1.
const float XYCELL_SIZE = 12. * STRIP_CHAR_WIDTH;  //the multiplier can't be less than 1.

const int BLOCK_SIZE = 10;  //in cells
const int BLOCK_GAP = 2;    //in cells

const float WALK_SPEED = 1. * XYCELL_SIZE;
const float BLOCKS_BEFORE_TURN = 3.;


const float PI = 3.14159265359;


//        ----  random  ----
float hash(float v) {
    return fract(sin(v)*43758.5453123);
}

float hash(vec2 v) {
    return hash(dot(v, vec2(5.3983, 5.4427)));
}

vec2 hash2(vec2 v)
{
    v = vec2(v * mat2(127.1, 311.7,  269.5, 183.3));
	return fract(sin(v)*43758.5453123);
}

vec4 hash4(vec2 v)
{
    vec4 p =  mat4( 127.1, 311.7,0.0,0.0,
                    269.5, 183.3,0.0,0.0,
                    113.5, 271.9,0.0,0.0,
                    246.1, 124.6,0.0,0.0)*vec4(v,0.0,1.0);
    return fract(sin(p)*43758.5453123);
}

vec4 hash4(vec3 v)
{
    vec4 p = mat4( 127.1, 311.7, 74.7,0.0,
                   269.5, 183.3, 246.1,0.0,
                   113.5, 271.9, 124.6,0.0,
                   271.9, 269.5, 311.7,0.0)*vec4(v,1.0) ;
    return fract(sin(p)*43758.5453123);
}

vec2 rotate(vec2 v, float a) {
    float s = sin(a);
	float c = cos(a);
    mat2 m = mat2(c, -s, s, c);
    return m * v;
}

vec3 rotateX(vec3 v, float a) {
    float s = sin(a);
    float c = cos(a);
    return mat3(1.,0.,0.,0.,c,-s,0.,s,c) * v;
}

vec3 rotateY(vec3 v, float a) {
    float s = sin(a);
    float c = cos(a);
    return mat3(c,0.,-s,0.,1.,0.,s,0.,c) * v;
}

vec3 rotateZ(vec3 v, float a) {
    float s = sin(a);
    float c = cos(a);
    return mat3(c,-s,0.,s,c,0.,0.,0.,1.) * v;
}

float smoothstep1(float x) {
    return smoothstep(0., 1., x);
}
float rune_line(vec2 p, vec2 a, vec2 b) {   // from https://www.shadertoy.com/view/4dcfW8
  p -= a, b -= a;
	float h = clamp(dot(p, b) / dot(b, b), 0., 1.);   // proj coord on line
	return length(p - b * h);                         // dist to segment
}

float rune(vec2 U, vec2 seed, float highlight)
{
	  float d = 1e5;
	for (int i = 0; i < 4; i++)	// number of strokes
	{
        vec4 pos = hash4(seed);
		seed += 1.;

		// each rune touches the edge of its box on all 4 sides
		if (i == 0) pos.y = .0;
		if (i == 1) pos.x = .999;
		if (i == 2) pos.x = .0;
		if (i == 3) pos.y = .999;
		// snap the random line endpoints to a grid 2x3
		vec4 snaps = vec4(2, 3, 2, 3);
		pos = ( floor(pos * snaps) + .5) / snaps;

		if (pos.xy != pos.zw)d = min(d, rune_line(U, pos.xy, pos.zw + .001) ); // closest line
    
	}
	return smoothstep(0.1, 0., d) + highlight*smoothstep(0.4, 0., d);
}
float random_char(vec2 outer, vec2 inner, float highlight) {
    vec2 seed = vec2(dot(outer, vec2(269.5, 183.3)), dot(outer, vec2(113.5, 271.9)));
    return rune(inner, seed, highlight);
}
vec3 rain(vec3 ro3, vec3 rd3, float time) {
    vec4 result = vec4(0.);

    // normalized 2d projection
    vec2 ro2 = vec2(ro3);
    vec2 rd2 = normalize(vec2(rd3));

    bool prefer_dx = abs(rd2.x) > abs(rd2.y);
    float t3_to_t2 = prefer_dx ? rd3.x / rd2.x : rd3.y / rd2.y;

    // at first, horizontal space (xy) is divided into cells (which are columns in 3D)
    // then each xy-cell is divided into vertical cells (along z) - each of these cells contains one raindrop

    ivec3 cell_side = ivec3(step(0., rd3));      //for positive rd.x use cell side with higher x (1) as the next side, for negative - with lower x (0), the same for y and z
    ivec3 cell_shift = ivec3(sign(rd3));         //shift to move to the next cell

    //  move through xy-cells in the ray direction
    float t2 = 0.;  // the ray formula is: ro2 + rd2 * t2, where t2 is positive as the ray has a direction.
    ivec2 next_cell = ivec2(floor(ro2/XYCELL_SIZE));  //first cell index where ray origin is located
    for (int i=0; i<ITERATIONS; i++) {
        ivec2 cell = next_cell;  //save cell value before changing
        float t2s = t2;          //and t

        //  find the intersection with the nearest side of the current xy-cell (since we know the direction, we only need to check one vertical side and one horizontal side)
        vec2 side = vec2(next_cell + cell_side.xy) * XYCELL_SIZE;  //side.x is x coord of the y-axis side, side.y - y of the x-axis side
        vec2 t2_side = (side - ro2) / rd2;  // t2_side.x and t2_side.y are two candidates for the next value of t2, we need the nearest
        if (t2_side.x < t2_side.y) {
            t2 = t2_side.x;
            next_cell.x += cell_shift.x;  //cross through the y-axis side
        } else {
            t2 = t2_side.y;
            next_cell.y += cell_shift.y;  //cross through the x-axis side
        }
        //now t2 is the value of the end point in the current cell (and the same point is the start value in the next cell)

        //  gap cells
        vec2 cell_in_block = fract(vec2(cell) / float(BLOCK_SIZE));
        float gap = float(BLOCK_GAP) / float(BLOCK_SIZE);
        if (cell_in_block.x < gap || cell_in_block.y < gap || (cell_in_block.x < (gap+0.1) && cell_in_block.y < (gap+0.1))) {
            continue;
        }

        //  return to 3d - we have start and end points of the ray segment inside the column (t3s and t3e)
        float t3s = t2s / t3_to_t2;

        //  move through z-cells of the current column in the ray direction (don't need much to check, two nearest cells are enough)
        float pos_z = ro3.z + rd3.z * t3s;
        float xycell_hash = hash(vec2(cell));
        float z_shift = xycell_hash*11. - time * (0.5 + xycell_hash * 1.0 + xycell_hash * xycell_hash * 1.0 + pow(xycell_hash, 16.) * 3.0);  //a different z shift for each xy column
        float char_z_shift = floor(z_shift / STRIP_CHAR_HEIGHT);
        z_shift = char_z_shift * STRIP_CHAR_HEIGHT;
        int zcell = int(floor((pos_z - z_shift)/ZCELL_SIZE));  //z-cell index
        for (int j=0; j<2; j++) {  //2 iterations is enough if camera doesn't look much up or down
            //  calcaulate coordinates of the target (raindrop)
            vec4 cell_hash = hash4(vec3(ivec3(cell, zcell)));
            vec4 cell_hash2 = fract(cell_hash * vec4(127.1, 311.7, 271.9, 124.6));

            float chars_count = cell_hash.w * (STRIP_CHARS_MAX - STRIP_CHARS_MIN) + STRIP_CHARS_MIN;
            float target_length = chars_count * STRIP_CHAR_HEIGHT;
            float target_rad = STRIP_CHAR_WIDTH / 2.;
            float target_z = (float(zcell)*ZCELL_SIZE + z_shift) + cell_hash.z * (ZCELL_SIZE - target_length);
            vec2 target = vec2(cell) * XYCELL_SIZE + target_rad + cell_hash.xy * (XYCELL_SIZE - target_rad*2.);

            //  We have a line segment (t0,t). Now calculate the distance between line segment and cell target (it's easier in 2d)
            vec2 s = target - ro2;
            float tmin = dot(s, rd2);  //tmin - point with minimal distance to target
            if (tmin >= t2s && tmin <= t2) {
                float u = s.x * rd2.y - s.y * rd2.x;  //horizontal coord in the matrix strip
                if (abs(u) < target_rad) {
                    u = (u/target_rad + 1.) / 2.;
                    float z = ro3.z + rd3.z * tmin/t3_to_t2;
                    float v = (z - target_z) / target_length;  //vertical coord in the matrix strip
                    if (v >= 0.0 && v < 1.0) {
                        float c = floor(v * chars_count);  //symbol index relative to the start of the strip, with addition of char_z_shift it becomes an index relative to the whole cell
                        float q = fract(v * chars_count);
                        vec2 char_hash = hash2(vec2(c+char_z_shift, cell_hash2.x));
                        if (char_hash.x >= 0.1 || c == 0.) {  //10% of missed symbols
                            float time_factor = floor(c == 0. ? time*5.0 :  //first symbol is changed fast
                                    time*(1.0*cell_hash2.z +   //strips are changed sometime with different speed
                                            cell_hash2.w*cell_hash2.w*4.*pow(char_hash.y, 4.)));  //some symbols in some strips are changed relatively often
                            float a = random_char(vec2(char_hash.x, time_factor), vec2(u,q), max(1., 3. - c/2.)*0.2);  //alpha
                            a *= clamp((chars_count - 0.5 - c) / 2., 0., 1.);  //tail fade
                            if (a > 0.) {
                                float attenuation = 1. + pow(0.06*tmin/t3_to_t2, 2.);
                                vec3 col = (c == 0. ? vec3(0.67, 1.0, 0.82) : vec3(0.25, 0.80, 0.40)) / attenuation;
                                float a1 = result.a;
                                result.a = a1 + (1. - a1) * a;
                                result.xyz = (result.xyz * a1 + col * (1. - a1) * a) / result.a;
                                if (result.a > 0.98)  return result.xyz;
                            }
                        }
                    }
                }
            }
            // not found in this cell - go to next vertical cell
            zcell += cell_shift.z;
        }
        // go to next horizontal cell
    }

    return result.xyz * result.a;
}



void main() {
   if (STRIP_CHAR_WIDTH > XYCELL_SIZE || STRIP_CHAR_HEIGHT * STRIP_CHARS_MAX > ZCELL_SIZE) {
        // error
        gl_FragColor = vec4(1., 0., 0., 1.);
        return;
    }
    vec2 uv = (gl_FragCoord.xy * 2. - st.xy) / st.y;

    float time = u_time * SPEED;
    const float turn_rad = 0.25 / BLOCKS_BEFORE_TURN;   //0 .. 0.5
    const float turn_abs_time = (PI/2.*turn_rad) * 1.5;  //multiplier different than 1 means a slow down on turns
    const float turn_time = turn_abs_time / (1. - 2.*turn_rad + turn_abs_time);  //0..1, but should be <= 0.5

    float level1_size = float(BLOCK_SIZE) * BLOCKS_BEFORE_TURN * XYCELL_SIZE;
    float level2_size = 4. * level1_size;
    float gap_size = float(BLOCK_GAP) * XYCELL_SIZE;

    vec3 ro = vec3(gap_size/2., gap_size/2., 0.);
    vec3 rd = vec3(uv.x, 2.0, uv.y);

    float tq = fract(time / (level2_size*4.) * WALK_SPEED);  //the whole cycle time counter
    float t8 = fract(tq*4.);  //time counter while walking on one of the four big sides
    float t1 = fract(t8*8.);  //time counter while walking on one of the eight sides of the big side

    vec2 prev;
    vec2 dir;
    if (tq < 0.25) {
        prev = vec2(0.,0.);
        dir = vec2(0.,1.);
    } else if (tq < 0.5) {
        prev = vec2(0.,1.);
        dir = vec2(1.,0.);
    } else if (tq < 0.75) {
        prev = vec2(1.,1.);
        dir = vec2(0.,-1.);
    } else {
        prev = vec2(1.,0.);
        dir = vec2(-1.,0.);
    }

    float angle = floor(tq * 4.);  //0..4 wich means 0..2*PI

    prev *= 4.;

    const float first_turn_look_angle = 0.4;
    const float second_turn_drift_angle = 0.5;
    const float fifth_turn_drift_angle = 0.25;

    vec2 turn;
    float turn_sign = 0.;
    vec2 dirL = rotate(dir, -PI/2.);
    vec2 dirR = -dirL;
    float up_down = 0.;
    float rotate_on_turns = 1.;
    float roll_on_turns = 1.;
    float add_angel = 0.;
    if (t8 < 0.125) {
        turn = dirL;
        //dir = dir;
        turn_sign = -1.;
        angle -= first_turn_look_angle * (max(0., t1 - (1. - turn_time*2.)) / turn_time - max(0., t1 - (1. - turn_time)) / turn_time * 2.5);
        roll_on_turns = 0.;
    } else if (t8 < 0.250) {
        prev += dir;
        turn = dir;
        dir = dirL;
        angle -= 1.;
        turn_sign = 1.;
        add_angel += first_turn_look_angle*0.5 + (-first_turn_look_angle*0.5+1.0+second_turn_drift_angle)*t1;
        rotate_on_turns = 0.;
        roll_on_turns = 0.;
    } else if (t8 < 0.375) {
        prev += dir + dirL;
        turn = dirR;
        //dir = dir;
        turn_sign = 1.;
        add_angel += second_turn_drift_angle*sqrt(1.-t1);
        //roll_on_turns = 0.;
    } else if (t8 < 0.5) {
        prev += dir + dir + dirL;
        turn = dirR;
        dir = dirR;
        angle += 1.;
        turn_sign = 0.;
        up_down = sin(t1*PI) * 0.37;
    } else if (t8 < 0.625) {
        prev += dir + dir;
        turn = dir;
        dir = dirR;
        angle += 1.;
        turn_sign = -1.;
        up_down = sin(-min(1., t1/(1.-turn_time))*PI) * 0.37;
    } else if (t8 < 0.750) {
        prev += dir + dir + dirR;
        turn = dirL;
        //dir = dir;
        turn_sign = -1.;
        add_angel -= (fifth_turn_drift_angle + 1.) * smoothstep1(t1);
        rotate_on_turns = 0.;
        roll_on_turns = 0.;
    } else if (t8 < 0.875) {
        prev += dir + dir + dir + dirR;
        turn = dir;
        dir = dirL;
        angle -= 1.;
        turn_sign = 1.;
        add_angel -= fifth_turn_drift_angle - smoothstep1(t1) * (fifth_turn_drift_angle * 2. + 1.);
        rotate_on_turns = 0.;
        roll_on_turns = 0.;
    } else {
        prev += dir + dir + dir;
        turn = dirR;
        //dir = dir;
        turn_sign = 1.;
        angle += fifth_turn_drift_angle * (1.5*min(1., (1.-t1)/turn_time) - 0.5*smoothstep1(1. - min(1.,t1/(1.-turn_time))));
    }
    if (u_mouse.x > 10. || u_mouse.y > 10.) {
        vec2 mouse = u_mouse.xy / st.xy * 2. - 1.;
        up_down = -0.7 * mouse.y;
        angle += mouse.x;
        rotate_on_turns = 1.;
        roll_on_turns = 0.;
    } else {
        angle += add_angel;
    }

    rd = rotateX(rd, up_down);
     vec2 p;
    if (turn_sign == 0.) {
        //  move forward
        p = prev + dir * (turn_rad + 1. * t1);
    }
    else if (t1 > (1. - turn_time)) {
        //  turn
        float tr = (t1 - (1. - turn_time)) / turn_time;
        vec2 c = prev + dir * (1. - turn_rad) + turn * turn_rad;
        p = c + turn_rad * rotate(dir, (tr - 1.) * turn_sign * PI/2.);
        angle += tr * turn_sign * rotate_on_turns;
        rd = rotateY(rd, sin(tr*turn_sign*PI) * 0.2 * roll_on_turns);  //roll
    }  else  {
        //  move forward
        t1 /= (1. - turn_time);
        p = prev + dir * (turn_rad + (1. - turn_rad*2.) * t1);
    }

    rd = rotateZ(rd, angle * PI/2.);

    ro.xy += level1_size * p;

    ro += rd * 0.3;
    rd = normalize(rd);

    vec3 col = rain(ro, rd, time);
    col.rgb-=0.1;
    vec4 fragColor = vec4(col, 1.);


 


  gl_FragColor=fragColor;

}
`
//初始化着色器
const program=initShader(gl,vertexSource,fragSource)
//加载纹理
const data=new Float32Array([
    1.0,1.0,1.0,  1.0,1.0,
    -1.0,1.0,1.0, 0.0,1.0,
    -1.0,-1.0,.5,0.0,0.0,
    1.0,1.0,1.0,  1.0,1.0,
    -1.0,-1.0,1.0,0.0,0.0,
    1.0,-1.0,.5, 1.0,0.0   //面1
])
console.log(data.BYTES_PER_ELEMENT);
const pos=gl.getAttribLocation(program,'a_pos')
const uv=gl.getAttribLocation(program,'a_coord')
const sam=gl.getUniformLocation(program,'u_sam')
const buffer=gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER,buffer)
gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW)
gl.vertexAttribPointer(pos,3,gl.FLOAT,false,4*5,0)
gl.enableVertexAttribArray(pos)
gl.vertexAttribPointer(uv,2,gl.FLOAT,false,4*5,4*3)
gl.enableVertexAttribArray(uv)
//创建纹理图片
const img=new Image()
img.src='../../../webGL资源/科比.jpg'
img.onload=()=>{
const texture=gl.createTexture()
gl.activeTexture(gl.TEXTURE0)
gl.bindTexture(gl.TEXTURE_2D,texture)
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
//设置纹理贴图填充方式(纹理贴图像素尺寸大于顶点绘制区域像素尺寸)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
//设置纹理贴图填充方式(纹理贴图像素尺寸小于顶点绘制区域像素尺寸)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
//设置纹素格式，jpg格式对应gl.RGB
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
gl.uniform1i(sam, 0);//纹理缓冲区单元TEXTURE0中的颜色数据传入片元着色器
// gl.getProgramInfoLog(program);
//开启深度测试
gl.enable(gl.DEPTH_TEST)
//开启抗锯齿
gl.enable(gl.DITHER)

gl.drawArrays(gl.TRIANGLES,0,6)


}
//把画布坐标传给他
const xy=gl.getUniformLocation(gl.program,'st')
gl.uniform2f(xy,window.innerWidth,window.innerHeight)
//鼠标位置
webgl.value.addEventListener('mousemove',(e)=>{
const X=e.offsetX
const Y=-e.offsetY+670
//把X,Y坐标传给着色器
const mouse=gl.getUniformLocation(gl.program,'u_mouse')
gl.uniform2f(mouse,X,Y)

})
//传入时间
const time=gl.getUniformLocation(gl.program,'u_time')
let Time=0;
function loop(){
    Time+=0.02;
    gl.uniform1f(time,Time)
    requestAnimationFrame(loop)
    gl.drawArrays(gl.TRIANGLES,0,6)
}
loop()

})
function initShader(gl,vertexSource,fragSource){
const program=gl.createProgram()
const vsShader=gl.createShader(gl.VERTEX_SHADER)
const fsShader=gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(vsShader,vertexSource)
gl.shaderSource(fsShader,fragSource)
gl.compileShader(vsShader)
gl.compileShader(fsShader)
gl.attachShader(program,vsShader)
gl.attachShader(program,fsShader)
gl.linkProgram(program)
gl.useProgram(program)
gl.program=program
return program
}

</script>

<style scoped>

.hr{
  position: absolute;
  left: 0px;
  height: 1px;
  width: 160px;
  top:59.1px;
  z-index: 1000;
  background-color: #e0dbdb;
  cursor: pointer;
}
.webgl{
  position:absolute;
  left: 96px;
  top: -3px;
  z-index: 111;
  cursor: pointer;
}
.webgis{
  position:absolute;
  left: 10px;
  top: -3px;
  z-index: 111;
  cursor: pointer;
}
.webglBgc{
  position: absolute;
  left: 0px;
  top:0px;
  background-color: #303133;
  background-image:url('../../前端页面资源/bgc/bgcMain4.gif');
  width: 160px;
  height: 59.3px;
  cursor: pointer;
  z-index:10
}
#menu{
  width: 100%;
}
.tac{
    position:absolute;
    left: 0px;
    top:60px
}
.el-menu-vertical-demo{
   width: 280px;
    position: absolute;
}
.el-menu-demo{
  display: flex;
  justify-content: start;
  position: fixed;
  width:89.6%;
  left:160px;
  top: 0px;
  z-index: 1;
}
.alert{
  position: fixed;
  top:60.1px;
  opacity: 0.8;
  font-size:1px;
  text-overflow: ellipsis;
  width: 100%;
  right:0px;
  z-index: 8;
  color:rgb(255, 255, 255);
  padding-right: 30px;
}

hr{
  color: #5d00ff;
}
#EasterEgg{
background-color:red;
position:fixed;
left:0px;
top:0px;
z-index:-20
}
#navH1{
position: fixed;
margin-left: 60px;
left: 0px;
color: rgb(0, 251, 255);
font-family:'cursive';
text-shadow:
    1px 1px 2px black,
    0 0 2em rgb(255, 255, 255),
    0 0 2.2em rgb(86, 245, 0);
  font:
    1.8em Georgia,
    "Bitstream Charter",
    "URW Bookman L",
    "Century Schoolbook L",
    serif;
opacity: 0.9;
margin-top: 10px;
border-radius: 10px;
top: 0px;
}
#alertH1{
position: fixed;
left: 20%;
top: 30%;
margin-right:100px;
color: rgb(0, 251, 255);
font-family:'cursive';
text-shadow:
    1px 1px 2px black,
    0 0 2em rgb(255, 255, 255),
    0 0 2.2em rgb(86, 245, 0);
font:
    1.8em Georgia,
    "Bitstream Charter",
    "URW Bookman L",
    "Century Schoolbook L",
    serif;
border-radius: 10px;
z-index:-10
}
</style>