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
void main(){
gl_Position=vec4(0,0,0,1);
gl_PointSize=18.0;
}
`
const fragSource=`
void main(){
gl_FragColor=vec4(0,1,1,1);
}
`
initShader(gl,vertexSource,fragSource)

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
gl.drawArrays(gl.POINTS,0,1)
}
</script>

<style scoped>
#webGL{
    background-color: black;
  
}
</style>