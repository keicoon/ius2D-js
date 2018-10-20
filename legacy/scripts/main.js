//initialize
const _ = require('lodash')
const logic = require('./logic/logic');

let context = {
    document: document,
    FontFace: FontFace,
    canvas: document.getElementById('textCanvas')
}
let main = (() => {
    let cvs = document.getElementById('glCanvas')
    let gl

    const keys = 'webgl,experimental-webgl,webkit-3d,moz-webgl'.split(',')
    let i = keys.length;

    const param = {
        alpha : true,
        premultipliedAlpha : true
    };

    while (i--) if (gl = cvs.getContext(keys[i], param)) break
    if (gl) console.log('webgl initialize succ!')
    else console.log('webgl initialize fail!')

    logic(gl, cvs, context)
})()