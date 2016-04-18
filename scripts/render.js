let max = 100,i
let scales = []
let positions = []
let rotations = []
for(i=0; i< max; i++){
    let scale = Math.random()*100
    scales.push([scale , scale ,1] )
    //가로 세로 크기가 scale인 배열을 scales에 max 객수 만큼 push합니다. 
    positions.push([Math.random()*500-250, Math.random()*500-250,1])
    //-250~250 사이의 값을 가진 x,y를 랜덤 설정합니다. 
    rotations.push([0,0,0]) 
}
module.exports = (gl, program, buffer, logic)=>{

    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(program.aVertexPosition);
    
    for(i=0; i<max; i++){
        rotations[i][2]+=0.1
        gl.vertexAttribPointer(program.aVertexPosition, buffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.uniformMatrix4fv(program.uPixelMatrix, false, logic.pixelMatrix)
        gl.uniform3fv(program.uRotation, rotations[i])
        gl.uniform3fv(program.uScale, scales[i])
        gl.uniform3fv(program.uPosition, positions[i])
        gl.uniform3fv(program.uColor, [Math.random(), Math.random(), Math.random()])
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, buffer.numItem);
    }
}