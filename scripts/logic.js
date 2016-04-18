const render = require('./render');
const fps = require('./fps');
const img = require('./img');

module.exports = (gl, cvs)=>{
    
    let buffer = require('./buffer')(gl);
    let program = require('./shader')(gl);
    
    let viewportWidth, viewportHright;
    if(cvs)  viewportWidth = cvs.width='500', viewportHright = cvs.height='500'
    gl.viewport(0, 0, parseInt(cvs.width), +parseInt(cvs.height));
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    gl.enable(gl.BLEND)
    
    img.add(gl, 'test', 'test.png')
    let logic = {
    'pixelMatrix': [
        2/viewportWidth,0,0,0,
        0,2/viewportHright,0,0,
        0,0,0,0,
        0,0,0,1
        ],
    'img': img
    };
    
    setInterval(()=>{
        // console.log('fps: ', fps.Getfps());
        let delta = fps.Tickfps();
        // update();
        render(gl, program, buffer.vertex, buffer.uv, logic);
    },33)
}