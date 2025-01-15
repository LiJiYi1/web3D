import * as THREE from 'three'
import inside from 'point-in-polygon'
import Delaunator from 'delaunator';
//拿到数据
import Data from './polygonData'
function createBoarder(){
 
    //创建一个层级模型存储点和线
    const pl=new THREE.Group()
    //创建一个数组存储顶点数据
    const pointArr=[]
    const boarder=[]
    //遍历data拿到一个边界线顶点的数组
    Data.forEach((e)=>{
        pointArr.push(e[0],e[1],0)
        boarder.push(e[0],e[1])
    })
    //把顶点数组变成webGL能使用的类型化数组
    const AttributeArr=new Float32Array(pointArr)
    //创建BufferGeometry
    const geometry=new THREE.BufferGeometry()
    //设置顶点数据
    geometry.attributes.position=new THREE.BufferAttribute(AttributeArr,3)
    //创建线材质
    const material=new THREE.LineBasicMaterial()
    //创建边界线
    const line=new THREE.LineLoop(geometry,material)
    //创建点材质
    const material1=new THREE.PointsMaterial({
        color:0xfff000,
        size:0.5
    })
    //创建点
    const points=new THREE.Points(geometry,material1)
 
    //创建阵列点
    //创建两个数组储存经纬度
    const lon=[]
    const lat=[]
    //创建一个数组储存区域边界
    const polygon=[]
    //再遍历一次数据
    Data.forEach((e)=>{
        //把经度放入经度数组
        lon.push(e[0])
        //把纬度放入纬度数组
        lat.push(e[1])  
        //边界顶点放入边界数组
        polygon.push([e[0],e[1]])
    })
    //把经纬度数组进行排序
    lon.sort((a,b)=>a-b)
    lat.sort((a, b) => a - b)
    //拿到经度和纬度的最小值和最大值范围
    //拿到经度纬度最大的索引
    const lonMin=lon[0]
    const lonMax = lon[lon.length - 1]
    const latMin=lat[0]
    const latMax = lat[lat.length - 1]
    // console.log(lon);
    //定义一个间距，然后根据间距创建点阵
    const lonSpace=(lonMax-lonMin)/20
    const latSpace=(latMax-latMin)/10
    //创建数组储存点阵坐标
    const pointsArr=[]
    for(let i=0;i<20;i++){
    //每行点对应的纬度
    const lat=latMin+latSpace*i
    //创建列
    for(let j=0;j<20;j++){
        //每列对应的经度
        const lon=lonMin+lonSpace*j
        //把边界内的顶点放入数组
        if(inside([lon,lat],polygon)){
            pointsArr.push([lon,lat])
        }
    }
    }
    // console.log(pointsArr);
    
    //将拿到的数组处理成THREE能用的
    const pointsZHEN=[]
    const tran=[]
    pointsArr.forEach((e)=>{
        // console.log(e);
        pointsZHEN.push(e[0],e[1],0)
        tran.push(e[0],e[1])
    })
    //创建一个数组储存包括边界顶点和点阵内的所有坐标
    const AllArr = [...tran,...boarder]//剖分的是二维点
    //顶点是三维的
    const AllArr1=[...pointsZHEN,...pointArr]
    //调用三角剖分的库获得索引
    const delaunay = new Delaunator(AllArr).triangles;
    //获得数据
    const buffer = new THREE.BufferAttribute(new Float32Array(AllArr1), 3)
    const usefulIndexArr=[]
    //重构索引把边界线外的三角形删除
    for(let i=0;i<delaunay.length;i+=3){
        //第一个顶点的x,y
        const x1 = buffer.getX(delaunay[i])
        const y1 = buffer.getY(delaunay[i])
        //第二个顶点的x,y
        const x2 = buffer.getX(delaunay[i+1])
        const y2 = buffer.getY(delaunay[i+1])
        //第三个顶点的x,y
        const x3 = buffer.getX(delaunay[i+2])
        const y3 = buffer.getY(delaunay[i+2])
        //计算重心的x,y
        const x=(x1+x2+x3)/3
        const y=(y1+y2+y3)/3
        if (inside([x,y], polygon)) {
            usefulIndexArr.push(delaunay[i],delaunay[i+1],delaunay[i+2])
        }
    }
    console.log(delaunay);
    console.log(new Uint32Array(usefulIndexArr));
    
    
    //根据剖分的索引创建几何体
    const trangles=new THREE.BufferGeometry()
    trangles.attributes.position=buffer
    trangles.index=new THREE.BufferAttribute(new Uint16Array(usefulIndexArr),1)
    const material3=new THREE.MeshBasicMaterial({
        color:0x00ff00,
        side:THREE.DoubleSide
    })

    const material4 = new THREE.MeshBasicMaterial({
        color: 0x00fff0,
        wireframe:true
    })

    const mesh  = new THREE.Mesh(trangles,material3)
    const mesh1 = new THREE.Mesh(trangles, material4)
    mesh1.position.z+=0.1
    //创建点阵的点模型
    const ZHEN = new Float32Array(pointsZHEN)
    const geometry2=new THREE.BufferGeometry()
    geometry2.attributes.position=new THREE.BufferAttribute(ZHEN,3)
    const material2=new THREE.PointsMaterial({
        color:0xff0000,
        size:1,
    })
    const pointZHEN=new THREE.Points(geometry2,material2)
    pl.add(line, points,pointZHEN,mesh1,mesh)
    return pl
    
}
export {createBoarder}