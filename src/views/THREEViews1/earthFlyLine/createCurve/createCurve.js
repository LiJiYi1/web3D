import * as  THREE from 'three'
import { transform } from '../transform'
import config from '../config'
import { threePointCenter } from './getCenter'
function createCurve(pos1,pos2){
//坐标转换
const coord1=transform(config.R,pos1[0],pos1[1])
const coord2=transform(config.R,pos2[0],pos2[1])
//两个点与原点的连线可以算出两个点之间的角度
const v1=new THREE.Vector3(coord1.x,coord1.y,coord1.z)
const v2=new THREE.Vector3(coord2.x,coord2.y,coord2.z)
//点乘计算夹角余弦值
const cos =v1.clone().normalize().dot(v2.clone().normalize())
//根据余弦值获得夹角
const rad=Math.acos(cos)
// console.log(angle);
//转换后的球面坐标取中点
const middle = v1.clone().add(v2.clone()).multiplyScalar(0.5)
//拿到中点的方向
const dir=middle.normalize()
//在中点方向找一个点作为圆弧的第三个点,这个点与圆心的距离与两个原始点之间的角度有关
const v3=dir.multiplyScalar(config.R+rad*8+2)
//两个原始点叉乘得到向量用于四元数旋转
const vq=v1.clone().cross(v2.clone()).normalize()
//通过四元数旋转把点转的XOY平面上关于Y轴对称
//第一个四元数把点转到XOY平面上
const q1=new THREE.Quaternion().setFromUnitVectors(vq,new THREE.Vector3(0,0,1).normalize())
//旋转后的三个点
const posXOY=v1.clone().applyQuaternion(q1)
const posXOY1=v2.clone().applyQuaternion(q1)
const posXOY3=v3.clone().applyQuaternion(q1)
//第三个点就是中点的方向
//计算第二个四元数
const q2=new THREE.Quaternion().setFromUnitVectors(posXOY3.clone().normalize(),new THREE.Vector3(0,1,0).normalize())
//根据第二个四元数拿到最终的点
const fpos1=posXOY.clone().applyQuaternion(q2)
const fpos2 = posXOY1.clone().applyQuaternion(q2)
const fpos3=posXOY3.clone().applyQuaternion(q2)
// console.log(fpos1,fpos2,fpos3);
//调用函数得到圆心
const center=threePointCenter(fpos2,fpos1,fpos3)
//拿到半径
const R=center.clone().sub(fpos2.clone()).length()
//算最后圆弧之间的夹角
const arrow1=fpos1.clone().sub(center)
const arrow2=fpos2.clone().sub(center)
const Cos=arrow1.clone().normalize().dot(arrow2.clone().normalize())
const Rad=Math.acos(Cos)*2/3
// console.log(Cos/180);

const startAngle=Math.PI/2-Rad
const endAngle=Math.PI/2+Rad
//创造圆弧
const curve1=new THREE.EllipseCurve(center.x,center.y,R,R,startAngle,endAngle,false)
//拿到顶点
const points=curve1.getSpacedPoints(100)
//根据圆弧的角度算起始的角度和结束的角度
const geometry=new THREE.BufferGeometry()
geometry.setFromPoints(points)
const material=new THREE.LineBasicMaterial({
    color:0xff00ff
})
const curve=new THREE.Line(geometry,material)
const curve2 = new THREE.EllipseCurve(0, 0, R, R, startAngle, startAngle+Math.PI/10, false)
//拿到顶点
const points2 = curve2.getSpacedPoints(1000)
const percent=[]
for(let i=0;i<points2.length;i++){
    const per=i/points2.length;
    percent.push(per)
}

//const color=[]
// const color1=new THREE.Color(1,0,1)
// const color2=new THREE.Color(1,1,0)
//根据圆弧的角度算起始的角度和结束的角度
const geometry2 = new THREE.BufferGeometry()
geometry2.attributes.percent=new THREE.BufferAttribute(new Float32Array(percent),1)
geometry2.setFromPoints(points2)
//设置顶点颜色渐变,实现视觉上头大尾小
// const count=geometry2.attributes.position.count
// for (let i = 0; i <count;i++){
//     const Color=color1.clone().lerp(color2,i/count)
//     color.push(Color.r,Color.g,Color.b)
// }
// geometry2.attributes.color=new THREE.BufferAttribute(new Float32Array(color),3)

const material2=new THREE.PointsMaterial({
color:0xffff00,
//vertexColor:true,设置顶点颜色
size:1.0
})
//修改着色器，实现真正意义上的小蝌蚪飞线，不仅仅存在于视觉效果。
material2.onBeforeCompile=(shader)=>{
    //console.log(shader.vertexShader);
    shader.vertexShader = shader.vertexShader.replace('void main() {',`
        attribute float percent;
        void main() {
        `)
    //gl_PointSize = size;
    shader.vertexShader = shader.vertexShader.replace('gl_PointSize = size;', `
         gl_PointSize=percent*size;
        `)
    //  
}
const Points=new THREE.Points(geometry2,material2)
Points.angle=endAngle-startAngle
Points.translateY(center.y)
curve.add(Points)
curve.quaternion.copy(new THREE.Quaternion().multiplyQuaternions(q1.invert(),q2.invert()))
return curve
}
export {createCurve}