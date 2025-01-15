import * as THREE from 'three'
import inside from 'point-in-polygon'
function betterIndex(index,AllArr,pointArr){
    const finalIndex=[]
 
  
    //把顶点数组变成bufferAttribute
    const point=new THREE.BufferAttribute(new Float32Array(AllArr),2)
    //通过索引获得所有三角形的顶点
    for(let i=0;i<index.length;i+=3){ 
        //得到每个顶点对应的x,y坐标
        const x=point.getX(index[i])
        const y=point.getY(index[i])
        const x1 = point.getX(index[i+1])
        const y1 = point.getY(index[i+1])
        const x2 = point.getX(index[i+2])
        const y2 = point.getY(index[i+2])
        //获得重心
        const center=[(x1+x2+x)/3,(y+y1+y2)/3]
        if(inside(center,pointArr)){finalIndex.push(index[i],index[i+1],index[i+2])}      
    }
return finalIndex
}
export {betterIndex}