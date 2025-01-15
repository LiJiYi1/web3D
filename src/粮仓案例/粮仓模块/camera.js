import * as THREE from 'three'

//创建透视投影相机并配置参数
const camera=new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,2000)
camera.position.set(300,300,300)
camera.lookAt(0,0,0)

//导出相机
export {camera}