let rotations = [0, 0, 0];
let scales = [100,100,1];
let position = [100,100,0];

module.exports = (gl, program, buffer, logic)=>{
    rotations[2] += 0.1
    
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(program.aVertexPosition);
    gl.vertexAttribPointer(program.aVertexPosition, buffer.itemSize, gl.FLOAT, false, 0, 0);
    
    gl.uniform3fv(program.uRotation, rotations)
    gl.uniformMatrix4fv(program.uPixelMatrix, false, logic.pixelMatrix)
    gl.uniform3fv(program.uScale, scales)
    gl.uniform3fv(program.uColor, [Math.random(), Math.random(), Math.random()])
    gl.uniform3fv(program.uPosition, position)
    
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, buffer.numItem);
}