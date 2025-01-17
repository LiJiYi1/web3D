import * as THREE from 'three'
import { lon2xy} from './transform'
const loader=new THREE.FileLoader()
loader.setResponseType('json')
const data= await loader.loadAsync('/../智慧城市资源/上海/黄浦江.json')
//获得河面边界坐标
const boarder = data.features[0].geometry.coordinates[0]
//对边界坐标进行处理
const pointArr=[]
boarder.forEach(element => {
    const coord=lon2xy(element[0],element[1])
    pointArr.push(new THREE.Vector2(coord.x,coord.y))
})
//console.log(pointArr);
//创建shape
const shape=new THREE.Shape(pointArr)
//创建形状缓冲几何体
const geometry=new THREE.ShapeGeometry(shape)
//获得形状缓冲几何体经纬度的最大最小值
const pos = geometry.attributes.position
//console.log(pos.array);
//创建数组存储经纬度坐标
const lonArr=[]
const latArr=[]
for(let i=0;i<pos.array.length;i+=3){
lonArr.push(pos.array[i])
latArr.push(pos.array[i+1])
}
//对经纬度数组进行排序获得最大最小值
lonArr.sort((a,b)=>{ return a-b})
latArr.sort((a, b) => { return a - b })
const lonMax=lonArr[lonArr.length-1]
const lonMin=lonArr[0]
const latMax = latArr[latArr.length - 1]
const latMin = latArr[0]
//获得经纬度的范围
const lonSpace=lonMax-lonMin
const latSpace=latMax-latMin
//console.log(lonSpace,latSpace);
//根据经纬度范围设置UV坐标
const uvArr=[]
for(let i=0;i<pos.array.length;i+=3){
    const lon=pos.array[i]
    const lat=pos.array[i+1]
    const uvx=(lon-lonMin)/lonSpace
    const uvy=(lat-latMin)/latSpace
    //计算UV坐标
    uvArr.push(uvx,uvy)
}
//设置几何体的uv坐标
geometry.attributes.uv=new THREE.BufferAttribute(new Float32Array(uvArr),2)
//材质用高光网格材质,水体要用法线贴图实现水体效果
//创建贴图
const texture=new THREE.TextureLoader().load('/../智慧城市资源/水面.jpg')
texture.wrapS=THREE.RepeatWrapping
texture.wrapT=THREE.RepeatWrapping
texture.repeat.set(20,20)
//创建法线贴图
const texture1 = new THREE.TextureLoader().load('/../智慧城市资源/normal.jpg')
texture1.wrapS = THREE.RepeatWrapping
texture1.wrapT = THREE.RepeatWrapping
texture1.repeat.set(20, 20)
const material=new THREE.MeshPhongMaterial({
map:texture,
normalMap:texture1
})
//uv动画
function aniamtes(){
    texture.offset.x+=0.01
    requestAnimationFrame(aniamtes)
}
aniamtes()
const water=new THREE.Mesh(geometry,material)
water.position.z+=10
export{water}