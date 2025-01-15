import { camera } from "./camera.js";
import { spriteArr } from "./createPoints";
import { animate } from "./openCloseAnimation.js";
import { open,close } from "./audio.js";
import * as THREE from 'three'
function closeOpen(model){
    //看一下是否获得了四个光标
    //console.log(spriteArr);
    //获得四个车门
    const leftFront= model.getObjectByName('左前门')
    const leftBack = model.getObjectByName('左后门')
    const rightFront = model.getObjectByName('右前门')
    const rigthBack = model.getObjectByName('右后门')
    const backban = model.getObjectByName('后备箱')
    //给车门一个状态
    leftFront.closeOpen='close'
    leftBack.closeOpen='close'
    rightFront.closeOpen='close'
    rigthBack.closeOpen='close'
    backban.closeOpen='close'
    //把四个车门分别绑给四个光标
    spriteArr[0].door=leftBack
    spriteArr[1].door = leftFront
    spriteArr[2].door = rightFront
    spriteArr[3].door = rigthBack
    spriteArr[4].door = backban
    //创建点击事件来实现射线拾取
    document.addEventListener('click',(e)=>{
    //坐标修正
    const x=e.offsetX
    const y=e.offsetY
    const px=2*(x/window.innerWidth)-1
    const py=-2*(y / window.innerHeight)+1
    // console.log(px,py);
    //创建射线拾取,通过选中光标操纵车门
    const rayCaster = new THREE.Raycaster()
    rayCaster.setFromCamera(new THREE.Vector2(px,py),camera)
    const intersect=rayCaster.intersectObjects(spriteArr)
    if(intersect.length>0){
        const door = intersect[0].object.door
        if(door.name.slice(0,1)==='右'){
            //如果车门是关的就给他关上并改变车门状态，如果是关的就给他打开并改变车门状态
            if(door.closeOpen==='close'){
                // door.rotateY(Math.PI/3)
                animate(door, Math.PI / 3,0).start().onStart(()=>{open.play()})
                
                door.closeOpen = 'open'
            }
            else{
                //door.rotateY(-Math.PI / 3)
                animate(door, 0,0).start().onComplete(()=>{close.play()})
                door.closeOpen = 'close'
            }
        }
        else if (door.name.slice(0, 1) === '左') { 
            //如果车门是关的就给他关上并改变车门状态，如果是关的就给他打开并改变车门状态
            if (door.closeOpen === 'close') {
                // door.rotateY(Math.PI / 3)
                animate(door, -Math.PI / 3,0).start().onStart(()=>{open.play()})
                
                door.closeOpen = 'open'
                
            }
            else {
                //  door.rotateY(-Math.PI / 3)
                animate(door, 0,0).start().onComplete(()=>{close.play()})
                
                door.closeOpen = 'close'
            }
        }
        else{
            //如果车门是关的就给他关上并改变车门状态，如果是关的就给他打开并改变车门状态
            if (door.closeOpen === 'close') {
                // door.rotateY(Math.PI / 3)
                animate(door,0, Math.PI / 3).start().onStart(() => { open.play() })

                door.closeOpen = 'open'

            }
            else {
                //  door.rotateY(-Math.PI / 3)
                animate(door, 0,0).start().onComplete(() => { close.play() })

                door.closeOpen = 'close'
            }
        }
    
        
    }







    })
  
    







}
export {closeOpen}