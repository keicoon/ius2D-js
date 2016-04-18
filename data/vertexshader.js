module.exports = "" +
    "attribute vec3 aVertexPosition;" +
    "uniform mat4 uPixelMatrix;" +
    "uniform vec3 uScale;" +
    "uniform vec3 uRotation;" +
    "uniform vec3 uPosition;" +
    "uniform vec3 uColor;" +
    "varying vec3 vColor;" +
    "mat4 positionMTX(vec3 t)" +
    "{" +
    "return mat4( 1,0,0,0, 0,1,0,0, 0,0,1,0, t[0],t[1],t[2],1);" +
    "}" +
    'mat4 scaleMTX(vec3 t)' +
    '{' +
    '   return mat4( t[0],0,0,0, 0,t[1],0,0, 0,0,t[2],0, 0,0,0,1);' +
    '}' +
    'mat4 rotationMTX(vec3 t)' +
    '{' +
    '   float s = sin(t[0]);float c = cos(t[0]);' +
    '   mat4 m1 = mat4( 1,0,0,0, 0,c,-s,0, 0,s,c,0, 0,0,0,1);s = sin(t[1]);c = cos(t[1]);' +
    '   mat4 m2 = mat4(c,0,s,0, 0,1,0,0, -s,0,c,0, 0,0,0,1);s = sin(t[2]);c = cos(t[2]);' +
    '   mat4 m3 = mat4(c,-s,0,0, s,c,0,0, 0,0,1,0, 0,0,0,1);' +
    '   return m3*m2*m1;' +
    '}' +
    "void main(void) {" +
    " gl_Position =uPixelMatrix*positionMTX(uPosition)*rotationMTX(uRotation)*scaleMTX(uScale)*vec4(aVertexPosition, 1.0);" +
    " vColor = uColor;" +
    "}"