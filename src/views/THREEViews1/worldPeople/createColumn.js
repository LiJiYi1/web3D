import * as THREE from 'three'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
function createColumn(arr) {
    const geometry = mergeGeometries(arr)
    //实现颜色渐变效果
    const count=geometry.attributes.position.count
    for(let i=0;i<count;i++){
        const z=geometry.attributes.position.getZ(i)
        const c = geometry.attributes.color
        if(z<10.01){
            c.setX(i,c.getX(i)*0)
            c.setY(i, c.getY(i) * 0)
            c.setZ(i, c.getZ(i) * 0)
        }
        else{
            c.setX(i,c.getX(i)*0)
            c.setY(i, c.getY(i) * 0.5)
            c.setZ(i, c.getZ(i) * 1)
        }
    }
    const material = new THREE.MeshLambertMaterial({
        vertexColors:true
    })
    const column= new THREE.Mesh(geometry, material)
    return column
}
export { createColumn }