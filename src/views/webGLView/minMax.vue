<template>
  <div>
    <canvas ref="webgl" id="webgl" width="1600px" height="670px"></canvas>
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
void main(){
//公式合并坐标修正
vec2 pos=(gl_FragCoord.xy*2.0-st.xy)/min(st.x,st.y);
//两个眼睛的位置
float dis=distance(vec2(0.2,0.2),pos);
float dis1=distance(vec2(-0.2,0.2),pos);
//嘴的位置是由两个大小不同的圆拼出来的
//嘴处两个圆的位置(圆心)
float dis2=distance(vec2(0.0,-0.3),pos);
float dis3=distance(vec2(0.0,-0.42),pos);
//最小圆的半径
float minR=0.1;
//最大圆的半径
float maxR=0.1;
//耳朵四个圆的位置(圆心)
float dis4=distance(vec2(0.7,0.1),pos);
float dis5=distance(vec2(0.6,0.1),pos);
float dis6=distance(vec2(-0.7,0.1),pos);
float dis7=distance(vec2(-0.6,0.1),pos);
//纹理
vec4 texture=texture2D(u_sam,v_coord);
//对坐标系内的颜色进行一个判断(以一个长方形作为脸的雏形)
if(pos.x>-0.5&&pos.x<0.5&&pos.y>-0.5&&pos.y<0.5){
gl_FragColor=vec4(0.0,0.0,0.0,1.0);
}
else{
gl_FragColor=vec4(1.0,1.0,1.0,1.0);
}
//让两个眼睛的位置是白色
if(dis<0.1||dis1<0.1){
gl_FragColor=vec4(1.0,1.0,1.0,1.0);
}
//显示出嘴的颜色
if(max(dis2,dis3)<=minR){
gl_FragColor=vec4(1.0,1.0,1.0,1.0);
}
//显示出耳朵的颜色
if(max(dis4,dis5)<=0.25){
gl_FragColor=vec4(0.0,0.0,0.0,1.0);
}
if(max(dis6,dis7)<=0.25){
gl_FragColor=vec4(0.0,0.0,0.0,1.0);
}
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
gl.uniform2f(xy,1600.0,670.0)
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
#webgl{
background-color: rgb(222, 83, 18);
cursor: pointer;
}
</style>