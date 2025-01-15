export default /* glsl */`
#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
if(v_position.y<H&&v_position.y>H-2000.0){
float percent=pow((H-v_position.y)/H,0.5);
vec3 color=mix(vec3(1.0,0.0,0.0),vec3(0.0,1.0,1.0),percent);
gl_FragColor = vec4(color, diffuseColor.a );
}
else if(v_position.y>H&&v_position.y<H+2000.0){
float percent=pow((v_position.y-H)/H,0.5);
vec3 color=mix(vec3(1.0,0.0,0.0),vec3(0.0,1.0,1.0),percent);
gl_FragColor = vec4(color, diffuseColor.a );
}
else{
gl_FragColor = vec4( outgoingLight, diffuseColor.a );
}
`;