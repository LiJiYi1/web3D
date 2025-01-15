import inside from "point-in-polygon"
import Delaunator from "delaunator"
function tranglePou(pointArr){
//把经度和纬度拿出来
const lonArr=[]
const latArr=[]
//创建数组存储边界顶点
const boardPoints=[]
//把边界的经纬度放入数组
pointArr.forEach((e)=>{
boardPoints.push(e[0],e[1])
const lon=e[0]
const lat=e[1]
lonArr.push(lon)
latArr.push(lat)
})
//对经纬度数组排序拿到经纬度范围
lonArr.sort((a,b)=>a-b)
latArr.sort((a, b) => a - b)
//拿到经纬度最大值和最小值
const lonMax=lonArr[lonArr.length-1]
const lonMin=lonArr[0]
const latMax=latArr[latArr.length-1]
const latMin=latArr[0]
//获得经纬度差
const lonSpace=lonMax-lonMin
const latSpace=latMax-latMin
//规定格子间的距离
const space=1
//创建数组存储我们创建的网格点
const points=[]
//经纬度方向上的格子数
const lonNum=Math.abs(lonSpace)/space
const latNum=Math.abs(latSpace)/space

//根据经纬度的差创建格子
for(let i=0;i<lonNum+2;i++){
     const lon = lonMin + space*i
     for(let j=0;j<latNum+3;j++){
       const lat=latMin+space*j
       if(inside([lon,lat],pointArr)){points.push(lon,lat)}
     }
}
//创建数组存储包括网格点和边界顶点在内的所有点
const AllArr=[...points,...boardPoints]
//三角剖分获得索引
 const delaunator=new Delaunator(AllArr).triangles
 return{
    arr:AllArr,
    index:delaunator
 }
}
export{tranglePou}