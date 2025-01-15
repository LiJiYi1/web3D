import * as THREE from 'three'

const geometry=new THREE.BoxGeometry(20,20,20)
const material=new THREE.MeshBasicMaterial()
const mesh=new THREE.Mesh(geometry,material)
mesh.position.set(0,200,0)
const mesh1 = new THREE.Mesh(geometry, material)
mesh1.position.set(0, 200, 100)
const  model=new THREE.Group()
model.add(mesh)
model.add(mesh1)
export {model}