import * as THREE from 'three'
function createPoints(pointArr,numArr){
//拿到点周围点数的最大值
const max=numArr.sort()[numArr.length-1]
console.log(max);
//创建两个颜色做插值控制颜色明暗
const color1=new THREE.Color(0xff0000)
const color2 = new THREE.Color(0xfff000)
//创建数组存储顶点颜色
const colorArr=[]
//实现颜色存储
for(let i=0;i<numArr.length;i++){
    const c=color1.clone().lerp(color2,numArr[i]/max)
    colorArr.push(c.r,c.g,c.b)
}
const cArr=new Float32Array(colorArr)
const arr=new Float32Array(pointArr)
const geometry=new THREE.BufferGeometry()
geometry.attributes.position=new THREE.BufferAttribute(arr,3)
geometry.attributes.color=new THREE.BufferAttribute(cArr,3)
const material=new THREE.PointsMaterial({
    // color:0xfff222,
    vertexColors:true,
    size:0.1
})
const points=new THREE.Points(geometry,material)
return points
}
export {createPoints}