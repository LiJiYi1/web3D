import Delaunator from 'delaunator';
import inside from 'point-in-polygon';
function trangleIndex(pointArr){
        //将经纬度的范围拿到
        const lon=[]
        const lat=[]
        //以数字形式存储点坐标
        const points=[]
        pointArr.forEach((e)=>{
            lon.push(e[0])
            lat.push(e[1])
            points.push(e[0],e[1])
        })
        
        lon.sort((a,b)=>a-b)
        lat.sort((a,b)=>a-b)
        const lonMin=lon[0]
        const lonMax=lon[lon.length-1]
        const latMin=lat[0]
        const latMax=lat[lat.length-1]
        //根据范围划分间距
        const space=3
        let lonSpace
        if(lonMax>0&&lonMin>0){  
            lonSpace=lonMax-lonMin
        }
        else if(lonMax>0&&lonMin<0){
            lonSpace=lonMax-lonMin
        }
        else if(lonMax<0&&lonMin<0){
            lonSpace=lonMax-lonMin
        }
        
       const lonNum=lonSpace/space
    let latSpace
    if (latMax > 0 && latMin > 0) {
        latSpace = latMax - latMin
    }
    else if (latMax > 0 && latMin < 0) {

        latSpace = latMax - latMin
    }
    else if (latMax < 0 && latMin < 0) {
        latSpace = latMax - latMin
    }
    const latNum = latSpace/ space
        //在边界线范围内创建点用于构建三角剖分的三角网格
        const insidePoints=[]
        for(let i=0;i<latNum+2;i++){
            //这一行点的纬度
            const lat = latMin + space * i
            for (let j = 0; j<lonNum+2;j++){
                const lon=lonMin+ space*j
                //把经纬度给数组方便后面进行三角剖分,要调用点在区域内的库过滤掉外部的点
                if(inside([lon,lat],pointArr)){
                    insidePoints.push(lon,lat)
                }
            }
        }
        //创建数组把边界和边界内部的点存储起来用于三角剖分
        const AllArr=[...insidePoints,...points]
        //进行三角剖分拿到索引值
        const delaunay = new Delaunator(AllArr).triangles;
        return {
            delaunay,
            AllArr
        }
    }

export {trangleIndex}