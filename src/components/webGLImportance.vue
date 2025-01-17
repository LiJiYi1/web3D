<template>
 <el-scrollbar height="86%">
  <div>     
      <el-card style="background-image:url('/前端页面资源/bgc/bgcMain12.gif');min-width:220px;max-width: 220px;float:right; margin-right:2%;margin-top:50px;background-color:#363434;width:30%;">
    <template #header><p>学习webGL的必要性</p></template>
    <img
      src="/前端页面资源/image3.jpg"
      style="width: 100%;opacity:0.6"
    />
  <el-card style="background-image:url('/前端页面资源/bgc/bgcMain4.gif');max-width: 480px;background-color:#363434">
  <p><a style="color: yellow;" href="https://developer.mozilla.org/zh-CN/" target="_blank">MDN可查文档</a></p>
  </el-card>


  </el-card>
    <h1 id="about">关于Web3D开发</h1>
    <div id="text" style="margin-right:260px;">
      <p id="textP" style=" line-height: 1.6;">
               就个人的感觉而言:如果只做一个调库侠的话,确实是用不到多少着色器。THREE和Cesium经过多个版本。
      基础功能已经封装的很好了。想要做什么基本上都有对应的API。像是THREE的贴图,里面option配置项啥都有。
      又或者说是THREE的Geometry。Cesium的entity和primitive在大部分场景是都能够使用的并且完成效果。<br>
      所以如果只是做一个入门级别的调库侠的话对WebGL方面的要求还是很低的,或者说完全没有webGL基础,只要会看文档就能够实现想要的效果
      。换句话说就是上手门槛比较低。照着文档就能很快的构建基础效果。
      </p>

    
    </div>
   
    <br>
    <h1 id="about">webGL在THREE和Cesium里的作用</h1>
    <div id="text" style="margin-right:260px;">
      <p id="textP" style=" line-height: 1.6">
         话题回到必要性:了解webGL让你在调库的时候可以非常清楚业务逻辑。写出来的代码即使是调库逻辑性也会非常强,这种好处不仅体现在写代码
      。维护代码的时候也会很舒服。<br>
      即使库封装的非常完善。也还是有局限性的,活字印刷术只是方便了印刷,灵活性和一个字一个字刷比起来还是低。THREE和Cesium的封装也是如此
      THREE的材质里效果就那么几种,如果要酷的效果还是得用shaderMaterial或者是onBeforeCompile改着色器实现自定义材质效果。
      包括THREE的BufferGeometry这个API接口。如果想要真的灵活使用了解WebGL是必不可少的,什么法线,颜色,索引,顶点。这些东西虽然他给你封在了里面
      但在不懂webGL的情况下你可能调库都费劲。再来说Cesium,Cesium的API里就涉及了很多的着色器内容。像是materialAppearance里的farbic里的Source写的就是
      着色器内容。fsShader,vsShader也是对应的顶点着色器和片元着色器的内容。还有customShader这种自定义着色器的内容。或者是postProcess后处理效果。
      不懂webGL不会写着色器,他给你API你都不会用。再就是一些自定义材质问题,可以仿源码写,但是不止是CV啊,CV后我们还要改着色器实现效果的。这种定制可没有
      库给你调,必须学习webGL并会着色器才能解决这些问题。
      </p>
     
    </div> 
    <br>
      
    <h1 id="about">总结</h1>
    <div id="text" style="margin-right:3%;">
      <p id="textP" style=" line-height: 1.6;">
         如果只是临时用一下没必要学webGL,调库就够了。但如果是专业的做web3D的webGL是必学的
    否则只能做一个调库侠,做出来的效果也会是非常的局限。没有办法做出非常酷炫的效果,那就失去了web3D的灵魂。
    写的效果也只有那么几种,会非常的死板,也没办法实现灵活应用。就跟现实生活的残疾人一样。都是活着但和正常人不一样。
    不会webGL的web3D开发者可以说是一个"残疾人"开发者。
      </p>
     
    </div></div>


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
    0 0 1em rgb(255, 255, 255),
    0 0 0.2em rgb(255, 255, 255);
  font:
    1.2em Georgia,
    "Bitstream Charter",
    "URW Bookman L",
    "Century Schoolbook L",
    serif;
}
#text{
    margin-left: 3%;
  color: rgb(245, 245, 5);
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

  box-shadow: 0px 15px 10px  rgb(0, 8, 255) ,0px -5px 10px  rgb(0, 64, 255); 
opacity: 0.8;
margin-top: 10px;
border-radius: 10px;

}

#about{
    margin-left: 3%;
    color: rgb(249, 253, 4);
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
#textP{
    color: rgb(255, 255, 0);

text-shadow:
    1px 1px 2px black,
    0 0 2em rgb(255, 255, 255),
    0 0 2.2em rgb(86, 245, 0);
 
font: bold small-caps italic 1.0em 'Roboto', Courier,  monospace ;
 
  box-shadow: 0px 5px 10px  rgba(250, 250, 250, 0.708) ,0px -5px 10px  rgba(84, 127, 199, 0.708); 
opacity: 0.9;
margin-top: 10px;
border-radius: 10px;
}
</style>