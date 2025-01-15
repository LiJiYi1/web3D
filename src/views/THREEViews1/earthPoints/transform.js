function transform(R,longitude,latitude){
longitude=-longitude
const lon=longitude*Math.PI/180
const lat=latitude*Math.PI/180
const y=R*Math.sin(lat)
const x=R*Math.cos(lat)*Math.cos(lon)
const z=R*Math.cos(lat)*Math.sin(lon)
return {
    x,
    y,
    z
}
}
export {transform}