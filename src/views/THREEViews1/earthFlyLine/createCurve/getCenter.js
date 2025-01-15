import * as THREE from 'three'
//求三个点的外接圆圆心，p1, p2, p3表示三个点的坐标Vector3。
function threePointCenter(p1, p2, p3) {
    var L1 = p1.lengthSq();//p1到坐标原点距离的平方
    var L2 = p2.lengthSq();
    var L3 = p3.lengthSq();
    var x1 = p1.x, y1 = p1.y, x2 = p2.x, y2 = p2.y, x3 = p3.x, y3 = p3.y;
    var S = x1 * y2 + x2 * y3 + x3 * y1 - x1 * y3 - x2 * y1 - x3 * y2;
    var x = (L2 * y3 + L1 * y2 + L3 * y1 - L2 * y1 - L3 * y2 - L1 * y3) / S / 2;
    var y = (L3 * x2 + L2 * x1 + L1 * x3 - L1 * x2 - L2 * x3 - L3 * x1) / S / 2;
    // 三点外接圆圆心坐标
    var center = new THREE.Vector3(x, y, 0);
    return center
}
export {threePointCenter}