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
void main(){
//设置几何体轴旋转角度为30度,并把角度值转化为弧度值
float radian = radians(30.0);
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
void main(){
gl_FragColor=vec4(0,1,0,1);
}
`
const program=initShader(gl,vertexSource,fragSource)
//第一个点Z坐标为2超出了裁剪空间，所以被剪掉了
const data=new Float32Array([
    //z为0.5时，xOy平面上的四个点坐标
         0.5,  0.5,  0.5,
        -0.5,  0.5,  0.5,
        -0.5, -0.5,  0.5,
         0.5, -0.5,  0.5,
        //z为-0.5时，xOy平面上的四个点坐标
         0.5,  0.5, -0.5,
        -0.5,  0.5, -0.5,
        -0.5, -0.5, -0.5,
         0.5, -0.5, -0.5,
        //上面两组坐标分别对应起来组成一一对
        0.5,  0.5,  0.5,
        0.5,  0.5,  -0.5,

        -0.5,  0.5,  0.5,
        -0.5,  0.5,  -0.5,

        -0.5, -0.5,  0.5,
        -0.5, -0.5,  -0.5,

        0.5, -0.5,  0.5,
        0.5, -0.5,  -0.5,
])
const pos=gl.getAttribLocation(program,'Pos')
const buffer=gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER,buffer)
gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW)
gl.vertexAttribPointer(pos,3,gl.FLOAT,false,0,0)
gl.enableVertexAttribArray(pos)
gl.getProgramInfoLog(program);
gl.drawArrays(gl.LINE_LOOP,0,4)
gl.drawArrays(gl.LINE_LOOP,4,4)
//LINES模式绘制后8个点
gl.drawArrays(gl.LINES,8,8);
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
background-color: rgb(49, 13, 196);
}
</style>