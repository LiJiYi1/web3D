function transform(R,lon,lat){
lon=-lon
const longitude=lon*Math.PI/180
const latitude=lat*Math.PI/180
const y=R*Math.sin(latitude)
const x=R*Math.cos(latitude)*Math.cos(longitude)
const z=R*Math.cos(latitude)*Math.sin(longitude)
return {
    x:x,
    y:y,
    z:z
}
}
export {transform}