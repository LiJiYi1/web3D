let defaultValue = Cesium.defaultValue;
let Cartesian3 = Cesium.Cartesian3;

function TorusKnotGeometry(options) {
    this._radius = defaultValue(options.radius, 1);
    this._tube = defaultValue(options.tube, 0.4);
    this._tubularSegments = defaultValue(options.tubularSegments, 64);
    this._radialSegments = defaultValue(options.radialSegments, 8);

    this.tubularSegments = Math.floor(this.tubularSegments);
    this.radialSegments = Math.floor(this.radialSegments);

    this._p = defaultValue(options.p, 2);
    this._q = defaultValue(options.q, 3);
}

TorusKnotGeometry.createGeometry = function (torusKnotGeometry) {

    function calculatePositionOnCurve(u, p, q, radius, position) {

        const cu = Math.cos(u);
        const su = Math.sin(u);
        const quOverP = q / p * u;
        const cs = Math.cos(quOverP);

        position.x = radius * (2 + cs) * 0.5 * cu;
        position.y = radius * (2 + cs) * su * 0.5;
        position.z = radius * Math.sin(quOverP) * 0.5;
    }
    let radius = torusKnotGeometry._radius;
    let tube = torusKnotGeometry._tube;
    let tubularSegments = torusKnotGeometry._tubularSegments;
    let radialSegments = torusKnotGeometry._radialSegments;
    let p = torusKnotGeometry._p;
    let q = torusKnotGeometry._q;

    const indices = [];
    const vertices = [];
    const normals = [];
    const uvs = [];

    const vertex = new Cesium.Cartesian3();
    const normal = new Cesium.Cartesian3();

    const P1 = new Cesium.Cartesian3();
    const P2 = new Cesium.Cartesian3();

    const B = new Cesium.Cartesian3();
    const T = new Cesium.Cartesian3();
    const N = new Cesium.Cartesian3();


    for (let i = 0; i <= tubularSegments; ++i) {
        const u = i / tubularSegments * p * Math.PI * 2;
        calculatePositionOnCurve(u, p, q, radius, P1);
        calculatePositionOnCurve(u + 0.01, p, q, radius, P2);

        Cesium.Cartesian3.subtract(P2, P1, T);
        Cesium.Cartesian3.add(P2, P1, N);
        Cesium.Cartesian3.cross(T, N, B);
        Cesium.Cartesian3.cross(B, T, N);

        // normalize B, N. T can be ignored, we don't use it
        Cesium.Cartesian3.normalize(B, B)
        Cesium.Cartesian3.normalize(N, N)

        for (let j = 0; j <= radialSegments; ++j) {

            // now calculate the vertices. they are nothing more than an extrusion of the torus curve.
            // because we extrude a shape in the xy-plane, there is no need to calculate a z-value.

            const v = j / radialSegments * Math.PI * 2;
            const cx = -tube * Math.cos(v);
            const cy = tube * Math.sin(v);

            // now calculate the final vertex position.
            // first we orient the extrusion with our basis vectos, then we add it to the current position on the curve
            vertex.x = P1.x + (cx * N.x + cy * B.x);
            vertex.y = P1.y + (cx * N.y + cy * B.y);
            vertex.z = P1.z + (cx * N.z + cy * B.z);

            vertices.push(vertex.x, vertex.y, vertex.z);

            // normal (P1 is always the center/origin of the extrusion, thus we can use it to calculate the normal)
            Cesium.Cartesian3.subtract(vertex, P1, normal);
            Cesium.Cartesian3.normalize(normal, normal)

            normals.push(normal.x, normal.y, normal.z);
            // uv
            uvs.push(i / tubularSegments);
            uvs.push(j / radialSegments);
        }

    }

    // generate indices
    for (let j = 1; j <= tubularSegments; j++) {
        for (let i = 1; i <= radialSegments; i++) {

            // indices
            const a = (radialSegments + 1) * (j - 1) + (i - 1);
            const b = (radialSegments + 1) * j + (i - 1);
            const c = (radialSegments + 1) * j + i;
            const d = (radialSegments + 1) * (j - 1) + i;

            // faces
            indices.push(a, b, d);
            indices.push(b, c, d);
        }
    }

    return new Cesium.Geometry({
        attributes: {
            position: new Cesium.GeometryAttribute({
                componentDatatype: Cesium.ComponentDatatype.DOUBLE,
                componentsPerAttribute: 3,
                values: new Float32Array(vertices)
            }),
            normal: new Cesium.GeometryAttribute({
                componentDatatype: Cesium.ComponentDatatype.DOUBLE,
                componentsPerAttribute: 3,
                values: new Float32Array(normals)
            }),
            st: new Cesium.GeometryAttribute({
                componentDatatype: Cesium.ComponentDatatype.FLOAT,
                componentsPerAttribute: 2,
                values: new Float32Array(uvs)
            }),


        },
        indices: new Uint16Array(indices),
        primitiveType: Cesium.PrimitiveType.TRIANGLES,
        vertexFormat: Cesium.VertexFormat.POSITION_AND_NORMAL,
        boundingSphere: Cesium.BoundingSphere.fromVertices(new Float32Array(vertices))
    });
}
export default TorusKnotGeometry;
