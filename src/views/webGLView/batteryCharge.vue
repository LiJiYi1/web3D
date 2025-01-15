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
//矩形的SDF绘制矩形
float sdBox(in vec2 p, in vec2 b) {
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}
//三角形的sdf
float sdTriangle( in vec2 p, in vec2 p0, in vec2 p1, in vec2 p2 ) {
//三个边的矢量
    vec2 e0 = p1-p0, e1 = p2-p1, e2 = p0-p2;
//p点和三个顶点的矢量
    vec2 v0 = p -p0, v1 = p -p1, v2 = p -p2;
//p点到三个边的距离
    vec2 pq0 = v0 - e0*clamp( dot(v0,e0)/dot(e0,e0), 0.0, 1.0 );
    vec2 pq1 = v1 - e1*clamp( dot(v1,e1)/dot(e1,e1), 0.0, 1.0 );
    vec2 pq2 = v2 - e2*clamp( dot(v2,e2)/dot(e2,e2), 0.0, 1.0 );
//叉乘判断三角形三个边矢量的方向
    float s = sign( e0.x*e2.y - e0.y*e2.x );
//判别是否在三角形内
    vec2 d = min(min(vec2(dot(pq0,pq0), s*(v0.x*e0.y-v0.y*e0.x)),
                     vec2(dot(pq1,pq1), s*(v1.x*e1.y-v1.y*e1.x))),
                     vec2(dot(pq2,pq2), s*(v2.x*e2.y-v2.y*e2.x)));
    return -sqrt(d.x)*sign(d.y);
}
// smooth min
float smin(float a, float b, float k) {
  float h = clamp(0.5+0.5*(b-a)/k, 0.0, 1.0);
  return mix(b, a, h) - k*h*(1.0-h);
}
// smooth max
float smax(float a, float b, float k) {
  return -smin(-a, -b, k);
}
float createGlow(float load) {
   float glowLoad = smoothstep(1.1, load, 0.5);
   return min(glowLoad, step(0., load));
}
// Colors definition
const vec3 red = vec3(1.,0.,0.);
const vec3 orange = vec3(1., 150./255., 0.);
const vec3 yellow = vec3(1., 230./255., 0.);
const vec3 green = vec3(52./255.,211./255.,53./255.);
const vec3 blue = vec3(0.,180./255.,228./255.);
vec3 drawScene(vec2 uv) {
    float t2s = fract(u_time/2.);
    float t12s = fract(u_time/8.);
    vec3 col;
    /*if (t2s > 0.9) {
        col = vec3(0.75);
    } else {
        col = vec3(0.1);
    }*/
    //col = vec3(t2s/2.);
    col = vec3(0.2);
    
    
    // Contour
    float boxBack = sdBox(uv, vec2(0.15, 0.32));
    float boxIn = sdBox(uv, vec2(0.135, 0.305));
    float top = sdBox(vec2(uv.x, uv.y - 0.325), vec2(0.08, 0.019));
    
    // Lightning
    vec2 p1 = vec2(-0.1, -0.15);
    vec2 p2 = vec2(0.01, -0.15);
    vec2 p3 = vec2(0.04, 0.125);
    float lightning1 = sdTriangle(vec2(uv.x,uv.y-0.115), p1, p2, p3);
    float lightning2 = sdTriangle(vec2(-uv.x,-uv.y-0.115), p1, p2, p3);
    float lightning = min(lightning1, lightning2);
    
    // Loads
    float bottomOff = 0.240;
    float heightLoad = 0.055;
    float load1 = sdBox(vec2(uv.x, uv.y + bottomOff), vec2(0.125, heightLoad));
    float load2 = sdBox(vec2(uv.x, uv.y + bottomOff-0.120*1.), vec2(0.125, heightLoad));
    float load3 = sdBox(vec2(uv.x, uv.y + bottomOff-0.120*2.), vec2(0.125, heightLoad));
    float load4 = sdBox(vec2(uv.x, uv.y + bottomOff-0.120*3.), vec2(0.125, heightLoad));
    float load5 = sdBox(vec2(uv.x, uv.y + bottomOff-0.120*4.), vec2(0.125, heightLoad));
    
    float contour = max(boxBack, -boxIn);
    float res = min(contour, top);
    if (t12s < 0.83) {
        res = min(res, load2);
        res = min(res, load3);
        res = min(res, load4);
        res = min(res, load5);
    } else if (t12s < 1.) {
        res = min(lightning, res);
    }
    
    res = step(0., res);
    
    // --
    float finalLoad1 = createGlow(load1);
    // --
    float finalLoad2 = createGlow(load2);
    
    float step2Final = min(finalLoad1, finalLoad2);
    // --
    float finalLoad3 = createGlow(load3);
    
    float step3Final = min(step2Final, finalLoad3);
    // --
    float finalLoad4 = createGlow(load4);
    
    float step4Final = min(step3Final, finalLoad4);
    // --
    float finalLoad5 = createGlow(load5);
    
    float step5Final = min(step4Final, finalLoad5);
    
    // Color mix
    col = mix(vec3(0,0,0), col, res);
    //col = mix(red, col, load1);
    if (t12s < 0.17) {
        col = mix(blue, col, step5Final);
    } else if (t12s < 0.33) {
        col = mix(green, col, step4Final);
    } else if (t12s < 0.5) {
        col = mix(yellow, col, step3Final);
    } else if (t12s < 0.67) {
        col = mix(orange, col, step2Final);
    } else if (t12s < 0.83) {
        col = mix(red, col, finalLoad1);
    } else if (t12s < 1.) {
        col = mix(vec3(0,0,0), col, res);
    }
    
    return col;
}
void main(){  
  vec2 uv = gl_FragCoord.xy/st.xy; // <0, 1>
  uv -= 0.5; // <-0.5,0.5>
 uv.x *= st.x/st.y; // fix aspect ratio
vec3 col = drawScene(uv);
// Output to screen
vec4 fragColor = vec4(col,1.0);
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
gl.uniform2f(xy,window.innerWidth/5.,window.innerHeight/4.5)
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