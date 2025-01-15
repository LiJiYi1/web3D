<template>
  <div>
    <canvas ref="webgl" id='webgl' width='1560px' height="670px"></canvas>
  </div>
  
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
precision lowp float;
varying vec2 v_coord;
uniform sampler2D u_sam;
uniform vec2 st;
uniform float u_time;
uniform vec2 u_mouse;
//rgb转hsv
vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}
//hsv转rgb
vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
void main(){
//坐标修正
vec2 pos=(gl_FragCoord.xy*2.0-st.xy)/min(st.x,st.y);
//鼠标位置坐标修正
vec2 pos1=(u_mouse.xy*2.0-st.xy)/min(st.x,st.y);
//HSV转RGB函数的调用
//角度
float angle=atan(pos.y-pos1.y,pos1.x-pos.x);
//距离
float dis=1.0-smoothstep(0.5,0.51,distance(pos,pos1));
vec3 color=hsv2rgb(vec3(angle/(2.0*3.14)+u_time,dis,1.0));

vec4 texture=texture2D(u_sam,v_coord);
vec3 C=mix(texture.rgb,color,0.5);
gl_FragColor=vec4(C,1.0);
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
gl.uniform2f(xy,1300.0,670.0)
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
    Time+=0.01;
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
#webgl{
background-color: rgb(222, 83, 18);
cursor: pointer;
}
</style>