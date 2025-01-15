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
attribute vec4 Pos;
void main(){
gl_Position=Pos;
gl_PointSize=20.2;
}`
const fragSource=`
void main(){
gl_FragColor=vec4(0,1,0,1);
}
`
const program=initShader(gl,vertexSource,fragSource)
//第一个点Z坐标为2超出了裁剪空间，所以被剪掉了
const data=new Float32Array([
0.0,0.0,2.0,1.0,
0.5,0.5,0.0,1.0,
0.5,-0.5,0.0,1.0
])
const pos=gl.getAttribLocation(program,'Pos')
const buffer=gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER,buffer)
gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW)
gl.vertexAttribPointer(pos,4,gl.FLOAT,false,0,0)
gl.enableVertexAttribArray(pos)

gl.drawArrays(gl.TRIANGLES,0,3)
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
background-color: burlywood;
}
</style>