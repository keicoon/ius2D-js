let rotations = [0, 0, 0];
module.exports = (gl, program, buffer)=>{
    rotations[0] += 0.1
    rotations[1] += 0.1
    rotations[2] += 0.1
    
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(program.aVertexPosition);
    gl.vertexAttribPointer(program.aVertexPosition, buffer.itemSize, gl.FLOAT, false, 0, 0);
    
    gl.uniform3fv(program.uRotation, rotations)
    gl.uniform3fv(program.uColor, [Math.random(), Math.random(), Math.random()])
    
    gl.drawArrays(gl.TRIANGLES, 0, buffer.numItem);
}