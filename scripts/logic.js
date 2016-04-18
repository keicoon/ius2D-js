const render = require('./render');
const fps = require('./fps');

module.exports = (gl, cvs)=>{
    
    let buffer = require('./buffer')(gl);
    let program = require('./shader')(gl);
    
    let viewportWidth, viewportHright;
    if(cvs)  viewportWidth = cvs.width='500', viewportHright = cvs.height='500'
    gl.viewport(0, 0, parseInt(cvs.width), +parseInt(cvs.height));
    
    let logic = {
    'pixelMatrix' : [
        2/viewportWidth,0,0,0,
        0,2/viewportHright,0,0,
        0,0,0,0,
        0,0,0,1
        ]
    };
        
    setInterval(()=>{
        console.log('fps: ', fps.Getfps());
        let delta = fps.Tickfps();
        // update();
        render(gl, program, buffer, logic);
    },33)
}