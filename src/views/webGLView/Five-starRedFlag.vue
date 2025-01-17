<template>
  <div style="width: 100%;height:100%">
    <canvas ref="webgl" id='webGL' style="width: 100%;height:100%"></canvas>
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
#define S(a,b,t) smoothstep(a,b,t) 
#define PI 3.1415927
precision mediump float;
varying vec2 v_coord;
uniform vec2 st;
uniform float u_time;
uniform vec2 u_mouse;
//旋转矩阵
mat2 Rot(float a)
{
    float s = sin(a), c = cos(a);
    
    return mat2(c, -s, s, c);
}
//画网格
float DrawGrid(vec2 uv)
{
    vec2 gv = fract(uv * 10. - 0.025);
    
    float grid = 0.;
    
    if(gv.x > .95) grid = 1.;
    if(gv.y > .95) grid = 1.;
    
    return grid;
}
//画五角星
float Star(vec2 uv, float feature)
{
    uv.x = abs(uv.x);
    
    float S1 = 0.11;
    float S2 = S1 - feature;
    
    float side1 = S(S1, S2, uv.y);
    
    vec2 dv = Rot(0.4*PI*2.) * uv;
    float side2 = S(S1, S2, dv.y);
    
    dv = Rot(0.4*PI*3.) * uv;
    float side3 = S(S1, S2, dv.y);
    
    dv = Rot(0.4*PI*4.) * uv;
    float side4 = S(S1, S2, dv.y);
    
    return side2*side4+side1*side3;
}
//画五个五角星
float StarLayer(vec2 uv)
{
    float star1 = Star((uv+vec2(0.4, 0.))*1.1, .01);
    
    float star2 = Star(((uv+vec2(-0.1, 0.4))*3.1)* Rot(0.5), .02);
    
    float star3 = Star(((uv+vec2(-0.3, 0.2))*3.1), .02);
    
    float star4 = Star(((uv+vec2(-0.3, -0.1))*3.1)* Rot(-0.25), .02);
    
    float star5 = Star(((uv+vec2(-0.1, -0.3))*3.1)* Rot(0.5), .02);
    
    return star1+star2+star3+star4+star5;
}
void main(){  
  vec2 uv = gl_FragCoord.xy/st.xy;
  vec2 st1 = uv;
    uv -= .5;  
    uv.x *= st.x/st.y;
  
    uv *= 2.;
    uv += vec2(st.x/st.y*0.5, -0.5);
    //随着时间进行一个迎风飘的效果。
    float w = sin((uv.x + uv.y - u_time * .75 + sin(1.5 * uv.x + 4.5 * uv.y) * PI * .3)
                  * PI * .6); // fake waviness factor  
    uv *= 1. + (.036 - .036 * w);
    
    //float tex = texture(iChannel0, uv * 200.).r;
      
    vec3 col = vec3(0.870588,0.1607843,0.0627451);
    col = mix(col, vec3(1., 0.8705882, 0.), clamp(StarLayer(uv),0.,1.));
    col += w * .15;
    //col *= tex*2.;
    float v = 16. * st1.x * (1. - st1.x) * st1.y * (1. - st1.y); // vignette
    //col *= vec3(1. - .25 * exp2(-4.5 * v));
    //col += DrawGrid(uv)*.5; // grid
    //fragColor = vec4(col,1.0);
    gl_FragColor=vec4(col,1.0);
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
gl.uniform2f(xy,window.innerWidth/5.,window.innerHeight/4.7)
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
cursor: pointer;
}
</style>