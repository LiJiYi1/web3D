import * as THREE from 'three'
//光圈的贴图
const texture2 = new THREE.TextureLoader().load('../../../地球大屏可视化资源/标注光圈.png')
function createCircle(x,y,z,hot){
    let color
    if (hot > 150) {
        color = new THREE.Color(0, 0, 1)
    }
    else if (hot > 100 && hot < 150) {
        color = new THREE.Color(1, 0, 1)
    }
    else {
        color = new THREE.Color(0, 1, 1)
    }
    //创建光圈
    const geometry2 = new THREE.PlaneGeometry(6, 6)
    const material2 = new THREE.MeshBasicMaterial({
        color: color,
        map: texture2,
        transparent: true
    })
    const circle = new THREE.Mesh(geometry2, material2)
    circle.position.set(x,y,z)
    circle.z += 3
    const v=new THREE.Vector3(0,0,1)
    const v1=new THREE.Vector3(x,y,z).normalize()
    const q=new THREE.Quaternion().setFromUnitVectors(v,v1)
    circle.quaternion.copy(q)
    circle.speed=Math.random()*(5-3)+3
    circle.s=0
    
    return circle
}
export {createCircle}