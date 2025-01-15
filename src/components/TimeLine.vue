<template>
  <el-scrollbar height="86%" style="width: 100%;">
    <div id="main"> 
    <div id="time">   

  <el-timeline style="max-width: 600px;">
    <el-timeline-item center timestamp="2024/1/11" placement="top">
     <p>开始学习webGL</p>
    </el-timeline-item>
    <el-timeline-item timestamp="2024/2/11" placement="top">
      <p>webGL小有成就</p>
    </el-timeline-item>
   <el-timeline-item timestamp="2024/3/11" placement="top">
      <p>接触Cesium.JS</p>
    </el-timeline-item>
    <el-timeline-item timestamp="2024/4/11" placement="top">
      <p>Cesium达到入门级别,并开始THREE.JS学习</p>
    </el-timeline-item>
    <el-timeline-item timestamp="2024/10/15" placement="top">
      <p>THREE.JS大成</p>
    </el-timeline-item>
    <el-timeline-item timestamp="2024/11/15" placement="top">
      <p>webGL和Cesium双线推进(压力暴大)</p>
    </el-timeline-item>
    <el-timeline-item timestamp="2024/12/15" placement="top">
      <p>webGL和Cesium基本结束,开始沉淀。。。</p>
    </el-timeline-item>
  </el-timeline>


</div>
      
   
        <div style="width: 100%;height:100%;position:absolute;left:0px;top:0px;z-index:-1">
    <canvas ref="webgl" id='webGL'  style="width: 100%;height:100%"></canvas>
  </div>
    
  
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
//License: CC BY 3.0
//Author: Jan Mróz (jaszunio15)
//Generation settings
#define NOISE_ALPHA_MULTIPLIER 0.5
#define NOISE_SIZE_MULTIPLIER 1.8

//Uncomment to disable fog shape animation over time
#define MUTATE_SHAPE

//Rendering settings

//Uncoment to get high quality version (if you have good PC)
//#define HIGH_QUALITY

#ifdef HIGH_QUALITY
    #define RAYS_COUNT 150
    #define STEP_MODIFIER 1.007
    #define SHARPNESS 0.009
	#define NOISE_LAYERS_COUNT 5.0
	#define JITTERING 0.03
#else
    #define RAYS_COUNT 54
    #define STEP_MODIFIER 1.0175
    #define SHARPNESS 0.02
	#define NOISE_LAYERS_COUNT 4.0
	#define JITTERING 0.08
#endif

#define DITHER 0.3
#define NEAR_PLANE 0.6
#define RENDER_DISTANCE 2.0

//Colors
#define BRIGHTNESS 5.0
#define COLOR1 vec3(0.0, 1.0, 1.0)
#define COLOR2 vec3(1.0, 0.0, 0.9)

//Camera and time
#define TIME_SCALE 1.0
#define CAMERA_SPEED 0.04
#define CAMERA_ROTATION_SPEED 0.06
#define FOG_CHANGE_SPEED 0.02
float hash(vec3 v)
{
 	return fract(sin(dot(v, vec3(11.51721, 67.12511, 9.7561))) * 1551.4172);   
}

float getNoiseFromVec3(vec3 v)
{
	vec3 rootV = floor(v);
    vec3 f = smoothstep(0.0, 1.0, fract(v));
    
    //Cube vertices values
    float n000 = hash(rootV);
    float n001 = hash(rootV + vec3(0,0,1));
    float n010 = hash(rootV + vec3(0,1,0));
    float n011 = hash(rootV + vec3(0,1,1));
    float n100 = hash(rootV + vec3(1,0,0));
    float n101 = hash(rootV + vec3(1,0,1));
    float n110 = hash(rootV + vec3(1,1,0));
    float n111 = hash(rootV + vec3(1,1,1));
    
    //trilinear interpolation
    vec4 n = mix(vec4(n000, n010, n100, n110), vec4(n001, n011, n101, n111), f.z);
    n.xy = mix(vec2(n.x, n.z), vec2(n.y, n.w), f.y);
    return mix(n.x, n.y, f.x);
}

float volumetricFog(vec3 v, float noiseMod)
{
    float noise = 0.0;
    float alpha = 1.0;
    vec3 point = v;
    for(float i = 0.0; i < NOISE_LAYERS_COUNT; i++)
    {
        noise += getNoiseFromVec3(point) * alpha;
     	point *= NOISE_SIZE_MULTIPLIER;
        alpha *= NOISE_ALPHA_MULTIPLIER;
    }
    
    //noise = noise / ((1.0 - pow(NOISE_ALPHA_MULTIPLIER, NOISE_LAYERS_COUNT))/(1.0 - NOISE_ALPHA_MULTIPLIER));
    noise *= 0.575;

    //edge + bloomy edge
#ifdef MUTATE_SHAPE
     float edge = 0.1 + getNoiseFromVec3(v * 0.5 + vec3(u_time * 0.03)) * 0.8;
 #else
      float edge = 0.5;
 #endif
     noise = (0.5 - abs(edge * (1.0 + noiseMod * 0.05) - noise)) * 2.0;
    return (smoothstep(1.0 - SHARPNESS * 2.0, 1.0 - SHARPNESS, noise * noise) + (1.0 - smoothstep(1.3, 0.6, noise))) * 0.2;
}



vec3 nearPlanePoint(vec2 v, float time)
{
 	return vec3(v.x, NEAR_PLANE * (1.0 + sin(time * 0.2) * 0.4), v.y);   
}

vec3 fogMarch(vec3 rayStart, vec3 rayDirection, float time, float disMod)
{
    float stepLength = RENDER_DISTANCE / float(RAYS_COUNT);
 	vec3 fog = vec3(0.0);   
    vec3 point = rayStart;
    
    for(int i = 0; i < RAYS_COUNT; i++)
    {
     	point += rayDirection *stepLength;
        fog += volumetricFog(point, disMod) //intensity
            * mix(COLOR1, COLOR2 * (1.0 + disMod * 0.5), getNoiseFromVec3((point + vec3(12.51, 52.167, 1.146)) * 0.5)) //coloring
            * mix(1.0, getNoiseFromVec3(point * 40.0) * 2.0, DITHER)	//Dithering
            * getNoiseFromVec3(point * 0.2 + 20.0) * 2.0;	//Cutting big holes
        
        stepLength *= STEP_MODIFIER;
    }
    
    //There is a trick
    //Cutting mask in result, it will fake dynamic fog change, cover imperfections and add more 3D feeling
   	fog = (fog / float(RAYS_COUNT)) * (pow(getNoiseFromVec3((rayStart + rayDirection * RENDER_DISTANCE)), 2.0) * 3.0 + disMod * 0.5);
	
    return fog;
}

//Getting kick volume from spectrum
float getBeat()
{
 	float sum = 0.0;
    for (float i = 0.0; i < 16.0; i++)
    {
     	sum += texture2D(u_sam, vec2(i * 0.001 + 0.0, 0.0)).r;   
    }
    return smoothstep(0.6, 0.9, pow(sum * 0.06, 2.0));
}

void main() {

 float time = u_time;
  float musicVolume = getBeat();
  vec2 res = st.xy;
  vec2 uv = (2.0 * gl_FragCoord.xy - res) / res.x;
    
   //Random camera movement
    vec3 cameraCenter = vec3(sin(time * CAMERA_SPEED) * 10.0, time * CAMERA_SPEED * 10.0, cos(time * 0.78 * CAMERA_SPEED + 2.14) * 10.0);
    
    //Creating random rotation matrix for camera
    float angleY = sin(time * CAMERA_ROTATION_SPEED * 2.0);
    float angleX = cos(time * 0.712 * CAMERA_ROTATION_SPEED);
     float angleZ = sin(time * 1.779 * CAMERA_ROTATION_SPEED);
     mat3 rotation =   mat3(1, 0, 			0,
                           0, sin(angleX),  cos(angleX),
                           0, -cos(angleX), sin(angleX))
        			* mat3(sin(angleZ),  cos(angleZ), 0,
                           -cos(angleZ), sin(angleZ), 0,
                           0, 			 0, 		  1)
        			* mat3(sin(angleY),  0, cos(angleY),
                           0, 			 1, 0,
                           -cos(angleY), 0, sin(angleY));
    
    vec3 rayDirection = rotation * normalize(nearPlanePoint(uv, time));
    vec3 rayStart = rayDirection * 0.2 + cameraCenter;	//Ray start with little clipping
    
    //Thanks to adx for jittering tip, looks and works really better with this line:
    rayStart += rayDirection * (hash(vec3(uv + 4.0, fract(u_time) + 2.0)) - 0.5) * JITTERING;
    
     vec3 fog = fogMarch(rayStart, rayDirection, time, musicVolume);
    
     //postprocess
     fog *= 2.5 * BRIGHTNESS;
    fog += 0.07 * mix(COLOR1, COLOR2, 0.5);	//Colouring the darkness
    fog = sqrt(smoothstep(0.0, 1.5, fog)); //Dealing with too bright areas (sometimes it happen)
    
    vec4 fragColor = vec4(fog * smoothstep(0.0, 10.0, u_time), 1.0);

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
img.src='../../../public/webGL资源/科比.jpg'
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
gl.uniform2f(xy,window.innerWidth/5.,window.innerHeight/4.8)
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

#main{
    width: 100%;
}
#time{
 width: 100%;
    margin-top:6%;
    margin-left:30%
}
</style>