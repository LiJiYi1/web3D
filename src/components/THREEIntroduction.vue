<template>

  <el-scrollbar height="86%" style="margin-left:2%;">
  <el-card style="background-image:url('/前端页面资源/bgc/bgcMain10.gif');min-width:220px;max-width: 220px;margin-top:45px;margin-right:2%;float:right;opacity:0.9;background-color:#363434;width:30%">
    <template #header><p>THREE.JS介绍</p></template>
    <img
      src="/前端页面资源/THREEIcon1.jpg"
      style="width: 100%;opacity:0.5"
    />
  <el-card style="background-image:url('/前端页面资源/bgc/bgcMain4.gif');max-width: 100%;background-color:#363434;" >
    <p style="opacity:1.0"><a style="color: yellow;" href="http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/animation/AnimationAction" target="_blank">THREE.JS手册</a></p>
  </el-card>

  </el-card>
<h1 id="about">THREE.JS介绍</h1>
<div id="text" style="margin-right:260px;">
<p id="textP" style=" line-height: 1.6">THREE.js是一个基于WebGL的开源JavaScript库,旨在简化在网页上创建和显示3D图形的流程。它通过提供一系列高级API,隐藏了
WebGL的复杂性,使得开发者可以更专注于创意和逻辑实现,而不是底层的图形渲染细节。THREE.js的主要特点包括易用性、跨平台支
持、丰富的功能、扩展性,以及一个活跃的社区和丰富的第三方库,这些特点使得它被广泛应用于各种Web项目中,如网页游戏、数据可
视化、产品展示、建筑与室内设计、艺术与娱乐、教育与培训等场景。
‌易用性:THREE.js提供简洁的API,使得创建3D场景变得简单快捷。
‌跨平台支持‌:支持所有现代浏览器,包括移动设备。
‌丰富的功能‌：内置多种几何体、材质、光源、动画和交互功能。
‌扩展性‌：支持加载外部模型和纹理,以及自定义着色器。
‌社区支持‌：拥有活跃的社区和丰富的第三方库,便于学习和扩展。
THREE.js的核心概念包括场景(Scene)、相机(Camera)、渲染器(Renderer)、光源(Light)、材质(Material)和几何体(Geometry)。场景是所有对象的容器,相机定义了观察场景的视角,渲染器将场景和相机中的物体渲染到HTML5画布上,光源用于模拟真实世界中的光照效果,材质决定了物体的外观和表面特性,而几何体定义了物体的形状和结构。这些组件共同协作,在浏览器中创建和渲染3D图形。</p>
</div>
<br>
<h1 id="about">THREE.JS与GIS结合</h1>
<div id="text" style="margin-right:3%"> 
<p id="textP" style=" line-height: 1.6">
  THREE.JS 与 GIS 结合
将Three.js与GIS结合,可以创建出具有高度交互性和视觉吸引力的三维地理空间应用。这种结合可以带来以下优势：
1. 三维可视化:GIS擅长处理和分析地理数据,而Three.js可以将这些数据转换为三维模型,提供更加直观的视觉体验。例如,可以将地形数据、建筑物模型、植被覆盖等以三维形式展示。
2. 交互性增强:Three.js提供的交互功能可以增强GIS应用的用户体验。用户可以旋转、缩放、平移三维场景,甚至与场景中的对象进行交互,如查询特定地点的信息。
3. 动态数据展示:GIS数据往往包含时间维度,Three.js可以用来展示这些动态变化的数据,如天气模式、交通流量等,通过动画或实时更新来展示数据随时间的变化。
可用于城市规划:三维城市模型可以用于展示规划方案,帮助决策者和公众更好地理解规划意图。
可用于环境模拟:展示地形、植被、水流等自然环境的三维模型,用于环境影响评估。
</p>

</div>
<br>
<h1 id="about">THREE.JS学前基础</h1>
<div id="text" style="margin-right:3%">
  <p id="textP" style=" line-height: 1.6">
    学习Three.js(一个基于WebGL的JavaScript库,用于在网页上创建和显示3D图形)通常需要以下基础知识：
1. 基础的HTML和CSS:了解如何构建网页结构和样式,因为Three.js通常用于Web环境中。

2. JavaScript编程基础:Three.js是JavaScript库,因此需要对JavaScript有基本的理解,包括变量、函数、对象、数组、事件处理等。

3. WebGL基础:虽然Three.js的目的是简化WebGL的使用,但对WebGL的基本概念(如场景、相机、渲染器、几何体、材质、光照等)有所了解会很有帮助。

4. 数学基础:3D图形编程涉及较多的数学知识,特别是线性代数(向量、矩阵运算)和三角学(角度、旋转等)。不需要非常深入,但基本概念的理解是必要的。

5. 计算机图形学基础:了解基本的图形学概念,如渲染管线、纹理映射、光照模型等,有助于更好地理解和使用Three.js。

6. 版本控制知识:虽然不是必须的,但了解如何使用版本控制系统(如Git)对于管理项目和协作非常有帮助。

7. 调试和问题解决技能:在开发过程中,能够有效地调试和解决问题是非常重要的。
如果你是编程新手,建议从基础的JavaScript开始学习,然后逐步深入到Three.js。网络上有许多优秀的教程和文档可以帮助你开始学习Three.js，例如Three.js官方文档、在线课程、以及各种视频教程。随着实践的积累，你会逐渐掌握Three.js的使用，并能够创建自己的3D项目。
  </p>
</div>

 <div style="width: 100%;height:100%;position:absolute;left:0px;top:0px;z-index:-1">
    <canvas ref="webgl" id='webGL' width="1520" height="1470"></canvas>
  </div>
  </el-scrollbar>

</template>

<script setup>

import { onMounted,ref } from 'vue';
const webgl=ref(null)

onMounted(()=>{
const gl=webgl.value.getContext('webgl')

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
// by srtuss, 2013

// rotate position around axis
vec2 rotate(vec2 p, float a)
{
	return vec2(p.x * cos(a) - p.y * sin(a), p.x * sin(a) + p.y * cos(a));
}

// 1D random numbers
float rand(float n)
{
    return fract(sin(n) * 43758.5453123);
}

// 2D random numbers
vec2 rand2(in vec2 p)
{
	return fract(vec2(sin(p.x * 591.32 + p.y * 154.077), cos(p.x * 391.32 + p.y * 49.077)));
}

// 1D noise
float noise1(float p)
{
	float fl = floor(p);
	float fc = fract(p);
	return mix(rand(fl), rand(fl + 1.0), fc);
}

// voronoi distance noise, based on iq's articles
float voronoi(in vec2 x)
{
	vec2 p = floor(x);
	vec2 f = fract(x);
	
	vec2 res = vec2(8.0);
	for(int j = -1; j <= 1; j ++)
	{
		for(int i = -1; i <= 1; i ++)
		{
			vec2 b = vec2(i, j);
			vec2 r = vec2(b) - f + rand2(p + b);
			
			// chebyshev distance, one of many ways to do this
			float d = max(abs(r.x), abs(r.y));
			
			if(d < res.x)
			{
				res.y = res.x;
				res.x = d;
			}
			else if(d < res.y)
			{
				res.y = d;
			}
		}
	}
	return res.y - res.x;
}

void main() {
   float flicker = noise1(u_time * 2.0) * 0.8 + 0.4;

    vec2 uv = gl_FragCoord.xy / st.xy;
	  uv = (uv - 0.5) * 2.0;
	  vec2 suv = uv;
	  uv.x *= st.x / st.y;
	
	
	  float v = 0.0;
	
	//  that looks highly interesting:
	// v = 1.0 - length(uv) * 1.3;
	
	
	// a bit of camera movement
	uv *= 0.6 + sin(u_time * 0.1) * 0.4;
	uv = rotate(uv, sin(u_time * 0.3) * 1.0);
	uv += u_time * 0.4;
	
	
	// add some noise octaves
	float a = 0.6, f = 1.0;
	
	for(int i = 0; i < 3; i ++) // 4 octaves also look nice, its getting a bit slow though
	{	
		float v1 = voronoi(uv * f + 5.0);
		float v2 = 0.0;
		
   	// make the moving electrons-effect for higher octaves
		if(i > 0)
		{
			// of course everything based on voronoi
			v2 = voronoi(uv * f * 0.5 + 50.0 + u_time);
			
			float va = 0.0, vb = 0.0;
			va = 1.0 - smoothstep(0.0, 0.1, v1);
			vb = 1.0 - smoothstep(0.0, 0.08, v2);
			v += a * pow(va * (0.5 + vb), 2.0);
		}
		
	//  make sharp edges
		v1 = 1.0 - smoothstep(0.0, 0.3, v1);
		
	// 	noise is used as intensity map
	 	v2 = a * (noise1(v1 * 5.5 + 0.1));
		
	// 	 octave 0's intensity changes a bit
		if(i == 0)
			v += v2 * flicker;
		else
			v += v2;
		
		f *= 3.0;
		a *= 0.7;
	 }

	// slight vignetting
	v *= exp(-0.6 * length(suv)) * 1.2;

	
	// // old blueish color set
	vec3 cexp = vec3(6.0, 4.0, 2.0);
	
	vec3 col = vec3(pow(v, cexp.x), pow(v, cexp.y), pow(v, cexp.z)) * 2.0;
	
	vec4 fragColor = vec4(col, 1.0);
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
img.src='/../webGL资源/科比.jpg'
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

p{
  color: rgb(255, 255, 255);
  font-family:'cursive';
   text-shadow:
    1px 1px 2px black,
    0 0 1em blue,
    0 0 0.2em blue;
  font:
    1.2em Georgia,
    "Bitstream Charter",
    "URW Bookman L",
    "Century Schoolbook L",
    serif;
}
el-scrollbar{
  margin-top: 2%;
  width: 80%;
  height: 100%;
}

#about{
     margin-left: 20px;
    color: rgb(195, 255, 0);
    font-family:'cursive';
   text-shadow:
    1px 1px 2px black,
    0 0 2.1em rgb(236, 22, 22),
    0 0 1.2em rgb(255, 255, 255);
  font:
    2.0em Georgia,
    "Bitstream Charter",
    "URW Bookman L",
    "Century Schoolbook L",
    serif;
}
#text{
     margin-left: 20px;
  color: rgb(0, 251, 255);
 
  font-family:'cursive';
text-shadow:
    1px 1px 2px black,
    0 0 2em rgb(255, 255, 255),
    0 0 2.2em rgb(86, 245, 0);
  font:
    1.2em Georgia,
    "Bitstream Charter",
    "URW Bookman L",
    "Century Schoolbook L",
    serif;
 
  box-shadow: 0px 5px 10px  rgba(2, 95, 255, 0.708) ,0px -5px 10px  rgba(2, 95, 255, 0.708); 
opacity: 0.9;
margin-top: 10px;
border-radius: 10px;

}
#textP{
    color: rgb(0, 251, 255);

text-shadow:
    1px 1px 2px black,
    0 0 2em rgb(255, 255, 255),
    0 0 2.2em rgb(86, 245, 0);
 
font: bold small-caps italic 1.0em 'Roboto', Courier, monospace;
 
  box-shadow: 0px 5px 10px  rgba(2, 95, 255, 0.708) ,0px -5px 10px  rgba(2, 95, 255, 0.708); 
opacity: 0.9;
margin-top: 10px;
border-radius: 10px;
}
</style>