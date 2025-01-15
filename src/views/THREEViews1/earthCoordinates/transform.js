//以半径，经度和纬度作为参数
function transform(R, longitude, latitude){
    //角度转弧度
    let lon = longitude * Math.PI /180
    const lat = latitude * Math.PI /180
    //y的坐标就是半径乘以纬度的sin值
    const y=R*Math.sin(lat)
    //x,z的坐标其实就是半径乘以经纬度的COS值拿到一个投影在xoz平面的线
    //THREE里面Z坐标与经纬度是相反的所以要把纬度换成负的用
    lon=-lon
    //这个线乘以sin是z坐标乘以cos是x坐标
    const x=R*Math.cos(lat)*Math.cos(lon)
    const z=R*Math.cos(lat)*Math.sin(lon)
//返回一个包含x,y,z的对象
return {
    x:x,
    y:y,
    z:z
}
}
export {transform}