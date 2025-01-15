import * as THREE from 'three'
const landGroup=new THREE.Group()
const pointGroup=new THREE.Group()
landGroup.add(pointGroup)
const land=new THREE.GridHelper(8000,80)
land.material.color.set(1,0,1)
land.rotateX(Math.PI/2)
land.position.set(13524770.770778058, 3664150.4907626663,-10)
const geometry=new THREE.PlaneGeometry(20,20)
const material=new THREE.MeshBasicMaterial({
    color:0xff00ff,
    side:THREE.DoubleSide
})
const plane=new THREE.Mesh(geometry,material)
plane.position.set(13524770.770778058, 3664150.4907626663,-10)
landGroup.add(land,plane)
//通过包围盒获取网格范围方便创建点
const box3=new THREE.Box3()
box3.expandByObject(land)
const lonMin=box3.min.x
const lonMax=box3.max.x
const latMin=box3.min.y
const latMax=box3.max.y
//console.log(lonMin,lonMax,latMin,latMax);
for(let i=0;i<80;i++){
    const lon=lonMin+100*i
    for(let j=0;j<80;j++){
     const lat=latMin+100*j
     const point=plane.clone()
     point.position.set(lon,lat)
     pointGroup.add(point)
    }
}
export {landGroup}