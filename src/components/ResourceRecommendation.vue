<template>
  <el-scrollbar height="90%" style="width: 100%;height:100%;">
  <div id="main"> 
  <!-- 推荐主页 -->
  <div id="recommendation">
     <h1>web3D学习资源推荐</h1>
     <!-- B站学习资源 -->
     <div id="Outer">
  <div id="Inner">   
  <el-tabs type="card">
    <el-tab-pane label="B站Up主推荐"> 
      <div class="demo-type">
    <div>
    <!-- 小飞侠 -->
    <div onclick="window.open('https://space.bilibili.com/597185371?spm_id_from=333.337.search-card.all.click')">
        <el-avatar
        src="../../public/前端页面资源/recommendation/xiaofeixia.jpg"
        :size='100' id="el-avatar"
      />
      <div style="text-align: center;color:white;cursor:pointer">小飞侠GIS人</div>
    </div>
   <!-- 冰哥 -->
    <div onclick="window.open('https://space.bilibili.com/410503457?spm_id_from=333.337.0.0')">
        <el-avatar
        src="../../public/前端页面资源/recommendation/bingge.jpg"
        :size='100' id="el-avatar"
      />
      <div style="text-align: center;color:white;cursor:pointer">冰哥图形学工作站</div>
    </div>
  <!-- 李伟 -->
   <div onclick="window.open('https://space.bilibili.com/1028978784?spm_id_from=333.337.search-card.all.click')">
        <el-avatar
        src="../../public/前端页面资源/recommendation/liwei.jpg"
        :size='100' id="el-avatar"
      />
      <div style="text-align: center;color:white;cursor:pointer">李伟_Li慢慢</div>
    </div>
<!-- 野生猿 -->
     <div onclick="window.open('https://space.bilibili.com/1380937594')">
  <el-avatar
        src="../../public/前端页面资源/recommendation/yeshengyuan.jpg"
        :size='100' id="el-avatar"
      />
      <div style="text-align: center;color:white;cursor:pointer">社恐野生猿</div>
    </div>
<!-- 郭老师 -->
    <div onclick="window.open('https://space.bilibili.com/47762042')">
  <el-avatar
        src="../../public/前端页面资源/recommendation/guolongbang.png"
        :size='100' id="el-avatar"
      />
      <div style="text-align: center;color:white;cursor:pointer">郭隆邦</div>
    </div>
 
    </div>
  </div></el-tab-pane>
  </el-tabs>
       </div>
     </div>
     <!-- 网易云课学习资源 -->
     <div id="Outer">
     <div id="Inner">   
  <el-tabs type="card">
    <el-tab-pane label="网易云课课程推荐"> 
      <div class="demo-type">
    <div>
  
    <div onclick="window.open('https://study.163.com/course/introduction/1212760820.htm?inLoc=ss_ssjg_tjlb_three')">
        <el-avatar
        src="../../public/前端页面资源/wangYilesson/wangYi.jpg"
        :size='100' id="el-avatar"
      />
      <div style="text-align: center;color:white;cursor:pointer;width:110px">Three.js可视化系统课程WebGL</div>
    </div>
    <div onclick="window.open('https://study.163.com/course/introduction.htm?courseId=1213599804#/courseDetail?tab=1')">
            <el-avatar
        src="../../public/前端页面资源/wangYilesson/wangyiGL.png"
        :size='100' id="el-avatar"
      />
      <div style="text-align: center;color:white;cursor:pointer;width:110px">WebGL_Shader中级系列精讲</div>
    </div>

    </div>
  </div></el-tab-pane>
  </el-tabs>
       </div>
     </div>
     <!-- 博客社区网站 -->
     <div id="Outer">
       <div id="Inner">   
  <el-tabs type="card">
    <el-tab-pane label="社区,博客推荐"> 
      <div class="demo-type">
    <div>
      <div onclick="window.open('https://icegl.cn/')">
        <el-avatar
        src="../../public/前端页面资源/blog/ice.png"
        :size='100' id="el-avatar"
      />
      <div style="text-align: center;color:white;cursor:pointer">ICE-图形学社区</div>
    </div>

      <div>
      <div onclick="window.open('http://cesium.xin/wordpress/archives/all-article.html')">
        <el-avatar
        src="../../public/前端页面资源/blog/cesium.png"
        :size='100' id="el-avatar"
      />
      <div style="text-align: center;color:white;cursor:pointer">Cesium中文网</div>
    </div>
    </div>
    </div>
  </div></el-tab-pane>
  </el-tabs>
       </div>
     </div>
    <!-- shader与WebGL -->
    <div id="Outer">
       <div id="Inner">   
    <el-tabs type="card">
    <el-tab-pane label="Shader学习"> 
      <div class="demo-type">
    <div>
     
      <div onclick="window.open('https://www.shadertoy.com/')">
        <el-avatar
        src="../../public/前端页面资源/shaderWebGL/shadertoy.jpg"
        :size='100' id="el-avatar"
      />
      <div style="text-align: center;color:white;cursor:pointer">shadertoy</div>
    </div>
    
    <div onclick="window.open('https://webglsamples.org/')">
        <el-avatar
        src="../../public/前端页面资源/shaderWebGL/webglsamples.jpg"
        :size='100' id="el-avatar"
      />
    <div style="text-align: center;color:white;cursor:pointer">webglsamples</div>
    </div>
    </div>
     </div>
    </el-tab-pane >
      <el-tab-pane label="WEBGL案例"> 
      <div class="demo-type">
        <div>  <div  onclick="window.open('https://www.thingjs.com/guide/')">
      <div>
        <el-avatar
        src="../../public/前端页面资源/shaderWebGL/thing.png"
        :size='100' id="el-avatar"
      />
      <div style="text-align: center;color:white;cursor:pointer">thingJS</div>
    </div>
  
    </div>
     <div  onclick="window.open('https://www.hightopo.com/demos/index.html')">
      <div>
        <el-avatar
        src="../../public/前端页面资源/shaderWebGL/tupu.png"
        :size='100' id="el-avatar"
      />
      <div style="text-align: center;color:white;cursor:pointer">图扑</div>
    </div>
  
    </div></div>
  
    
    <div>
    
  
    </div>
     </div>
    </el-tab-pane>
      <el-tab-pane label="气象效果"> 
      <div class="demo-type">
    <div onclick="window.open('http://data.cma.cn:8049/')">
      <div>
        <el-avatar
        src="../../public/前端页面资源/shaderWebGL/weather.jpg"
        :size='100' id="el-avatar"
      />
      <div style="text-align: center;color:white;cursor:pointer">气象效果</div>
    </div>
   
    </div>
     </div>
    </el-tab-pane>
    </el-tabs>
       </div>
     </div>
     <!-- 功能展示 -->
    <div id="Outer">
       <div id="Inner">   
  <el-tabs type="card">
    <el-tab-pane label="功能展示"> 
      <div class="demo-type">
    <div>
      <div onclick="window.open('http://mars3d.cn/')">
        <el-avatar
        src="../../public/前端页面资源/function/logo.png"
        :size='100' id="el-avatar"
      />
      <div style="text-align: center;color:white;cursor:pointer">火星科技</div>
    </div>
      <div onclick="window.open('http://support.supermap.com.cn:8090/webgl/examples/webgl/examples.html#layer')">
        <el-avatar
        src="../../public/前端页面资源/function/superMap.png"
        :size='100' id="el-avatar"
      />
      <div style="text-align: center;color:white;cursor:pointer">超图</div>
    </div>

  <div onclick="window.open('https://github.com/RaymanNg/3D-Wind-Field')">
        <el-avatar
        src="../../public/前端页面资源/image4.jpg"
        :size='100' id="el-avatar"
      />
      <div style="text-align: center;color:white;cursor:pointer">Rayman风场</div>
    </div>
    </div>
  </div></el-tab-pane>
  </el-tabs>
       </div>
     </div>
    <!-- 书籍推荐 -->
    <div id="Outer">
       <div id="Inner">   
  <el-tabs type="card">
    <el-tab-pane label="书籍推荐"> 
      <div class="demo-type">
    <div>
      <!-- THREE -->
    <div onclick="window.open('https://www.ituring.com.cn/book/1272')">
        <el-image style="width: 180px; height: 240px" src="../../public/前端页面资源/book/THREE.jpg" class="el-image1"/>
        <div style="color: white;cursor:pointer">THREE.JS入门指南</div>
      </div>
      <!-- WEBGL入门 -->
   <div onclick="window.open('https://item.jd.com/10106885844290.html')">
        <el-image style="width: 180px; height: 240px" src="../../public/前端页面资源/book/webGL1.jpg" class="el-image1"/>
        <div style="color: white;cursor:pointer">WebGL入门指南</div>
      </div>
      <!-- WEBGL编程指南 -->
      <div onclick="window.open('https://item.jd.com/10119076524664.html')">
        <el-image style="width: 180px; height: 240px;" src="../../public/前端页面资源/book/webGL2.jpg" class="el-image1"/>
        <div style="color: white;cursor:pointer">WebGL编程指南</div>
      </div>
       <!-- 虚拟地球 -->
        <div onclick="window.open('https://virtualglobebook.com/')">
        <el-image style="width: 180px; height: 240px;" src="../../public/前端页面资源/book/virtualglobebook.jpg" class="el-image1"/>
        <div style="color: white;cursor:pointer">Virtual Globe Book</div>
      </div>
      <!-- webGL高级 -->
        <div onclick="window.open('https://item.jd.com/10124614817703.html')">
        <el-image style="width: 180px; height: 240px;" src="../../public/前端页面资源/book/webGL3.jpg" class="el-image1"/>
        <div style="color: white;cursor:pointer">WebGL高级编程</div>
      </div>
        <div onclick="window.open('https://item.jd.com/10096805093231.html')">
        <el-image style="width: 180px; height: 240px;" src="../../public/前端页面资源/book/tuxing.jpg" class="el-image1"/>
        <div style="color: white;cursor:pointer">交互式计算机图形学</div>
      </div>
      
      <div onclick="window.open('https://item.jd.com/10053371614980.html')">
        <el-image style="width: 180px; height: 240px;" src="../../public/前端页面资源/book/HTML.jpg" class="el-image1"/>
        <div style="color: white;cursor:pointer">HTML5与WebGL编程</div>
      </div>
      <div onclick="window.open('https://item.jd.com/10124510977740.html')">
        <el-image style="width: 180px; height: 240px;" src="../../public/前端页面资源/book/openGL.jpg" class="el-image1"/>
        <div style="color: white;cursor:pointer">OpenGL着色语言</div>
      </div>

    </div>
  </div></el-tab-pane>
  </el-tabs>
       </div>
     </div>
     <!-- 基础知识 -->
      <div id="Outer">
       <div id="Inner">   
  <el-tabs type="card">
    <el-tab-pane label="基础知识"> 
      <div class="demo-type">
    <div >
      <div onclick="window.open('https://www.runoob.com/')">
        <el-avatar
        src="../../public/前端页面资源/base/js.png"
        :size='100' id="el-avatar"
      />
      <div style="text-align: center;color:white;cursor:pointer">菜鸟教程</div>
    </div>
     <div onclick="window.open('https://www.w3school.com.cn/js/index.asp')">
        <el-avatar
        src="../../public/前端页面资源/base/js.png"
        :size='100' id="el-avatar"
      />
      <div style="text-align: center;color:white;cursor:pointer">W3CScholl</div>
    </div>
    </div>
  </div></el-tab-pane>
  </el-tabs>
       </div>
     </div>

  </div>
<canvas ref="webgl" id='webgl' width="1520" height="1470"></canvas>
  </div>
  </el-scrollbar>
</template>


<script  setup>
import { ref,onMounted} from 'vue';
const webgl=ref(null)

onMounted(()=>{
const all=document.querySelectorAll('.el-tabs__item')
  all.forEach((e)=>{
    console.log(e);
    e.style.color='yellow'
  })
const gl=webgl.value.getContext('webgl')
gl.viewport(0, 0, webgl.value.width, webgl.value.height);
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
const int ITERATIONS = 40;   //use less value if you need more performance
const float SPEED = 1.;

const float STRIP_CHARS_MIN =  7.;
const float STRIP_CHARS_MAX = 40.;
const float STRIP_CHAR_HEIGHT = 0.15;
const float STRIP_CHAR_WIDTH = 0.10;
const float ZCELL_SIZE = 1. * (STRIP_CHAR_HEIGHT * STRIP_CHARS_MAX);  //the multiplier can't be less than 1.
const float XYCELL_SIZE = 12. * STRIP_CHAR_WIDTH;  //the multiplier can't be less than 1.

const int BLOCK_SIZE = 10;  //in cells
const int BLOCK_GAP = 2;    //in cells

const float WALK_SPEED = 1. * XYCELL_SIZE;
const float BLOCKS_BEFORE_TURN = 3.;


const float PI = 3.14159265359;


//        ----  random  ----
float hash(float v) {
    return fract(sin(v)*43758.5453123);
}

float hash(vec2 v) {
    return hash(dot(v, vec2(5.3983, 5.4427)));
}

vec2 hash2(vec2 v)
{
    v = vec2(v * mat2(127.1, 311.7,  269.5, 183.3));
	return fract(sin(v)*43758.5453123);
}

vec4 hash4(vec2 v)
{
    vec4 p =  mat4( 127.1, 311.7,0.0,0.0,
                    269.5, 183.3,0.0,0.0,
                    113.5, 271.9,0.0,0.0,
                    246.1, 124.6,0.0,0.0)*vec4(v,0.0,1.0);
    return fract(sin(p)*43758.5453123);
}

vec4 hash4(vec3 v)
{
    vec4 p = mat4( 127.1, 311.7, 74.7,0.0,
                   269.5, 183.3, 246.1,0.0,
                   113.5, 271.9, 124.6,0.0,
                   271.9, 269.5, 311.7,0.0)*vec4(v,1.0) ;
    return fract(sin(p)*43758.5453123);
}

vec2 rotate(vec2 v, float a) {
    float s = sin(a);
	float c = cos(a);
    mat2 m = mat2(c, -s, s, c);
    return m * v;
}

vec3 rotateX(vec3 v, float a) {
    float s = sin(a);
    float c = cos(a);
    return mat3(1.,0.,0.,0.,c,-s,0.,s,c) * v;
}

vec3 rotateY(vec3 v, float a) {
    float s = sin(a);
    float c = cos(a);
    return mat3(c,0.,-s,0.,1.,0.,s,0.,c) * v;
}

vec3 rotateZ(vec3 v, float a) {
    float s = sin(a);
    float c = cos(a);
    return mat3(c,-s,0.,s,c,0.,0.,0.,1.) * v;
}

float smoothstep1(float x) {
    return smoothstep(0., 1., x);
}
float rune_line(vec2 p, vec2 a, vec2 b) {   // from https://www.shadertoy.com/view/4dcfW8
  p -= a, b -= a;
	float h = clamp(dot(p, b) / dot(b, b), 0., 1.);   // proj coord on line
	return length(p - b * h);                         // dist to segment
}

float rune(vec2 U, vec2 seed, float highlight)
{
	  float d = 1e5;
	for (int i = 0; i < 4; i++)	// number of strokes
	{
        vec4 pos = hash4(seed);
		seed += 1.;

		// each rune touches the edge of its box on all 4 sides
		if (i == 0) pos.y = .0;
		if (i == 1) pos.x = .999;
		if (i == 2) pos.x = .0;
		if (i == 3) pos.y = .999;
		// snap the random line endpoints to a grid 2x3
		vec4 snaps = vec4(2, 3, 2, 3);
		pos = ( floor(pos * snaps) + .5) / snaps;

		if (pos.xy != pos.zw)d = min(d, rune_line(U, pos.xy, pos.zw + .001) ); // closest line
    
	}
	return smoothstep(0.1, 0., d) + highlight*smoothstep(0.4, 0., d);
}
float random_char(vec2 outer, vec2 inner, float highlight) {
    vec2 seed = vec2(dot(outer, vec2(269.5, 183.3)), dot(outer, vec2(113.5, 271.9)));
    return rune(inner, seed, highlight);
}
vec3 rain(vec3 ro3, vec3 rd3, float time) {
    vec4 result = vec4(0.);

    // normalized 2d projection
    vec2 ro2 = vec2(ro3);
    vec2 rd2 = normalize(vec2(rd3));

    bool prefer_dx = abs(rd2.x) > abs(rd2.y);
    float t3_to_t2 = prefer_dx ? rd3.x / rd2.x : rd3.y / rd2.y;

    // at first, horizontal space (xy) is divided into cells (which are columns in 3D)
    // then each xy-cell is divided into vertical cells (along z) - each of these cells contains one raindrop

    ivec3 cell_side = ivec3(step(0., rd3));      //for positive rd.x use cell side with higher x (1) as the next side, for negative - with lower x (0), the same for y and z
    ivec3 cell_shift = ivec3(sign(rd3));         //shift to move to the next cell

    //  move through xy-cells in the ray direction
    float t2 = 0.;  // the ray formula is: ro2 + rd2 * t2, where t2 is positive as the ray has a direction.
    ivec2 next_cell = ivec2(floor(ro2/XYCELL_SIZE));  //first cell index where ray origin is located
    for (int i=0; i<ITERATIONS; i++) {
        ivec2 cell = next_cell;  //save cell value before changing
        float t2s = t2;          //and t

        //  find the intersection with the nearest side of the current xy-cell (since we know the direction, we only need to check one vertical side and one horizontal side)
        vec2 side = vec2(next_cell + cell_side.xy) * XYCELL_SIZE;  //side.x is x coord of the y-axis side, side.y - y of the x-axis side
        vec2 t2_side = (side - ro2) / rd2;  // t2_side.x and t2_side.y are two candidates for the next value of t2, we need the nearest
        if (t2_side.x < t2_side.y) {
            t2 = t2_side.x;
            next_cell.x += cell_shift.x;  //cross through the y-axis side
        } else {
            t2 = t2_side.y;
            next_cell.y += cell_shift.y;  //cross through the x-axis side
        }
        //now t2 is the value of the end point in the current cell (and the same point is the start value in the next cell)

        //  gap cells
        vec2 cell_in_block = fract(vec2(cell) / float(BLOCK_SIZE));
        float gap = float(BLOCK_GAP) / float(BLOCK_SIZE);
        if (cell_in_block.x < gap || cell_in_block.y < gap || (cell_in_block.x < (gap+0.1) && cell_in_block.y < (gap+0.1))) {
            continue;
        }

        //  return to 3d - we have start and end points of the ray segment inside the column (t3s and t3e)
        float t3s = t2s / t3_to_t2;

        //  move through z-cells of the current column in the ray direction (don't need much to check, two nearest cells are enough)
        float pos_z = ro3.z + rd3.z * t3s;
        float xycell_hash = hash(vec2(cell));
        float z_shift = xycell_hash*11. - time * (0.5 + xycell_hash * 1.0 + xycell_hash * xycell_hash * 1.0 + pow(xycell_hash, 16.) * 3.0);  //a different z shift for each xy column
        float char_z_shift = floor(z_shift / STRIP_CHAR_HEIGHT);
        z_shift = char_z_shift * STRIP_CHAR_HEIGHT;
        int zcell = int(floor((pos_z - z_shift)/ZCELL_SIZE));  //z-cell index
        for (int j=0; j<2; j++) {  //2 iterations is enough if camera doesn't look much up or down
            //  calcaulate coordinates of the target (raindrop)
            vec4 cell_hash = hash4(vec3(ivec3(cell, zcell)));
            vec4 cell_hash2 = fract(cell_hash * vec4(127.1, 311.7, 271.9, 124.6));

            float chars_count = cell_hash.w * (STRIP_CHARS_MAX - STRIP_CHARS_MIN) + STRIP_CHARS_MIN;
            float target_length = chars_count * STRIP_CHAR_HEIGHT;
            float target_rad = STRIP_CHAR_WIDTH / 2.;
            float target_z = (float(zcell)*ZCELL_SIZE + z_shift) + cell_hash.z * (ZCELL_SIZE - target_length);
            vec2 target = vec2(cell) * XYCELL_SIZE + target_rad + cell_hash.xy * (XYCELL_SIZE - target_rad*2.);

            //  We have a line segment (t0,t). Now calculate the distance between line segment and cell target (it's easier in 2d)
            vec2 s = target - ro2;
            float tmin = dot(s, rd2);  //tmin - point with minimal distance to target
            if (tmin >= t2s && tmin <= t2) {
                float u = s.x * rd2.y - s.y * rd2.x;  //horizontal coord in the matrix strip
                if (abs(u) < target_rad) {
                    u = (u/target_rad + 1.) / 2.;
                    float z = ro3.z + rd3.z * tmin/t3_to_t2;
                    float v = (z - target_z) / target_length;  //vertical coord in the matrix strip
                    if (v >= 0.0 && v < 1.0) {
                        float c = floor(v * chars_count);  //symbol index relative to the start of the strip, with addition of char_z_shift it becomes an index relative to the whole cell
                        float q = fract(v * chars_count);
                        vec2 char_hash = hash2(vec2(c+char_z_shift, cell_hash2.x));
                        if (char_hash.x >= 0.1 || c == 0.) {  //10% of missed symbols
                            float time_factor = floor(c == 0. ? time*5.0 :  //first symbol is changed fast
                                    time*(1.0*cell_hash2.z +   //strips are changed sometime with different speed
                                            cell_hash2.w*cell_hash2.w*4.*pow(char_hash.y, 4.)));  //some symbols in some strips are changed relatively often
                            float a = random_char(vec2(char_hash.x, time_factor), vec2(u,q), max(1., 3. - c/2.)*0.2);  //alpha
                            a *= clamp((chars_count - 0.5 - c) / 2., 0., 1.);  //tail fade
                            if (a > 0.) {
                                float attenuation = 1. + pow(0.06*tmin/t3_to_t2, 2.);
                                vec3 col = (c == 0. ? vec3(0.67, 1.0, 0.82) : vec3(0.25, 0.80, 0.40)) / attenuation;
                                float a1 = result.a;
                                result.a = a1 + (1. - a1) * a;
                                result.xyz = (result.xyz * a1 + col * (1. - a1) * a) / result.a;
                                if (result.a > 0.98)  return result.xyz;
                            }
                        }
                    }
                }
            }
            // not found in this cell - go to next vertical cell
            zcell += cell_shift.z;
        }
        // go to next horizontal cell
    }

    return result.xyz * result.a;
}



void main() {
   if (STRIP_CHAR_WIDTH > XYCELL_SIZE || STRIP_CHAR_HEIGHT * STRIP_CHARS_MAX > ZCELL_SIZE) {
        // error
        gl_FragColor = vec4(1., 0., 0., 1.);
        return;
    }
    vec2 uv = (gl_FragCoord.xy * 2. - st.xy) / st.y;

    float time = u_time * SPEED;
    const float turn_rad = 0.25 / BLOCKS_BEFORE_TURN;   //0 .. 0.5
    const float turn_abs_time = (PI/2.*turn_rad) * 1.5;  //multiplier different than 1 means a slow down on turns
    const float turn_time = turn_abs_time / (1. - 2.*turn_rad + turn_abs_time);  //0..1, but should be <= 0.5

    float level1_size = float(BLOCK_SIZE) * BLOCKS_BEFORE_TURN * XYCELL_SIZE;
    float level2_size = 4. * level1_size;
    float gap_size = float(BLOCK_GAP) * XYCELL_SIZE;

    vec3 ro = vec3(gap_size/2., gap_size/2., 0.);
    vec3 rd = vec3(uv.x, 2.0, uv.y);

    float tq = fract(time / (level2_size*4.) * WALK_SPEED);  //the whole cycle time counter
    float t8 = fract(tq*4.);  //time counter while walking on one of the four big sides
    float t1 = fract(t8*8.);  //time counter while walking on one of the eight sides of the big side

    vec2 prev;
    vec2 dir;
    if (tq < 0.25) {
        prev = vec2(0.,0.);
        dir = vec2(0.,1.);
    } else if (tq < 0.5) {
        prev = vec2(0.,1.);
        dir = vec2(1.,0.);
    } else if (tq < 0.75) {
        prev = vec2(1.,1.);
        dir = vec2(0.,-1.);
    } else {
        prev = vec2(1.,0.);
        dir = vec2(-1.,0.);
    }

    float angle = floor(tq * 4.);  //0..4 wich means 0..2*PI

    prev *= 4.;

    const float first_turn_look_angle = 0.4;
    const float second_turn_drift_angle = 0.5;
    const float fifth_turn_drift_angle = 0.25;

    vec2 turn;
    float turn_sign = 0.;
    vec2 dirL = rotate(dir, -PI/2.);
    vec2 dirR = -dirL;
    float up_down = 0.;
    float rotate_on_turns = 1.;
    float roll_on_turns = 1.;
    float add_angel = 0.;
    if (t8 < 0.125) {
        turn = dirL;
        //dir = dir;
        turn_sign = -1.;
        angle -= first_turn_look_angle * (max(0., t1 - (1. - turn_time*2.)) / turn_time - max(0., t1 - (1. - turn_time)) / turn_time * 2.5);
        roll_on_turns = 0.;
    } else if (t8 < 0.250) {
        prev += dir;
        turn = dir;
        dir = dirL;
        angle -= 1.;
        turn_sign = 1.;
        add_angel += first_turn_look_angle*0.5 + (-first_turn_look_angle*0.5+1.0+second_turn_drift_angle)*t1;
        rotate_on_turns = 0.;
        roll_on_turns = 0.;
    } else if (t8 < 0.375) {
        prev += dir + dirL;
        turn = dirR;
        //dir = dir;
        turn_sign = 1.;
        add_angel += second_turn_drift_angle*sqrt(1.-t1);
        //roll_on_turns = 0.;
    } else if (t8 < 0.5) {
        prev += dir + dir + dirL;
        turn = dirR;
        dir = dirR;
        angle += 1.;
        turn_sign = 0.;
        up_down = sin(t1*PI) * 0.37;
    } else if (t8 < 0.625) {
        prev += dir + dir;
        turn = dir;
        dir = dirR;
        angle += 1.;
        turn_sign = -1.;
        up_down = sin(-min(1., t1/(1.-turn_time))*PI) * 0.37;
    } else if (t8 < 0.750) {
        prev += dir + dir + dirR;
        turn = dirL;
        //dir = dir;
        turn_sign = -1.;
        add_angel -= (fifth_turn_drift_angle + 1.) * smoothstep1(t1);
        rotate_on_turns = 0.;
        roll_on_turns = 0.;
    } else if (t8 < 0.875) {
        prev += dir + dir + dir + dirR;
        turn = dir;
        dir = dirL;
        angle -= 1.;
        turn_sign = 1.;
        add_angel -= fifth_turn_drift_angle - smoothstep1(t1) * (fifth_turn_drift_angle * 2. + 1.);
        rotate_on_turns = 0.;
        roll_on_turns = 0.;
    } else {
        prev += dir + dir + dir;
        turn = dirR;
        //dir = dir;
        turn_sign = 1.;
        angle += fifth_turn_drift_angle * (1.5*min(1., (1.-t1)/turn_time) - 0.5*smoothstep1(1. - min(1.,t1/(1.-turn_time))));
    }
    if (u_mouse.x > 10. || u_mouse.y > 10.) {
        vec2 mouse = u_mouse.xy / st.xy * 2. - 1.;
        up_down = -0.7 * mouse.y;
        angle += mouse.x;
        rotate_on_turns = 1.;
        roll_on_turns = 0.;
    } else {
        angle += add_angel;
    }

    rd = rotateX(rd, up_down);
     vec2 p;
    if (turn_sign == 0.) {
        //  move forward
        p = prev + dir * (turn_rad + 1. * t1);
    }
    else if (t1 > (1. - turn_time)) {
        //  turn
        float tr = (t1 - (1. - turn_time)) / turn_time;
        vec2 c = prev + dir * (1. - turn_rad) + turn * turn_rad;
        p = c + turn_rad * rotate(dir, (tr - 1.) * turn_sign * PI/2.);
        angle += tr * turn_sign * rotate_on_turns;
        rd = rotateY(rd, sin(tr*turn_sign*PI) * 0.2 * roll_on_turns);  //roll
    }  else  {
        //  move forward
        t1 /= (1. - turn_time);
        p = prev + dir * (turn_rad + (1. - turn_rad*2.) * t1);
    }

    rd = rotateZ(rd, angle * PI/2.);

    ro.xy += level1_size * p;

    ro += rd * 0.3;
    rd = normalize(rd);

    vec3 col = rain(ro, rd, time);
    col.b*=0.1;
    vec4 fragColor = vec4(col, 1.);


 


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
img.src='../../../public/webGL资源/科比.jpg'
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
//开启抗锯齿
gl.enable(gl.DITHER)
gl.hint(gl.MULTISAMPLE_FILTER_HINT,gl.NICEST)
gl.drawArrays(gl.TRIANGLES,0,6)


}
//把画布坐标传给他
const xy=gl.getUniformLocation(gl.program,'st')
gl.uniform2f(xy,window.innerWidth,window.innerHeight)
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
    Time+=0.02;
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
.el-tabs__item is-top is-active{
  color: red;
}

.el-image1{

  margin-right: 20px;
  margin-top:20px;
  cursor: pointer;
  margin-left: 10px;
}
.el-avatar{
  cursor: pointer;
  margin-right: 10px;
  margin-top: 10px;
  margin-left: 10px;  
}
.demo-type > div {
  flex-direction: row;
  display: flex;
  text-align: center;
  justify-content: start;
  flex-wrap: wrap;
}

.demo-type > div:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}
hr{
  position: relative;
  top: 1px;
}
h1{
  margin-left: 5%;
  color: rgb(255, 242, 0);
}
#main{
  width:80%;

}
.demo-image{
  position: absolute;
  width:100%;
  left: 0px;
  top: 0px;
  z-index: -1;
}
#recommendation{
 
  margin-left: auto;
  width: 80%;
  height: 100%;
  background-color: rgb(59, 58, 58);
  opacity: 0.75;
}
#Outer{
  width: 100%;
  background-color: rgb(58, 58, 58);
  margin-bottom: 30px;
}
#Inner{
  width: 90%;
  margin:auto;
  background-color: rgb(57, 54, 52);
  box-shadow:5px 10px 15px #5b5a59 ,-10px -10px 15px #666864;
}

#webgl{
background-color:red;

position:fixed;
left:0px;
top:0px;
z-index:-2000
}
</style>