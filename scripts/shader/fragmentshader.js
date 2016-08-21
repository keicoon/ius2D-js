module.exports = ""+
    "precision mediump float;" +
    "uniform sampler2D uSampler;" +
    "varying vec2 vUV;" +
    "varying vec3 vColor;" +
    "void main(void) {" +
    " gl_FragColor =  texture2D(uSampler, vec2(vUV.s, vUV.t));" +
    " gl_FragColor.r *= vColor[0]; "+
    " gl_FragColor.g *= vColor[1]; "+
    " gl_FragColor.b *= vColor[2]; "+
    "}"