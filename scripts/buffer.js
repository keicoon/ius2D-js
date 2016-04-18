const data = require('../data/arraybuffer')

module.exports = (gl) => {
    let triangleBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuffer)

    let bufferData = data['rectData'];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufferData.vertical), gl.STATIC_DRAW)
    triangleBuffer.itemSize = 3;
    triangleBuffer.numItem = bufferData.numItem;
    
    return triangleBuffer;
}