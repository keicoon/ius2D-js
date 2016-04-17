(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
    'triangleData': [
       0.0, .5, 0.0,
        -.5, -.5, 0.0,
        .5, -.5, 0.0
    ],
}
},{}],2:[function(require,module,exports){
module.exports = ""+
    "void main(void) {" +
    " gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);" +
    "}"
},{}],3:[function(require,module,exports){
module.exports = ""+
    "attribute vec3 aVertexPosition;" +
    "void main(void) {" +
    " gl_Position = vec4(aVertexPosition, 1.0);" +
    "}"
},{}],4:[function(require,module,exports){
const data = require('../data/arraybuffer')

module.exports = (gl) => {
    let triangleBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleBuffer)

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data['triangleData']), gl.STATIC_DRAW)
    triangleBuffer.itemSize = 3;
    triangleBuffer.numItem = 3;
    
    return triangleBuffer;
}
},{"../data/arraybuffer":1}],5:[function(require,module,exports){
const render = require('./render');

module.exports = (gl, cvs)=>{
    
    let buffer = require('./buffer')(gl);
    let program = require('./shader')(gl);
    
    if(cvs)  cvs.width='450', cvs.height='300'
    gl.viewport(0, 0, parseInt(cvs.width), +parseInt(cvs.height));
    setInterval(()=>{render(gl, program, buffer);},16)
}
},{"./buffer":4,"./render":7,"./shader":8}],6:[function(require,module,exports){
//initialize
const logic = require('./logic');

// main logic
{
    let cvs = document.getElementById('glCanvas');
    let gl;
    
    const keys = 'webgl,experimental-webgl,webkit-3d,moz-webgl'.split(',');
    let i = keys.length;
    
    while (i--) if (gl = cvs.getContext(keys[i])) break
    if (gl) console.log('webgl initialize succ!')
    else console.log('webgl initialize fail!')

    logic(gl, cvs);
}
},{"./logic":5}],7:[function(require,module,exports){
module.exports = (gl, program, buffer)=>{
    gl.clearColor(Math.random(), Math.random(), Math.random(), 1)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(program.aVertexPosition);
    gl.vertexAttribPointer(program.aVertexPosition, buffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, buffer.numItem);
}
},{}],8:[function(require,module,exports){
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
},{"../data/fragmentshader":2,"../data/vertexshader":3}]},{},[6]);
