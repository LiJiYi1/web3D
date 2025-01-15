function transform(R,longitude,latitude){
longitude=-longitude
//角度转弧度
const lon=longitude*Math.PI/180
const lat=latitude*Math.PI/180
//y坐标
const y=R*Math.sin(lat)
//x坐标
const x=R*Math.cos(lat)*Math.cos(lon)
//z坐标
const z=R*Math.cos(lat)*Math.sin(lon)
return {
x:x,
y:y,
z:z
}
}
export {transform}