module.exports = (gl, program, Buffer, uvBuffer, Location, Rotaion, Scale, Texture)=>{
    gl.bindBuffer(gl.ARRAY_BUFFER, Buffer);
    gl.enableVertexAttribArray(program.aVertexPosition);
    gl.vertexAttribPointer(program.aVertexPosition, Buffer.itemSize, gl.FLOAT, false, 0, 0);
        
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
    gl.enableVertexAttribArray(program.aVertexUV);
    gl.vertexAttribPointer(program.aVertexUV, uvBuffer.itemSize, gl.FLOAT, false, 0, 0);
    
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, Texture);
    gl.uniform1i(program.uSampler, 0);
    
    gl.uniform3fv(program.uRotation, Rotaion);
    gl.uniform3fv(program.uScale, Scale);
    gl.uniform3fv(program.uPosition, Location);
    gl.uniform3fv(program.uColor, [1, 1, 1]);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, Buffer.numItem);
}