<template>
  <div id="main">
    <div ref="container"></div>
  </div>
</template>

<script setup>
import { onMounted,ref,onUnmounted,onBeforeUnmount } from 'vue';
import {renderer} from './index.js'
import { camera,scene } from './index.js';
const container=ref(null)
onMounted(()=>{
initThree()
})
function initThree(){
container.value.appendChild(renderer.domElement)
   var button = document.createElement('button');
    button.style.position = 'absolute';
    button.style.top = '0px'
    button.style.left = '0px'
    button.innerHTML = '下载';
    button.onclick = saveFile;
    container.value.appendChild(button);
}
//路由切换时销毁dom页面,解决性能问题
onBeforeUnmount(()=>{
  // 清理场景中的对象
  //递归遍历场景,清除GPU负载的THREE.js几何体,材质和贴图等数据
  if(scene){
    scene.traverse((object) => {
            if (object.geometry) {
                object.geometry.dispose();
            }
            if (object.material) {
              //如果材质有纹理就清除纹理
              if(object.material.map){
                object.material.map.dispose();
                //object.material.map=null
              }
                object.material.dispose();
            }
        });
        //scene.dispose()
  }
        // 清理WebGL渲染器
        if (renderer&&renderer.domElement) {
            renderer.dispose();
            renderer.domElement.remove()
            // if (renderer.getContext()) {
            //     renderer.getContext().getExtension('WEBGL_lose_context').loseContext();
            // }
        }
})
window.onresize=()=>{
  renderer.setSize(window.innerWidth,window.innerHeight)
  camera.aspect=window.innerWidth/window.innerHeight
  camera.updateProjectionMatrix()
}
    //保存webgl内容
  function saveFile() {
    // 创建一个超链接元素，用来下载保存数据的文件
      var link = document.createElement('a');
      // 通过超链接herf属性，设置要保存到文件中的数据
      var canvas = renderer.domElement;//获取canvas对象
      link.href = canvas.toDataURL("image/png");
      link.download = 'earth.png'; //下载文件名
      link.click(); //js代码触发超链接元素a的鼠标点击事件，开始下载文件到本地
    }
 
</script>

<style scoped>

</style>