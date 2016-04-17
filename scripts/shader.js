const vertexShaderStr = require('../data/vertexshader')
const fragmentShaderStr = require('../data/fragmentshader')

module.exports = (gl) => {
    let vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader, vertexShaderStr)
    gl.compileShader(vertexShader)
 
    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader, fragmentShaderStr)
    gl.compileShader(fragmentShader)
    
    let firstProgram = gl.createProgram()
    gl.attachShader(firstProgram, vertexShader)
    gl.attachShader(firstProgram, fragmentShader)
    gl.linkProgram(firstProgram)
    
    firstProgram.aVertexPosition = gl.getAttribLocation(firstProgram, "aVertexPosition");
    
    return firstProgram;
}