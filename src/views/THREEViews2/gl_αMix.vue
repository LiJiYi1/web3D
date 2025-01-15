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
attribute vec4 apos;
attribute vec4 a_color;
varying vec4 v_color;
void main(){
gl_Position=apos;
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
        -0.5,0.5,0.5,0.5,0.5,-0.5,//红色三角形的三个顶点
        -0.7,0.3,0.3,0.3,0.3,-0.7,//绿色三角形的三个顶点
        -0.3,0.7,0.7,0.7,0.7,-0.3//蓝色三角形的三个顶点
    ]);
const colorData = new Float32Array([
        //红色顶点，透明度0.7
        1,0,0,0.7,
        1,0,0,0.7,
        1,0,0,0.7,
        //绿色顶点，透明度0.7
        0,1,0,0.7,
        0,1,0,0.7,
        0,1,0,0.7,
        //蓝色顶点，透明度0.7
        0,0,1,0.7,
        0,0,1,0.7,
        0,0,1,0.7
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
    gl.vertexAttribPointer(aposLocation,2,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(aposLocation);
    /**
     * 渲染管线α融合功能单元配置
     **/
     gl.enable(gl.BLEND);
     gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
    gl.drawArrays(gl.TRIANGLES,0,9);
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
#webgl{
    background-color: rgb(0, 0, 0);
  
}
</style>