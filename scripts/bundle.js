(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const render = require('./render');

module.exports = (gl)=>{
    
    setInterval(()=>{render(gl);},16)
    // render(gl)
}
},{"./render":3}],2:[function(require,module,exports){
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

    logic(gl);
}
},{"./logic":1}],3:[function(require,module,exports){
module.exports = (gl)=>{
    gl.clearColor(Math.random(),Math.random(),Math.random(), 1)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    
}
},{}]},{},[2]);
