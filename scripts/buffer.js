const data = require('../data/arraybuffer')

module.exports = (gl) => {
    let bufferData = data['rectData'];
    
    let vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufferData.vertical), gl.STATIC_DRAW)
    vertexBuffer.itemSize = 3;
    vertexBuffer.numItem = bufferData.numItem;
    
    let UVBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, UVBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufferData.uvData), gl.STATIC_DRAW)
    UVBuffer.itemSize = 2;
    UVBuffer.numItem = bufferData.numItem;
        
    return {
        'vertex': vertexBuffer,
        'uv': UVBuffer
    };
}