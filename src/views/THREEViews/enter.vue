<template>
<div id="container">
    <div id="main">
      <p>Three.js是一个基于WebGL的JavaScript库，它简化了在网页浏览器中创建和显示3D图形的过程。Three.js提供了一套丰富的API，使得开发者能够轻松地构建复杂的3D场景和动画，而无需深入了解底层的WebGL编程细节。
Three.js的核心概念

1. 场景（Scene）：场景是所有3D对象的容器，可以看作是3D世界的基础框架。在场景中，你可以添加各种3D对象，如几何体、光源、相机等。

2. 相机（Camera）：相机决定了用户从哪个角度观察场景。Three.js提供了多种类型的相机，其中最常用的是透视相机（PerspectiveCamera），它模拟了人眼的视觉效果。

3. 渲染器（Renderer）：渲染器负责将场景和相机的视图渲染成2D图像，并显示在网页上。Three.js中最常用的渲染器是`WebGLRenderer`。

Three.js的使用步骤

1. 引入Three.js库：首先，需要在HTML文件中引入Three.js库。可以通过CDN链接或者下载Three.js文件到本地后引入。

2. 创建场景：创建一个`THREE.Scene`对象作为3D世界的容器。

3. 设置相机：创建一个`THREE.PerspectiveCamera`对象，并设置其参数，如视场角、宽高比、近平面和远平面。

4. 创建渲染器：创建一个`THREE.WebGLRenderer`对象，并将其添加到HTML文档中。

5. 添加对象到场景：创建几何体、材质、网格（Mesh）等，并将它们添加到场景中。

6. 渲染场景：使用渲染器将场景和相机的视图渲染到网页上，并通过循环调用渲染函数来更新场景。

Three.js的优势

- 易用性：Three.js封装了WebGL的复杂性，使得开发者可以更专注于3D内容的创建，而不是底层的图形编程。
- 强大的功能：提供了丰富的几何体、材质、光源、阴影、动画等特性，支持创建高质量的3D视觉效果。
- 社区支持：拥有活跃的社区和丰富的学习资源，包括教程、示例和插件等。

Three.js的适用场景

- Web 3D可视化：用于创建产品展示、建筑可视化、数据可视化等。
- 交互式3D应用：游戏、教育、艺术展示等领域的交互式3D体验。
- 增强现实（AR）和虚拟现实（VR）：Three.js支持WebVR和WebAR，可以用于开发VR和AR应用。
</p>
    </div>
    <div id="inner">
    <p>
  Three.js在地理信息系统（GIS）中的应用主要体现在其强大的3D可视化能力上。GIS通常涉及地图、地理数据和空间分析，而Three.js可以用来创建交互式的3D地图和地理数据可视化，为用户提供更加直观和沉浸式的体验。

 1. 3D地图展示
- 地形可视化：Three.js可以用来展示地形的3D模型，包括山脉、山谷等自然地形特征。
- 建筑物和城市模型：可以创建建筑物的3D模型，并在地图上进行展示，用于城市规划、旅游导览等。
- 地理数据叠加：可以在3D地图上叠加各种地理数据，如温度、降雨量等，以颜色或形状变化的形式展示。
 2. 空间分析
- 路径规划：在3D环境中模拟路径规划，例如模拟车辆或行人的移动路径。
- 视线分析：分析特定点的可见性，例如评估建筑物之间的视线是否被遮挡。
- 地形分析：分析地形特征，如坡度、坡向等，用于土地使用规划和环境评估。
 3. 交互式数据探索
- 数据点展示：在3D地图上展示数据点，如人口分布、交通流量等，并允许用户通过交互来探索数据。
- 信息提示和图层控制：提供交互式的工具，如鼠标悬停提示信息、图层开关等，让用户可以控制显示哪些数据。
 4. 虚拟现实（VR）和增强现实（AR）
- VR GIS体验：利用Three.js创建虚拟现实环境，用户可以佩戴VR设备来探索虚拟的地理空间。
- AR GIS应用：结合WebAR技术，Three.js可以用来创建增强现实应用，将3D模型叠加到现实世界的视图中。
 实现步骤
1. 获取地理数据：首先需要获取地理数据，这可能包括地形数据、卫星图像、GIS矢量数据等。
2. 数据处理：将获取的地理数据转换为Three.js可以使用的格式，如将矢量数据转换为网格（Mesh）。
3. 创建3D场景：使用Three.js创建一个3D场景，并设置合适的相机和光源。
4. 添加地理模型：将处理好的地理数据添加到Three.js场景中，创建地形、建筑物等3D模型。
5. 交互和分析：添加必要的交互功能和空间分析工具，如鼠标事件监听、路径计算等。
6. 优化和测试：优化性能，确保应用在不同的设备和浏览器上都能流畅运行，并进行充分的测试。
</p>
    </div>
    <div id="mine">
     <h4>关于THREE.JS李某的个人见解如下:</h4>
     <hr>
     <p>
     作为一个由webGL封装成的库,他多是用来处理模型,来实现可视化的,他不单可以用于GIS领域,他涉及的领域很广。像机械
     物联网,互联网。。。等等多个行业都有其对应的应用。由于李某是GISer而又不想干传统的数据处理,所以就决定学习一下webGIS谁
     知道一入GIS深似海,webGIS这块东西可真比纯前端多多了,感觉完全就是另一个赛道,虽然现在学的已经很多了,但感觉完全就是没有尽头
     谁知道呢,先学为上,其实在学习THREE.js之前我对webGL有一个比较深入的了解。也了解过GLSL着色器语言。cesium也了解过
     这里是进行一个系统的学习。后面可能也会系统的学习一下cesium,总有一天我会成为顶级社畜！
     </p>
    </div>
    <div id="shui"> </div>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>

#main{
  position: absolute;
  left: 0px;
  top:0px;
  width: 648px; 
  height: 487px;
  color: chartreuse;
  background-color: red;
  background-image: url('../../前端页面资源/image.png');
  background-repeat: no-repeat;
  background-size: contain;
}
#inner{
 position: absolute;
 left: 670px;
 top: 0px;
color: red;
width: 700px; 
  height: 487px;
   background-image: url('../../前端页面资源/image1.jpg');
  background-repeat: no-repeat;
  background-size: contain;
  background-color: aqua;
}
body{
  background-image: url('../../前端页面资源/image.png');
  background-repeat: no-repeat;
  background-size: contain;
}
#mine{
  position: absolute;
  left: -152px;
  top: -50px;
  width: 150px;
  height: 720px;
  background-color: aqua;
}
#shui{
  position: absolute;
  top:490px;
  left: 0px;
  width: 1370px;
  height: 180px;
  background-color: aqua;
  background-image: url('../../前端页面资源/image2.jpg');
  background-size: contain;
}
</style>