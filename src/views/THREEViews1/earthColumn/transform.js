function transform(R,longitude,latitude){
    longitude=-longitude
    //角度转弧度
    const lon=longitude*Math.PI/180
    const lat=latitude*Math.PI/180
    //根据纬度算y坐标
    const y=R*Math.sin(lat)
    //计算x,z坐标
    const x=R*Math.cos(lat)*Math.cos(lon)
    const z=R*Math.cos(lat)*Math.sin(lon)
    return {
        x,
        y,
        z
    }
}
export {transform}