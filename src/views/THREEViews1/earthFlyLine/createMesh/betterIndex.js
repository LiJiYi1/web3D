import inside from 'point-in-polygon';
import * as THREE from 'three'
function betterIndex(index,pointArr,boarderArr){
const Index=[]
// console.log(pointArr);
const buffer=new THREE.BufferAttribute(new Float32Array(pointArr),2)
for(let i=0;i<index.length;i+=3){
const x=buffer.getX(index[i])
const y=buffer.getY(index[i])
const x1 = buffer.getX(index[i+1])
const y1 = buffer.getY(index[i+1])
const x2 = buffer.getX(index[i + 2])
const y2 = buffer.getY(index[i + 2])
const center=[(x1+x2+x)/3,(y1+y2+y)/3]
if(inside(center,boarderArr)){Index.push(index[i],index[i+1],index[i+2])}
}
return Index
}
export{betterIndex}