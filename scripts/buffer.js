const data = require('../data/arraybuffer')

module.exports = (gl) => {
    let triangleBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuffer)

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data['triangleData']), gl.STATIC_DRAW)
    triangleBuffer.itemSize = 3;
    triangleBuffer.numItem = 3;
    
    return triangleBuffer;
}