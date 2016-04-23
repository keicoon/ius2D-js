//initialize
const logic = require('./logic/logic');

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