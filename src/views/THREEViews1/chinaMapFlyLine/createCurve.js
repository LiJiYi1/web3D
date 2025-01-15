import * as THREE from 'three'
//创建俩颜色用来插值
const color1=new THREE.Color(1,0,0)
const color2 = new THREE.Color(1, 0, 1)
function createCurve(center,chooseCenter,num){
    const start=new THREE.Vector3(chooseCenter[0],chooseCenter[1],1)
    const end=new THREE.Vector3(center[0],center[1],1)
    const middle=new THREE.Vector3((chooseCenter[0]+center[0])/2,(chooseCenter[1]+center[1])/2,num)
    // console.log(start,middle,end);
    const curve = new THREE.CatmullRomCurve3([start,middle,end]);
    const points=curve.getPoints(100)
    const geometry=new THREE.BufferGeometry()
    geometry.setFromPoints(points)
    const material=new THREE.LineBasicMaterial({
       color: 0xff00f8
    })
    const Curve=new THREE.Line(geometry,material)
    //截取一段流动线
    let index=0
    const Num=20
    const points1=points.slice(index,index+Num)
    const geometry1=new THREE.BufferGeometry()
    geometry1.setFromPoints(points1)
    //geometry的颜色插值实现渐变效果。
    const count=geometry1.attributes.position.count
    const arr=[]
    for(let i=0;i<count;i++){
     const bi=i/count
     const color=color2.clone().lerp(color1.clone(),bi)
     arr.push(color.r,color.g,color.b)
    }
    const c=new Float32Array(arr)
    geometry1.attributes.color=new THREE.BufferAttribute(c,3)

    const material1=new THREE.LineBasicMaterial({
        vertexColors:true
    })
    const curve1=new THREE.Line(geometry1,material1)
    Curve.add(curve1)
    //渲染循环一直改index
    function loop(){
        index+=1
        if(index>80)index=0
        const points2 = points.slice(index, index + Num)
        geometry1.setFromPoints(points2)
        requestAnimationFrame(loop)
    }
     loop()
    return Curve
}
export {createCurve}