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
const vertexShader=`
attribute vec4 Points;
void main(){
gl_Position=Points;
gl_PointSize=18.0;
}
`
const fragShader=`
void main(){
gl_FragColor=vec4(0,1,0,1);
}
`
const program=initShader(gl,vertexShader,fragShader)
//创建顶点数据
const points=new Float32Array([
    0.5,0.5,0.0,1.0,
    -0.5,0.5,0.0,1.0,
    -0.5,-0.5,0.0,1.0,
    0.5,-0.5,0.0,1.0,
])
//创建顶点缓冲区
const buffer=gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER,buffer)
gl.bufferData(gl.ARRAY_BUFFER,points,gl.STATIC_DRAW)
const Points=gl.getAttribLocation(program, 'Points');
gl.vertexAttribPointer(Points,4,gl.FLOAT,false,0,0);
//允许数据传递
gl.enableVertexAttribArray(Points);
gl.drawArrays(gl.LINE_LOOP,0,4)
})
function initShader(gl,vertexShader,fragShader){
const program=gl.createProgram()
const vsShader=gl.createShader(gl.VERTEX_SHADER)
const fsShader=gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(vsShader,vertexShader)
gl.shaderSource(fsShader,fragShader)
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
    background-color:red;
}
</style>