<template>
<div style="width: 100%;height:100%">
      <div id="change" @click="change()">切换着色器在源码里</div>
    <canvas ref="webgl" id='webGL' style="width: 100%;height:100%"></canvas>

  </div>
</template>

<script setup>
import { onMounted,ref } from 'vue';
const webgl=ref(null)
function change(){
  console.log(111);
  
}
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
const vertexSource1=`
void main(){
gl_Position=vec4(0,0,0,1);
gl_PointSize=18.0;
}
`
const fragSource1=`
void main(){
gl_FragColor=vec4(1,1,1,1);
}
`
//画布刷底色
gl.clearColor(1.,0.,1.,3.)
gl.clear(gl.COLOR_BUFFER_BIT)
const program=initShader(gl,vertexSource,fragSource)
//一个canvas画布或者说webGL画布中会有多个program。
//哪个program被使用了,就会画哪个，如果都用了会画后一个。
gl.useProgram(program)
gl.drawArrays(gl.POINTS,0,1)
const program1=initShader(gl,vertexSource1,fragSource1)
gl.useProgram(program1)
gl.drawArrays(gl.POINTS,0,1)

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
return program
//gl.useProgram(program)
}
</script>

<style scoped>
#change{
  width: 100px;
  height: 20px;
  position: absolute;
   left: 2%;
  background-color: red;
  z-index: 111;
  cursor: pointer;
 
}
#change:hover{
  width: 100px;
  height: 20px;
  position: absolute;
   left: 2%;
  background-color: rgb(255, 255, 255);
  z-index: 111;
  cursor: pointer;
 
}
</style>