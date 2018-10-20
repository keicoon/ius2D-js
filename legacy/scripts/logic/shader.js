const vertexShaderStr = require('../shader/vertexshader')
const fragmentShaderStr = require('../shader/fragmentshader')

module.exports = (gl) => {
    let vertexShader = gl.createShader(gl.VERTEX_SHADER)
    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    let program = gl.createProgram()
    
    gl.shaderSource(vertexShader, vertexShaderStr)
    gl.compileShader(vertexShader)
 
    gl.shaderSource(fragmentShader, fragmentShaderStr)
    gl.compileShader(fragmentShader)
    
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    
    program.aVertexPosition = gl.getAttribLocation(program, "aVertexPosition");
    program.aVertexUV=gl.getAttribLocation(program, "aVertexUV");
    program.uSampler=gl.getUniformLocation(program, 'uSampler')
    program.uRotation = gl.getUniformLocation(program, 'uRotation')
    program.uColor = gl.getUniformLocation(program, 'uColor')
    program.uPixelMatrix = gl.getUniformLocation(program, "uPixelMatrix")
    program.uScale = gl.getUniformLocation(program, "uScale")
    program.uPosition = gl.getUniformLocation(program, "uPosition")
    
    return program;
}