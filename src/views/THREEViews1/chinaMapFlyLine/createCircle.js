import * as THREE from 'three'
const  Loader=new THREE.TextureLoader()
const  map=Loader.load('/../地图大屏可视化资源/光圈贴图.png')
const geometry = new THREE.PlaneGeometry(2, 2)
function createCircle(x,y){
const size=Math.random()*(3-1)+1
const material=new THREE.MeshBasicMaterial({
    color:0xff00ff,
    map,
    transparent:true
})
const circle=new THREE.Mesh(geometry,material)
circle.position.set(x,y,1.5)
//给圆环设置一个缩放属性方便后续拿到后在渲染循环中执行缩放
circle.s=0
//给圆环设置一个大小属性方便后续渲染循环里的操作
circle.size=size
return circle
}
export {createCircle}