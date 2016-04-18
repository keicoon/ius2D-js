const vertexShaderStr = require('../data/vertexshader')
const fragmentShaderStr = require('../data/fragmentshader')

module.exports = (gl) => {
    let vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader, vertexShaderStr)
    gl.compileShader(vertexShader)
 
    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader, fragmentShaderStr)
    gl.compileShader(fragmentShader)
    
    let program = gl.createProgram()
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    
    program.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
    program.uRotation = gl.getUniformLocation(program, 'uRotation')
    program.uColor = gl.getUniformLocation(program, 'uColor')
    program.uPixelMatrix = gl.getUniformLocation(program, "uPixelMatrix")
    program.uScale = gl.getUniformLocation(program, "uScale")
    
    return program;
}