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
const vertexSource=`
attribute vec4 apos;
attribute vec4 a_color;
varying vec4 v_color;
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
gl_Position=rotateY*rotateX*apos;
v_color=a_color;
}
`
const fragSource=`
precision lowp float;
varying vec4 v_color;
void main(){
gl_FragColor=v_color;
}
`
const program=initShader(gl,vertexSource,fragSource)
const aposLocation = gl.getAttribLocation(program,'apos');
const a_color = gl.getAttribLocation(program,'a_color');
const data=new Float32Array([
           //        立方体1
        .5,.5,.5,-.5,.5,.5,-.5,-.5,.5,.5,.5,.5,-.5,-.5,.5,.5,-.5,.5,      //面1
        .5,.5,.5,.5,-.5,.5,.5,-.5,-.5,.5,.5,.5,.5,-.5,-.5,.5,.5,-.5,      //面2
        .5,.5,.5,.5,.5,-.5,-.5,.5,-.5,.5,.5,.5,-.5,.5,-.5,-.5,.5,.5,      //面3
        -.5,.5,.5,-.5,.5,-.5,-.5,-.5,-.5,-.5,.5,.5,-.5,-.5,-.5,-.5,-.5,.5,//面4
        -.5,-.5,-.5,.5,-.5,-.5,.5,-.5,.5,-.5,-.5,-.5,.5,-.5,.5,-.5,-.5,.5,//面5
        .5,-.5,-.5,-.5,-.5,-.5,-.5,.5,-.5,.5,-.5,-.5,-.5,.5,-.5,.5,.5,-.5, //面6
        //        立方体2
        .2,.2,.2,-.2,.2,.2,-.2,-.2,.2,.2,.2,.2,-.2,-.2,.2,.2,-.2,.2,      //面1
        .2,.2,.2,.2,-.2,.2,.2,-.2,-.2,.2,.2,.2,.2,-.2,-.2,.2,.2,-.2,      //面2
        .2,.2,.2,.2,.2,-.2,-.2,.2,-.2,.2,.2,.2,-.2,.2,-.2,-.2,.2,.2,      //面2
        -.2,.2,.2,-.2,.2,-.2,-.2,-.2,-.2,-.2,.2,.2,-.2,-.2,-.2,-.2,-.2,.2,//面4
        -.2,-.2,-.2,.2,-.2,-.2,.2,-.2,.2,-.2,-.2,-.2,.2,-.2,.2,-.2,-.2,.2,//面2
        .2,-.2,-.2,-.2,-.2,-.2,-.2,.2,-.2,.2,-.2,-.2,-.2,.2,-.2,.2,.2,-.2 //面6
    ]);
const colorData = new Float32Array([
    //        立方体1，透明度0.6
        1,0,0,0.6, 1,0,0,0.6, 1,0,0,0.6, 1,0,0,0.6, 1,0,0,0.6, 1,0,0,0.6,//红色——面1
        0,1,0,0.6, 0,1,0,0.6, 0,1,0,0.6, 0,1,0,0.6, 0,1,0,0.6, 0,1,0,0.6,//绿色——面2
        0,0,1,0.6, 0,0,1,0.6, 0,0,1,0.6, 0,0,1,0.6, 0,0,1,0.6, 0,0,1,0.6,//蓝色——面3

        1,1,0,0.6, 1,1,0,0.6, 1,1,0,0.6, 1,1,0,0.6, 1,1,0,0.6, 1,1,0,0.6,//黄色——面4
        0,0,0,0.6, 0,0,0,0.6, 0,0,0,0.6, 0,0,0,0.6, 0,0,0,0.6, 0,0,0,0.6,//黑色——面5
        1,1,1,0.6, 1,1,1,0.6, 1,1,1,0.6, 1,1,1,0.6, 1,1,1,0.6, 1,1,1,0.6, //白色——面6
        //        立方体2，不透明，A分量为1
        1,0,0,1.0, 1,0,0,1.0, 1,0,0,1.0, 1,0,0,1.0, 1,0,0,1.0, 1,0,0,1.0,//红色——面1
        0,1,0,1.0, 0,1,0,1.0, 0,1,0,1.0, 0,1,0,1.0, 0,1,0,1.0, 0,1,0,1.0,//绿色——面2
        0,0,1,1.0, 0,0,1,1.0, 0,0,1,1.0, 0,0,1,1.0, 0,0,1,1.0, 0,0,1,1.0,//蓝色——面3

        1,1,0,1.0, 1,1,0,1.0, 1,1,0,1.0, 1,1,0,1.0, 1,1,0,1.0, 1,1,0,1.0,//黄色——面4
        0,0,0,1.0, 0,0,0,1.0, 0,0,0,1.0, 0,0,0,1.0, 0,0,0,1.0, 0,0,0,1.0,//黑色——面5
        1,1,1,1.0, 1,1,1,1.0, 1,1,1,1.0, 1,1,1,1.0, 1,1,1,1.0, 1,1,1,1.0 //白色——面6
    ]);
    /**
     创建缓冲区colorBuffer，传入顶点颜色数据colorData
     **/
    const colorBuffer=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,colorData,gl.STATIC_DRAW);
    gl.vertexAttribPointer(a_color,4,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(a_color);
    /**
     创建缓冲区buffer，传入顶点位置数据data
     **/
    const buffer=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
    gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);
    gl.vertexAttribPointer(aposLocation,3,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(aposLocation);
    /**
     * 渲染管线α融合功能单元配置
     **/
    gl.enable(gl.DEPTH_TEST)
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
    //底色
    gl.clearColor(1.,1.,0.,1.)
    //深度测试和α融合一起使用注意先后顺序,防止测试不通过产生绘制问题
    gl.drawArrays(gl.TRIANGLES,36,72);
    gl.drawArrays(gl.TRIANGLES,0,36);
     
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
return program
}
</script>

<style scoped>
#webGL{
    background-color: rgb(0, 225, 255);
  
}
</style>