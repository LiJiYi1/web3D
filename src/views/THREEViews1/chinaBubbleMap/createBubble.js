import * as THREE from 'three'
//创建两个颜色方便混合
const color1=new THREE.Color(0,0,1)
const color2=new THREE.Color(1,0,0)
function createBubble(center,size,lerp){
    //根据值来设置气泡图的大小
    const geometry = new THREE.CircleGeometry(size/200, 32);
    //设置气泡图的透明度
    const material = new THREE.MeshBasicMaterial({ 
        color: 0xffff00,
        transparent:true,
        opacity:0.7
     });
    const color=color1.clone().lerp(color2.clone(),lerp)
    material.color.copy(color)
    const circle = new THREE.Mesh(geometry, material);
    //设置气泡图的位置
    circle.position.set(center[0],center[1],0.2)
    return circle
}
export {createBubble}