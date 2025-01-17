<template>
  <el-scrollbar height="86%">
  <div>
  <el-card style="margin-right:2%;background-image:url('../../前端页面资源/bgc/bgcMain12.gif');min-width:220px;max-width: 220px;float:right;background-color:#363434;width:30%">
    <template #header><p>学习感受</p></template>
    <img
      src="../../前端页面资源/image1.jpg"
      style="width: 100%;opacity:0.8"
    />

  <el-card style="background-image:url('../../前端页面资源/bgc/bgcMain4.gif');max-width: 480px;background-color:#363434">
    <p style="font-size: 16px;color:yellow">道阻且长,行则将至。</p>
  </el-card>


  </el-card>

    <h1 id="about">学习感受</h1>
    <div id="text" style="margin-right: 260px;">
      <p id="textP" style="line-height: 1.6;">从原生webGL到后面的THREE和Cesium,这整个学习战线拉的是非常的长。个人的学习感受是开始的时候不想学,一遇到点
看不懂的就想摆烂。学到中间的时候非常上头就是喜欢钻研着学,有时候一个API会反复研究一整天。但是到了后面就是三天打鱼两天
晒网了,每天看看文档,看看源码随缘学。但不管学多少,我每天都会坚持着学。最后也是靠时间堆出来了。如果要说感受的话感觉可以总结成：
坚持学习就是对自己最好的投资。
</p>


    </div>
<div id="text" style="margin-right: 260px;">
  <p id="textP" style="color:yellow;line-height: 1.6;">
学了这么长时间对之前看黑马Java的阿伟老师的结语真的有感触。现在社会是浮躁的,总有人想在一天两天的时间内carry所有人
。技术是需要时间沉淀的,耐不住寂寞也注定学不好技术。
</p>
</div>
<div id="text" style="margin-right: 260px;line-height: 1.6;">
  <p id="textP" style="color: gold;">道阻且长，行则将至。加油吧,孩子们!</p>
</div>

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

#about{
  margin-left: 3%;
    color: rgb(91, 253, 4);
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
#say{
  color: red;
}
#say1{
  color: rgb(0, 119, 255);
}
#textP{
    color: rgb(255, 166, 0);

text-shadow:
    1px 1px 2px black,
    0 0 2em rgb(255, 255, 255),
    0 0 2.2em rgb(0, 0, 0);
 
font: bold small-caps italic 1.0em 'Roboto', Courier, monospace;
 
  box-shadow: 0px 5px 10px  rgba(2, 95, 255, 0.708) ,0px -5px 10px  rgba(2, 95, 255, 0.708); 
opacity: 0.9;
margin-top: 10px;
border-radius: 10px;
}
#text{
  margin-left: 3%;
  margin-bottom: 30px;
  color: rgb(0, 255, 204);
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

  box-shadow: 0px 5px 10px  rgb(4, 218, 218) ,0px -5px 10px  rgb(7, 235, 220); 
opacity: 0.8;
margin-top: 10px;
border-radius: 10px;

}
</style>