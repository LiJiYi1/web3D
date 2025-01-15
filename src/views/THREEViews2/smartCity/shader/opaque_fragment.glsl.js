export default /* glsl */`
#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif

#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
vec3 gridient=mix(vec3(0.1,0.0,0.1),vec3(1.0,0.0,1.0),v_position.z/354.0);


vec3 center=vec3(13524770.770778058, 3664150.4907626663,0.0);
float dis=distance(v_position,center);
if(dis>R&&dis<=R+100.0){
vec3 color=mix(vec3(1.0,1.0,1.0),outgoingLight*gridient,pow((dis-R)/100.0,2.0));
gl_FragColor = vec4( color, diffuseColor.a );
}
else if(dis>R-100.0&&dis<=R){
vec3 color=mix(vec3(1.0,1.0,1.0),outgoingLight*gridient,pow((R-dis)/100.0,2.0));
gl_FragColor = vec4( color, diffuseColor.a );
}
else{
gl_FragColor = vec4( outgoingLight*gridient, diffuseColor.a );
}
`;
