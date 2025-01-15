function lon2xy(longitude, latitude) {
    var E = longitude;
    var N = latitude;
    var x = E * 20037508.34 / 180;
    var y = Math.log(Math.tan((90 + N) * Math.PI / 360)) / (Math.PI / 180);
    y = y * 20037508.34 / 180;
    return {
        x: x, //墨卡托x坐标——对应经度
        y: y, //墨卡托y坐标——对应维度
    }
}
export {
    lon2xy
}