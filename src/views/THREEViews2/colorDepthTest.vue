<template>
    <div style="width: 100%;height:100%">
    <canvas ref="webgl" id='webgl' style="width: 100%;height:100%"></canvas>
  </div>
</template>

<script setup>
import { onMounted,ref } from 'vue';
const webgl=ref(null)
onMounted(()=>{
const gl=webgl.value.getContext('webgl')
const vertexSource=`
//创建一个由平移,缩放,旋转矩阵合成的复合矩阵。
//平移矩阵
mat4 translate=mat4(
1,0,0,0,
0,1,0,0,
0,0,1,0,
0.2,0.2,0,1
);
//缩放矩阵
mat4 scale=mat4(
0.5,0,0,0,
0,0.5,0,0,
0,0,0.5,0,
0,0,0,1
);
attribute vec4 Pos;
attribute vec4 a_Color;
varying vec4 v_Color;
void main(){
v_Color=a_Color;
//设置几何体轴旋转角度为30度,并把角度值转化为弧度值
float radian = radians(45.0);
//求解旋转角度余弦值
float cos = cos(radian);
//求解旋转角度正弦值
float sin = sin(radian);
//旋转矩阵,绕X轴转
mat4 rotateX=mat4(
1.0,0.0,0.0,0.0,
0.0,cos,sin,0.0,
0.0,-sin,cos,0.0,
0.0,0.0,0.0,1.0
);
//旋转矩阵,绕Y轴转
mat4 rotateY=mat4(
cos,0.0,sin,0.0,
0.0,1.0,0.0,0.0,
-sin,0.0,cos,0.0,
0.0,0.0,0.0,1.0
);
gl_Position=rotateX*rotateY*scale*translate*Pos;
}`
const fragSource=`
// 所有float类型数据的精度是lowp
precision lowp float;
varying vec4 v_Color;
void main(){
gl_FragColor=v_Color;
}
`
const program=initShader(gl,vertexSource,fragSource)
//第一个点Z坐标为2超出了裁剪空间，所以被剪掉了
const data=new Float32Array([
    //z为0.5时，xOy平面上的四个点坐标
         0.5,  0.5,  0.5,//索引为0
        -0.5,  0.5,  0.5,//索引为1
        -0.5, -0.5,  0.5,//索引为2
         0.5, -0.5,  0.5,//索引为3
    //z为-0.5时，xOy平面上的四个点坐标
         0.5,  0.5, -0.5,//索引为4
        -0.5,  0.5, -0.5,//索引为5
        -0.5, -0.5, -0.5,//索引为6
         0.5, -0.5, -0.5,//索引为7
])
//创建一个数组存储索引
const indexData=new Uint8Array([
   //前面
   0,1,2,
   0,2,3,
   //后面
   4,5,6,
   4,6,7,
   //左面
   1,5,6,
   1,6,2,
   //右面
   4,0,3,
   4,3,7,
   //上面
   4,5,1,
   4,1,0,
   //下面
   7,6,2,
   7,2,3
])
//创建一个数组存储颜色
const colorData=new Float32Array([
    1,0,0,
    1,0,0,
    1,0,0,
    1,0,0,
    0,1,0,
    0,1,0,
    0,1,0,
    0,1,0,
])
//创建索引缓冲区
const indexBuffer=gl.createBuffer()
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indexBuffer)
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indexData,gl.STATIC_DRAW)
const pos=gl.getAttribLocation(program,'Pos')
const buffer=gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER,buffer)
gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW)
gl.vertexAttribPointer(pos,3,gl.FLOAT,false,0,0)
gl.enableVertexAttribArray(pos)
const color=gl.getAttribLocation(program,'a_Color')
const colorBuffer=gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer)
gl.bufferData(gl.ARRAY_BUFFER,colorData,gl.STATIC_DRAW)
gl.vertexAttribPointer(color,3,gl.FLOAT,false,0,0)
gl.enableVertexAttribArray(color)
gl.getProgramInfoLog(program);
//开启深度测试
gl.enable(gl.DEPTH_TEST)
gl.drawElements(gl.TRIANGLES,36,gl.UNSIGNED_BYTE,0)
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
background-color: rgb(135, 222, 173);
}
</style>