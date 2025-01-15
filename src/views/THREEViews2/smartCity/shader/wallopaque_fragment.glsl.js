export default /* glsl */`
#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif

#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
diffuseColor.a=diffuseColor.a*v_transparent;
gl_FragColor = vec4( outgoingLight, diffuseColor.a );
`;
