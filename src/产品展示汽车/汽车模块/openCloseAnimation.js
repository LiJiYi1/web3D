import TWEEN from "@tweenjs/tween.js"
function animate(door,angle,angle1){
const tween = new TWEEN.Tween(door.rotation)
.to({
    x:0,
    y:angle,
    z:angle1
},1000);
//返回tween到animate
return tween
}
export {animate,TWEEN}