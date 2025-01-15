import * as THREE from 'three'
import { createLine } from './createLine.js'
import { createShape } from './createShape.js'
import { ExtrudeMesh } from './ExtrudeMesh.js'
import { lonLat2Mercator } from './lonLat2Mercator.js'
const model=new THREE.Group()
const Loader=new THREE.FileLoader()
Loader.setResponseType('json')
Loader.load('../../../public/地图大屏可视化资源/world.json',(data)=>{
    // console.log(data.features);
    //往下遍历一层
    data.features.forEach((item=>{
        //获得单区和多区
        const type = item.geometry.type
        if (type ==='Polygon'){
            // console.log(item);
            //数组存储边界线的顶点坐标
            const pointArr = []
            //数组存储填充几何体的顶点坐标
            const ShapeArr=[]
            item.geometry.coordinates[0].forEach(point=>{   
                const coord = lonLat2Mercator(point[0], point[1])
                pointArr.push(coord.x,coord.y,0)
                ShapeArr.push(new THREE.Vector2(coord.x,coord.y))
                    }
            ) 
            //创建边界线并加入层级模型
            const line = createLine(pointArr)
            //解决深度冲突问题
            line.position.z += 1601000
            model.add(line)
            //创建第二层line
            const line1 = createLine(pointArr)
            //解决深度冲突问题
            line1.position.z -= 1.1
            model.add(line1)
            //创建填充shape并加入层级模型
            const shape=ExtrudeMesh(ShapeArr)
            model.add(shape)
        }
        else if (type ==='MultiPolygon'){
            item.geometry.coordinates.forEach(item => {
                item.forEach((item) => {
                    //数组存储边界线的顶点坐标
                    const pointArr = []
                    //数组存储填充几何体的顶点坐标
                    const ShapeArr = []
                    item.forEach((point)=>{   
                        // console.log(point[0]);
                        const coord=lonLat2Mercator(point[0],point[1])
                        pointArr.push(coord.x, coord.y, 0)
                        ShapeArr.push(new THREE.Vector2(coord.x, coord.y))
                    })
                    //创建边界线并加入层级模型
                    const line = createLine(pointArr)
                    model.add(line)
                    //解决深度冲突问题
                    line.position.z += 1601000
                    //创建第二层line
                    const line1 = createLine(pointArr)
                    //解决深度冲突问题
                    line1.position.z -= 1.1
                    model.add(line1)
                    //创建填充shape并加入层级模型
                    const shape = ExtrudeMesh(ShapeArr)
                    model.add(shape)
                })
            
            })
      
        }
       
    }))
    const box=new THREE.Box3()
    box.expandByObject(model)
    const size=new THREE.Vector3()
    box.getSize(size)
    console.log(size);
    
})
export {model}