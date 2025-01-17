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
precision mediump float;
varying vec2 v_coord;
uniform sampler2D u_sam;
uniform vec2 st;
uniform float u_time;
uniform vec2 u_mouse;

void main(){
//坐标修正
vec2 pos=(gl_FragCoord.xy*2.0-st.xy)/min(st.x,st.y);
vec2 uv=pos;
//旋转矩阵
mat2 Rotate=mat2(cos(u_time),sin(u_time),-sin(u_time),cos(u_time));
uv=Rotate*uv;
//一个起始向量
vec2 startV=vec2(0.5,0.5);
//在雷达终点处画一条粗线
float dis1=abs(uv.y-uv.x);
if(dis1<0.02&&distance(vec2(0.0),uv.xy)<0.8&&uv.x+uv.y>0.0){
float c=0.01/abs(uv.y-uv.x);
gl_FragColor=vec4(c,c,0,1.0);
}
//坐标上的点通过叉乘判断角度
float d=acos(dot(normalize(startV),normalize(uv.xy)));
//叉乘获得方向
vec3 cross1=normalize(cross(vec3(1.5,0.5,0.0),vec3(0.0,0.4,0.0)));
vec3 cross2=normalize(cross(vec3(1.5,1.5,0.0),vec3(uv.xy,0.0)));
float dir=distance(cross1,-cross2);
//根据角度,半径画一个扇形。(这个扇形左右对称),现通过叉乘法向量方向剔除一半
if(d<=radians(70.0)&&distance(vec2(0.0),uv.xy)<0.8&&dir>=0.1){
float c=pow(1.0-d,0.6);
gl_FragColor=vec4(c-0.4,c-0.4,0.0,0.6);
}
//画几个圆环
if(distance(vec2(0.0),uv.xy)>0.8&&distance(vec2(0.0),uv.xy)<0.85){
float dis=distance(vec2(0.0),uv.xy);
float c=smoothstep(0.01,0.0,abs(dis-0.81));
gl_FragColor=vec4(c,c,0.0,1.0);
}
else if(distance(vec2(0.0),uv.xy)>0.6&&distance(vec2(0.0),uv.xy)<0.61){
float dis=distance(vec2(0.0),uv.xy);
float c=smoothstep(0.006,0.0,abs(dis-0.605));
gl_FragColor=vec4(c,c,0.0,1.0);
}
else if(distance(vec2(0.0),uv.xy)>0.4&&distance(vec2(0.0),uv.xy)<0.41){
float dis=distance(vec2(0.0),uv.xy);
float c=smoothstep(0.006,0.0,abs(dis-0.405));
gl_FragColor=vec4(c,c,0.0,1.0);
}
else if(distance(vec2(0.0),uv.xy)>0.2&&distance(vec2(0.0),uv.xy)<0.21){
float dis=distance(vec2(0.0),uv.xy);
float c=smoothstep(0.006,0.0,abs(dis-0.205));
gl_FragColor=vec4(c,c,0.0,1.0);
}
//画两个交叉的线
float x=pos.x;
if(pos.x==pos.y&&distance(vec2(0.0),pos.xy)<0.8){
float c=1.0/abs(uv.y-uv.x);
gl_FragColor=vec4(c,c,c,1.0);
}
if(-pos.x==pos.y&&distance(vec2(0.0),pos.xy)<0.8){
float c=1.0/abs(uv.x+uv.y);
gl_FragColor=vec4(c,c,c,1.0);
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
background-color: black;
cursor: pointer;
}
</style>