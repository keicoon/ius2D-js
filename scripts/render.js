let rotations=[0, 0, 0]
let scales=[200, 200, 1]
let position=[0, 0, 0]
    
module.exports = (gl, program, Buffer, uvBuffer, logic)=>{
    rotations[2]+=0.01
    
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, Buffer);
    gl.enableVertexAttribArray(program.aVertexPosition);
    gl.vertexAttribPointer(program.aVertexPosition, Buffer.itemSize, gl.FLOAT, false, 0, 0);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.enableVertexAttribArray(program.aVertexUV);
    gl.vertexAttribPointer(program.aVertexUV, uvBuffer.itemSize, gl.FLOAT, false, 0, 0);
    
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, logic.img.get('test'));
    gl.uniform1i(program.uSampler, 0);
    
    gl.uniform3fv(program.uRotation, rotations)
    gl.uniformMatrix4fv(program.uPixelMatrix, false, logic.pixelMatrix)
    gl.uniform3fv(program.uScale, scales)
    gl.uniform3fv(program.uPosition, position)
    gl.uniform3fv(program.uColor, [Math.random(), Math.random(), Math.random()])
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, Buffer.numItem);
}