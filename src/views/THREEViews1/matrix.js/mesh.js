import * as THREE from 'three'
//创建一个模型的层级模型
const model=new THREE.Group()
//创建网格模型
const material=new THREE.MeshLambertMaterial({
    color:0xffff11
})
const geometry=new THREE.BoxGeometry(25,25,25)
const mesh=new THREE.Mesh(geometry,material)
const vector3 = new THREE.Vector3(100, 0, 0)
// //创建一个矩阵
// const Matrix=new THREE.Matrix4()
// //列主序矩阵(按列赋给数组)
// const arr=[
//     1,0,0,0,
//     0,1,0,0,
//     0,0,1,0,
//     20,20,40,1
// ]
// //把这个数组赋值给矩阵的element属性
// Matrix.elements=arr
// // console.log(Matrix);
// //运用矩阵给矢量进行一个矩阵变换，从而改变物体的位置
// vector3.applyMatrix4(Matrix)
// console.log(vector3);
// //把变了的矢量赋值给物体的位置属性
// mesh.position.copy(vector3)

//创建一个平移矩阵
const matrix1=new THREE.Matrix4()
matrix1.makeTranslation(0, 0,100)
//创建一个缩放矩阵
const matrix2 = new THREE.Matrix4()
matrix2.makeScale(0.5,0.5,0.5)
//创建一个旋转矩阵
const matrix3 = new THREE.Matrix4()
matrix3.makeRotationZ(Math.PI/3)
//矩阵乘出来
const total = matrix1.clone().multiply(matrix2).multiply(matrix3)
vector3.applyMatrix4(total)
mesh.position.copy(vector3)
model.add(mesh)
mesh.updateMatrix();//更新矩阵，.matrix会变化
console.log('本地矩阵', mesh.matrix);

model.position.set(2, 3, 4);
model.updateMatrixWorld();//group和子对象的世界矩阵、本地矩阵属性会更新

console.log('本地矩阵', mesh.matrix);
console.log('世界矩阵', mesh.matrixWorld);
export{model}