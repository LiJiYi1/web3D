export default /* glsl */`
#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif

#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
diffuseColor.a=diffuseColor.a*(1.0-v_position.z/500.0);
gl_FragColor = vec4( outgoingLight, diffuseColor.a );
`;
