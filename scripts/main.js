//initialize
const _ = require('lodash')
const logic = require('./logic/logic');

let initialize = () => {
    let newStyle = document.createElement('style');
    _.forEach(require('./data/font'), (v, k) => {
        newStyle.appendChild(document.createTextNode("\
@font-face {\
    font-family: '" + k + "';\
    src: url('" + v + "')\
}\
"));
    })
    document.head.appendChild(newStyle);
}
let main = () => {
    initialize()
    document.getElementById('test').style.fontFamily = 'RixToyGray'
    let cvs = document.getElementById('glCanvas');
    let gl;

    const keys = 'webgl,experimental-webgl,webkit-3d,moz-webgl'.split(',');
    let i = keys.length;

    while (i--) if (gl = cvs.getContext(keys[i])) break
    if (gl) console.log('webgl initialize succ!')
    else console.log('webgl initialize fail!')

    logic(gl, cvs);
}

main()