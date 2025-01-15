import * as THREE from 'three'
import { transform } from './transform'
function createBox(H,Color,x,y){
    const geometry=new THREE.BoxGeometry(2,2,H)
    geometry.translate(0,0,H/2)
    const material=new THREE.MeshLambertMaterial()
    const box=new THREE.Mesh(geometry,material)
    const coord=transform(100,x,y)
    box.material.color.copy(Color)
    box.position.set(coord.x,coord.y,coord.z)
   
    box.quaternion.copy(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,0,1),new THREE.Vector3(coord.x,coord.y,coord.z).normalize()))
    return box
}
export {createBox}