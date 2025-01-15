import * as THREE from 'three'
import { createBoarder } from './createBoarder'
const model=new THREE.Group()
const boarder=createBoarder()
model.add(boarder)











export {model}