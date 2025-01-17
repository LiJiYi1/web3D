<template>
  <el-scrollbar height="86%">
  <div>

  <el-card style="margin-right:2%;background-image:url('/前端页面资源/bgc/bgcMain13.gif');min-width:220px;max-width: 220px;float:right;margin-top:20px;opacity:0.8;background-color:#363434;width:30%">
    <template #header><p>学习历程</p></template>
    <img
      src="/前端页面资源/image.png"
      style="width: 100%; opacity:0.6"
    />

  <el-card style="background-image:url('/前端页面资源/bgc/bgcMain4.gif');max-width: 480px;background-color:#363434">
  <p style="color: yellow;">web3D学习历程</p>
  </el-card>


  </el-card>

    <h1 id="about">webGL(2024.1.15-2024.2.15&&2024.10.15-2025.11.15)</h1>
    <div id="text" style="margin-right: 260px;">
    <p id="textP" style=" line-height: 1.6">在接触到webGIS后对webGL产生了好奇。就在B站上找了课程看。最开始找的是
    <a href="https://space.bilibili.com/410503457" target="_blank">冰哥图形学</a>
    说来惭愧,刚开始觉得他讲的不是很好。开局一堆封装的初始化webGL的函数,一坨一坨的根本看不懂。给我劝退了,
    后来又找了一个
    <a href="https://space.bilibili.com/1028978784" target="_blank">李伟</a>
    的视频,这个看入门了之后俩结合起来一直在看最后是花了一个月给入门了。那时候只是会创建点三角形线,然后了解了一些设置
    API,一些缓冲区以及从JS传顶点数据给webGL。贴图,MVP矩阵之类的。至少能看代码了。
    后来又陆续看了冰哥的shader初级和中级对GLSL也进行了一个学习。别的不说,至少从shadertoy搬效果然后改效果是没啥问题了。
    再之后就是学THREE的时候我买了一个系统课:<a href="https://space.bilibili.com/47762042" target="_blank">郭老师</a>的,在那个课里也对webGL进行了一个讲解。只能说受益匪浅吧。
    到这个时候在我看来,webGL这块就没啥问题了,对于我一个没工作的小白来说已经很厉害了。
    </p>
    </div>
    <br>
    <h1 id="about">THREE.JS(2024.4.11-2024.10.15)</h1>
    <div id="text" style="margin-right: 260px;">
       <p id="textP" style=" line-height: 1.6">
    这段开始是跟着<a href="https://space.bilibili.com/47762042" target="_blank">郭老师</a>
    在B站发的免费课程学的,学着挺有意思的就买了他的系统课。之后断断续续学了有半年,最后是彻底学完了,
    学完那个系统课感觉是对THREE彻头彻尾的了解了,从基础调库到外部扩展库,各种动画,各种几何计算,各种着色器,各种可视化都
    非常了解。THREE部分只看了郭老师一个人的,但是真的感觉一站到底,基础无比扎实。
    </p>
    </div>
   
    <br>
    <h1 id="about">Cesium.JS(2024.3.11-2024.4.11&&2024.10.15-2024.12.15)</h1>
    <div id="text" style="margin-right: 60px;">
         <p id="textP" style=" line-height: 1.6">
    Cesium这块就师承多处了,毕竟Cesium的教学资源比较少。也是摸索着学习。开始是跟着<a href="https://space.bilibili.com/597185371" target="_blank">小飞侠</a>学的,
    比较基于调库的讲解,那时候对着文档学了初级中级的,大概达到了一个入门级的水准。后面学完THREE后感觉Cesium不应该
    只有那些东西,他应该和THREE一样有各种定制,做各种酷酷的效果。所以就去找到了<a href="http://cesium.xin/wordpress/archives/tag/cesium" target="_blank">一个网站</a>买了个会员学了一下。这次
    对着博客,源码,官方案例库。彻彻底底学了一下,从初级到高级。从调用API到着色器定制,到源码解读都学了一遍。后面还有Cesium的数据处理
    也看了一下。感觉Cesium也是无敌了,非常会了。这段时间我感觉我看博客的能力也提高了很多。

    </p>
    </div>
  
    
  </div> 
     <div style="width: 100%;height:100%;position:absolute;left:0px;top:0px;z-index:-1">
    <canvas ref="webgl" id='webGL' width="1520" height="1470"></canvas>
  </div>
</el-scrollbar>
</template>

<script setup>

import { onMounted,ref } from 'vue';
const webgl=ref(null)
onMounted(()=>{
const gl=webgl.value.getContext('webgl')
//顶点着色器
const vertexSource=`
attribute vec4 a_pos;
attribute vec2 a_coord;
varying vec2 v_coord;
void main(){
v_coord=a_coord;
gl_Position=a_pos;
}`
//片元着色器
const fragSource=`
// 所有float类型数据的精度是lowp
precision mediump float;
varying vec2 v_coord;
uniform vec2 st;
uniform float u_time;
uniform sampler2D u_sam;
uniform vec2 u_mouse;
const float PI	 	= 3.14159265358;
const float EPSILON	= 1e-3;
#define  EPSILON_NRM	(0.5 / st.x)
const int NUM_STEPS = 6;
const int ITER_GEOMETRY = 2;
const int ITER_FRAGMENT =5;

const float SEA_HEIGHT = 0.5;
const float SEA_CHOPPY = 3.0;
const float SEA_SPEED = 1.9;
const float SEA_FREQ = 0.24;
const vec3 SEA_BASE = vec3(0.11,0.19,0.22);
const vec3 SEA_WATER_COLOR = vec3(0.55,0.9,0.7);
#define SEA_TIME (u_time * SEA_SPEED)
mat2 octave_m = mat2(1.7,1.2,-1.2,1.4);
const float KEY_SP    = 32.5/256.0;
vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}
vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
    mat3 fromEuler(vec3 ang) {
	vec2 a1 = vec2(sin(ang.x),cos(ang.x));
    vec2 a2 = vec2(sin(ang.y),cos(ang.y));
    vec2 a3 = vec2(sin(ang.z),cos(ang.z));
    mat3 m;
    m[0] = vec3(a1.y*a3.y+a1.x*a2.x*a3.x,a1.y*a2.x*a3.x+a3.y*a1.x,-a2.y*a3.x);
	m[1] = vec3(-a2.y*a1.x,a1.y*a2.y,a2.x);
	m[2] = vec3(a3.y*a1.x*a2.x+a1.y*a3.x,a1.x*a3.x-a1.y*a3.y*a2.x,a2.y*a3.y);
	return m;
}
  float hash( vec2 p ) {
    float h = dot(p,vec2(127.1,311.7));	
    return fract(sin(h)*83758.5453123);
}
float noise( in vec2 p ) {
    vec2 i = floor( p );
    vec2 f = fract( p );	

    vec2 u = f*f*(3.0-2.0*f);

    return -1.0+2.0*mix( 
                mix( hash( i + vec2(0.0,0.0) ), 
                     hash( i + vec2(1.0,0.0) ), 
                        u.x),
                mix( hash( i + vec2(0.0,1.0) ), 
                     hash( i + vec2(1.0,1.0) ), 
                        u.x), 
                u.y);
}
float diffuse(vec3 n,vec3 l,float p) {
    return pow(dot(n,l) * 0.4 + 0.6,p);
}
    float specular(vec3 n,vec3 l,vec3 e,float s) {    
    float nrm = (s + 8.0) / (3.1415 * 8.0);
    return pow(max(dot(reflect(e,n),l),0.0),s) * nrm;
}
vec3 getSkyColor(vec3 e) {
    e.y = max(e.y,0.0);
    vec3 ret;
    ret.x = pow(1.0-e.y,2.0);
    ret.y = 1.0-e.y;
    ret.z = 0.6+(1.0-e.y)*0.4;
    return ret;
}
float sea_octave(vec2 uv, float choppy) {

    uv += noise(uv);

    vec2 wv = 1.0-abs(sin(uv)); 

 
    vec2 swv = abs(cos(uv));  

    wv = mix(wv,swv,wv);


    return pow(1.0-pow(wv.x * wv.y,0.65),choppy);
}
float map(vec3 p) {
    float freq = SEA_FREQ;
    float amp = SEA_HEIGHT;
    float choppy = SEA_CHOPPY;
    vec2 uv = p.xz; uv.x *= 0.75;
    
  
    float d, h = 0.0;    
    for(int i = 0; i < ITER_GEOMETRY; i++) {
        
    	d = sea_octave((uv+SEA_TIME)*freq,choppy);
 

        h += d * amp; // bteitler: Bump our height by the current wave function
   
    	uv *=  octave_m;
        
        freq *= 1.9; // bteitler: Exponentially increase frequency every iteration (on top of our permutation)
        amp *= 0.22; // bteitler: Lower the amplitude every frequency, since we are adding finer and finer detail

        choppy = mix(choppy,1.0,0.2);
    }
    return p.y - h;
}
float map_detailed(vec3 p) {
    float freq = SEA_FREQ;
    float amp = SEA_HEIGHT;
    float choppy = SEA_CHOPPY;
    vec2 uv = p.xz; uv.x *= 0.75;
    
    float d, h = 0.0;    
    for(int i = 0; i < ITER_FRAGMENT; i++) {
        // bteitler: start out with our 2D symmetric wave at the current frequency
    	d = sea_octave((uv+SEA_TIME)*freq,choppy);
        // bteitler: stack wave ontop of itself at an offset that varies over time for more height and wave pattern variance
    	d += sea_octave((uv-SEA_TIME)*freq,choppy);
        
        h += d * amp; // bteitler: Bump our height by the current wave function
     
    	uv *= octave_m/1.2;
        
        freq *= 1.9; // bteitler: Exponentially increase frequency every iteration (on top of our permutation)
        amp *= 0.22; // bteitler: Lower the amplitude every frequency, since we are adding finer and finer detail
     
        choppy = mix(choppy,1.0,0.2);
    }
    return p.y - h;
}
vec3 getSeaColor(vec3 p, vec3 n, vec3 l, vec3 eye, vec3 dist) {  
    // bteitler: Fresnel is an exponential that gets bigger when the angle between ocean
    // surface normal and eye ray is smaller
    float fresnel = 1.0 - max(dot(n,-eye),0.0);
    fresnel = pow(fresnel,3.0) * 0.45;
        
    // bteitler: Bounce eye ray off ocean towards sky, and get the color of the sky
    vec3 reflected = getSkyColor(reflect(eye,n))*0.99;    
    
    // bteitler: refraction effect based on angle between light surface normal
    vec3 refracted = SEA_BASE + diffuse(n,l,80.0) * SEA_WATER_COLOR * 0.27; 
    
    // bteitler: blend the refracted color with the reflected color based on our fresnel term
    vec3 color = mix(refracted,reflected,fresnel);
    
    // bteitler: Apply a distance based attenuation factor which is stronger
    // at peaks
    float atten = max(1.0 - dot(dist,dist) * 0.001, 0.0);
    color += SEA_WATER_COLOR * (p.y - SEA_HEIGHT) * 0.15 * atten;
    
    // bteitler: Apply specular highlight
    color += vec3(specular(n,l,eye,90.0))*0.5;
    
    return color;
}
vec3 getNormal(vec3 p, float eps) {
    // bteitler: Approximate gradient.  An exact gradient would need the "map" / "map_detailed" functions
    // to return x, y, and z, but it only computes height relative to surface along Y axis.  I'm assuming
    // for simplicity and / or optimization reasons we approximate the gradient by the change in ocean
    // height for all axis.
    vec3 n;
    n.y = map_detailed(p); // bteitler: Detailed height relative to surface, temporarily here to save a variable?
    n.x = map_detailed(vec3(p.x+eps,p.y,p.z)) - n.y; // bteitler approximate X gradient as change in height along X axis delta
    n.z = map_detailed(vec3(p.x,p.y,p.z+eps)) - n.y; // bteitler approximate Z gradient as change in height along Z axis delta
    // bteitler: Taking advantage of the fact that we know we won't have really steep waves, we expect
    // the Y normal component to be fairly large always.  Sacrifices yet more accurately to avoid some calculation.
    n.y = eps; 
    return normalize(n);

    // bteitler: A more naive and easy to understand version could look like this and
    // produces almost the same visuals and is a little more expensive.
    // vec3 n;
    // float h = map_detailed(p);
    // n.y = map_detailed(vec3(p.x,p.y+eps,p.z)) - h;
    // n.x = map_detailed(vec3(p.x+eps,p.y,p.z)) - h;
    // n.z = map_detailed(vec3(p.x,p.y,p.z+eps)) - h;
    // return normalize(n);
}
float heightMapTracing(vec3 ori, vec3 dir, out vec3 p) {  
    float tm = 0.0;
    float tx = 500.0; // bteitler: a really far distance, this could likely be tweaked a bit as desired

    // bteitler: At a really far away distance along the ray, what is it's height relative
    // to the ocean in ONLY the Y direction?
    float hx = map(ori + dir * tx);
    
    // bteitler: A positive height relative to the ocean surface (in Y direction) at a really far distance means
    // this pixel is pure sky.  Quit early and return the far distance constant.
    if(hx > 0.0) return tx;   

    // bteitler: hm starts out as the height of the camera position relative to ocean.
    float hm = map(ori + dir * tm); 
   
    // bteitler: This is the main ray marching logic.  This is probably the single most confusing part of the shader
    // since height mapping is not an exact distance field (tells you distance to surface if you drop a line down to ocean
    // surface in the Y direction, but there could have been a peak at a very close point along the x and z 
    // directions that is closer).  Therefore, it would be possible/easy to overshoot the surface using the raw height field
    // as the march distance.  The author uses a trick to compensate for this.
    float tmid = 0.0;
    for(int i = 0; i < NUM_STEPS; i++) { // bteitler: Constant number of ray marches per ray that hits the water
        // bteitler: Move forward along ray in such a way that has the following properties:
        // 1. If our current height relative to ocean is higher, move forward more
        // 2. If the height relative to ocean floor very far along the ray is much lower
        //    below the ocean surface, move forward less
        // Idea behind 1. is that if we are far above the ocean floor we can risk jumping
        // forward more without shooting under ocean, because the ocean is mostly level.
        // The idea behind 2. is that if extruding the ray goes farther under the ocean, then 
        // you are looking more orthgonal to ocean surface (as opposed to looking towards horizon), and therefore
        // movement along the ray gets closer to ocean faster, so we need to move forward less to reduce risk
        // of overshooting.
        tmid = mix(tm,tx, hm/(hm-hx));
        p = ori + dir * tmid; 
                  
    	float hmid = map(p); // bteitler: Re-evaluate height relative to ocean surface in Y axis

        if(hmid < 0.0) { // bteitler: We went through the ocean surface if we are negative relative to surface now
            // bteitler: So instead of actually marching forward to cross the surface, we instead
            // assign our really far distance and height to be where we just evaluated that crossed the surface.
            // Next iteration will attempt to go forward more and is less likely to cross the boundary.
            // A naive implementation might have returned <tmid> immediately here, which
            // results in a much poorer / somewhat indeterministic quality rendering.
            tx = tmid;
            hx = hmid;
        } else {
            // Haven't hit surface yet, easy case, just march forward
            tm = tmid;
            hm = hmid;
        }
    }

    // bteitler: Return the distance, which should be really close to the height map without going under the ocean
    return tmid;
}
  

void main() {
vec2 uv = gl_FragCoord.xy / st.xy;

    uv = uv * 2.0 - 1.0; //  bteitler: Shift pixel coordinates from 0 to 1 to between -1 and 1
    uv.x *= st.x / st.y; // bteitler: Aspect ratio correction - if you don't do this your rays will be distorted
    float time = u_time * 2.7; // bteitler: An
    float roll = PI + sin(u_time)/14.0 + cos(u_time/2.0)/14.0 ;
    float pitch = PI*1.021 + (sin(u_time/2.0)+ cos(u_time))/40.0 
        + (u_mouse.y/st.y - .8)*PI/3.0  ;
    float yaw = u_mouse.x/st.x * PI * 4.0;
    vec3 ang = vec3(roll,pitch,yaw);
    vec3 ori = vec3(0.0,3.5,time*3.0);
    vec3 dir = normalize(vec3(uv.xy,-1.6)); 
    dir = normalize(dir) * fromEuler(ang);
       vec3 p;
    heightMapTracing(ori,dir,p);

    vec3 dist = p - ori;
    vec3 n = getNormal(p, 
             dot(dist,dist)   // bteitler: Think of this as inverse resolution, so far distances get bigger at an expnential rate
                * EPSILON_NRM // bteitler: Just a resolution constant.. could easily be tweaked to artistic content
           );
    vec3 light = normalize(vec3(0.0,1.0,0.8)); 
    vec3 skyColor = getSkyColor(dir);
    vec3 seaColor = getSeaColor(p,n,light,dir,dist);
    seaColor /= sqrt(sqrt(length(dist))) ;
   seaColor *= sqrt(sqrt(seaColor)) * 4.0;
        skyColor *= 1.05;
        skyColor -= 0.03;
        
    skyColor *= skyColor;
    vec3 seaHsv = rgb2hsv(seaColor);
    if (seaHsv.z > .75 && length(dist) < 50.0)
       seaHsv.z -= (0.9 - seaHsv.z) * 1.3;
    seaColor = hsv2rgb(seaHsv);
      vec3 color = mix(
        skyColor,
        seaColor,
    	pow(smoothstep(0.0,-0.05,dir.y), 0.3) // bteitler: Can be thought of as "fog" that gets thicker in the distance
    );
   vec4 fragColor = vec4(pow(color,vec3(0.75)), 1.0);
    vec3 hsv = rgb2hsv(fragColor.xyz);   
    hsv.z *= sqrt(hsv.z) * 1.1; 
    
hsv.z *= 0.9;
        
  hsv.z *= 0.9;
        
        //CaliCoastReplay:  Hue alteration 
        hsv.x -= hsv.z/10.0;
        hsv.x += 0.02 + hsv.z/50.0;
        //Final brightening
        hsv.z *= 1.01;
        //This really "cinemafies" it for the day -
        //puts the saturation on a squared, highly magnified footing.
        //Worth looking into more as to exactly why.
       // hsv.y *= 5.10 * hsv.y * sqrt(hsv.y);
        hsv.y += 0.07;
fragColor.xyz = hsv2rgb(hsv);

gl_FragColor=fragColor;
}
`
//初始化着色器
const program=initShader(gl,vertexSource,fragSource)
//加载纹理
const data=new Float32Array([
    1.0,1.0,1.0,  1.0,1.0,
    -1.0,1.0,1.0, 0.0,1.0,
    -1.0,-1.0,.5,0.0,0.0,
    1.0,1.0,1.0,  1.0,1.0,
    -1.0,-1.0,1.0,0.0,0.0,
    1.0,-1.0,.5, 1.0,0.0   //面1
])
console.log(data.BYTES_PER_ELEMENT);
const pos=gl.getAttribLocation(program,'a_pos')
const uv=gl.getAttribLocation(program,'a_coord')
const sam=gl.getUniformLocation(program,'u_sam')
const buffer=gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER,buffer)
gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW)
gl.vertexAttribPointer(pos,3,gl.FLOAT,false,4*5,0)
gl.enableVertexAttribArray(pos)
gl.vertexAttribPointer(uv,2,gl.FLOAT,false,4*5,4*3)
gl.enableVertexAttribArray(uv)
//创建纹理图片
const img=new Image()
img.src='/../webGL资源/科比.jpg'
img.onload=()=>{
const texture=gl.createTexture()
gl.activeTexture(gl.TEXTURE0)
gl.bindTexture(gl.TEXTURE_2D,texture)
gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
//设置纹理贴图填充方式(纹理贴图像素尺寸大于顶点绘制区域像素尺寸)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
//设置纹理贴图填充方式(纹理贴图像素尺寸小于顶点绘制区域像素尺寸)
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
//设置纹素格式，jpg格式对应gl.RGB
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
gl.uniform1i(sam, 0);//纹理缓冲区单元TEXTURE0中的颜色数据传入片元着色器
// gl.getProgramInfoLog(program);
//开启深度测试
gl.enable(gl.DEPTH_TEST)
gl.drawArrays(gl.TRIANGLES,0,6)
}
//把画布坐标传给他
const xy=gl.getUniformLocation(gl.program,'st')
gl.uniform2f(xy,window.innerWidth,window.innerHeight*2.)
//鼠标位置
webgl.value.addEventListener('mousemove',(e)=>{
const X=e.offsetX
const Y=-e.offsetY+670
//把X,Y坐标传给着色器
const mouse=gl.getUniformLocation(gl.program,'u_mouse')
gl.uniform2f(mouse,X,Y)

})
//传入时间
const time=gl.getUniformLocation(gl.program,'u_time')
let Time=0;
function loop(){
    Time+=0.01;
    gl.uniform1f(time,Time)
    requestAnimationFrame(loop)
    gl.drawArrays(gl.TRIANGLES,0,6)
}
loop()
})
function initShader(gl,vertexSource,fragSource){
const program=gl.createProgram()
const vsShader=gl.createShader(gl.VERTEX_SHADER)
const fsShader=gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(vsShader,vertexSource)
gl.shaderSource(fsShader,fragSource)
gl.compileShader(vsShader)
gl.compileShader(fsShader)
gl.attachShader(program,vsShader)
gl.attachShader(program,fsShader)
gl.linkProgram(program)
gl.useProgram(program)
gl.program=program
return program
}

</script>

<style scoped>
p{
  color: rgb(255, 255, 255);
  font-family:'cursive';
   text-shadow:
    1px 1px 2px black,
    0 0 1em blue,
    0 0 0.2em blue;
  font:
    1.2em Georgia,
    "Bitstream Charter",
    "URW Bookman L",
    "Century Schoolbook L",
    serif;
}
.demo-image{
  position: absolute;
  width: 100%;
  left: 0px;
  top:0px;
  z-index: -1
}
#about{
  margin-left: 3%;
    color: rgb(91, 253, 4);
    font-family:'cursive';
   text-shadow:
    1px 1px 2px black,
    0 0 2.1em rgb(236, 22, 22),
    0 0 1.2em rgb(255, 255, 255);
  font:
    2.0em Georgia,
    "Bitstream Charter",
    "URW Bookman L",
    "Century Schoolbook L",
    serif;
}
#text{
  margin-left: 3%;
  color: rgb(0, 255, 204);
  font-family:'cursive';
   text-shadow:
    1px 1px 2px black,
    0 0 2em rgb(255, 255, 255),
    0 0 2.2em rgb(86, 245, 0);
  font:
    1.2em Georgia,
    "Bitstream Charter",
    "URW Bookman L",
    "Century Schoolbook L",
    serif;

  box-shadow: 0px 5px 10px  rgb(4, 218, 218) ,0px -5px 10px  rgb(7, 235, 220); 
opacity: 0.8;
margin-top: 10px;
border-radius: 10px;

}
#textP{
    color: rgb(0, 251, 255);

text-shadow:
    1px 1px 2px black,
    0 0 2em rgb(255, 255, 255),
    0 0 2.2em rgb(86, 245, 0);
 
font: bold small-caps italic 1.0em 'Roboto', Courier, monospace;
 
  box-shadow: 0px 5px 10px  rgba(2, 95, 255, 0.708) ,0px -5px 10px  rgba(2, 95, 255, 0.708); 
opacity: 0.9;
margin-top: 10px;
border-radius: 10px;
}
</style>