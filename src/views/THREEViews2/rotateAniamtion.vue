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
//设置几何体轴旋转角度为30度,并把角度值转化为弧度值
float radian = radians(-30.0);
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
attribute vec4 Pos;
attribute vec4 a_Color;
attribute vec4 a_Normal;
uniform vec3 u_LightDir;
varying vec4 v_Color;
uniform mat4 rotateY;
void main(){
float cos=dot(normalize((rotateX*rotateY*a_Normal).xyz),normalize(u_LightDir));
float angle=max(cos,0.0);
v_Color=vec4(a_Color.rgb*angle,a_Color.a);
gl_Position=rotateX*rotateY*Pos;
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
const data=new Float32Array([
    .5,.5,.5,-.5,.5,.5,-.5,-.5,.5,.5,.5,.5,-.5,-.5,.5,.5,-.5,.5,      //面1
    .5,.5,.5,.5,-.5,.5,.5,-.5,-.5,.5,.5,.5,.5,-.5,-.5,.5,.5,-.5,      //面2
    .5,.5,.5,.5,.5,-.5,-.5,.5,-.5,.5,.5,.5,-.5,.5,-.5,-.5,.5,.5,      //面3
    -.5,.5,.5,-.5,.5,-.5,-.5,-.5,-.5,-.5,.5,.5,-.5,-.5,-.5,-.5,-.5,.5,//面4
    -.5,-.5,-.5,.5,-.5,-.5,.5,-.5,.5,-.5,-.5,-.5,.5,-.5,.5,-.5,-.5,.5,//面5
    .5,-.5,-.5,-.5,-.5,-.5,-.5,.5,-.5,.5,-.5,-.5,-.5,.5,-.5,.5,.5,-.5 //面6
])
//创建一个数组存储颜色
const colorData=new Float32Array([
1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0,//红色——面1
1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0,//红色——面2
1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0,//红色——面3
1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0,//红色——面4
1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0,//红色——面5
1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0, 1,0,0 //红色——面6
])
//创建一个数组存储法线
const normalData = new Float32Array([
        0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,//z轴正方向——面1
        1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,//x轴正方向——面2
        0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,//y轴正方向——面3
        -1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,//x轴负方向——面4
        0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,//y轴负方向——面5
        0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1//z轴负方向——面6
]);
 const normal=gl.getAttribLocation(program,'a_Normal')
 const normalBuffer=gl.createBuffer()
 gl.bindBuffer(gl.ARRAY_BUFFER,normalBuffer)
 gl.bufferData(gl.ARRAY_BUFFER,normalData,gl.STATIC_DRAW)
 gl.vertexAttribPointer(normal,3,gl.FLOAT,false,0,0)
 gl.enableVertexAttribArray(normal)
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
// gl.getProgramInfoLog(program);
//平行光方向
const lightDir=gl.getUniformLocation(program,'u_LightDir')
gl.uniform3f(lightDir,-2,3,-4)
//开启深度测试
gl.enable(gl.DEPTH_TEST)
//拿到旋转矩阵
const matrix=gl.getUniformLocation(program,'rotateY')
let angle=0
function loop(){
  const cos=Math.cos(angle)
  const sin=Math.sin(angle)
  const mat4=[
    cos,0.0,-sin,0.0,
    0.0,1.0,0.0,0.0,
    sin,0.0,cos,0.0,
    0.0,0.0,0.0,1.0,
  ]
  gl.uniformMatrix4fv(matrix,false, mat4)
  angle+=0.01
  gl.drawArrays(gl.TRIANGLES,0,36)
  requestAnimationFrame(loop)
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
background-color: rgb(75, 74, 57);
}
</style>