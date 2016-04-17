const render = require('./render');
const fps = require('./fps');

module.exports = (gl, cvs)=>{
    
    let buffer = require('./buffer')(gl);
    let program = require('./shader')(gl);
    
    if(cvs)  cvs.width='450', cvs.height='300'
    gl.viewport(0, 0, parseInt(cvs.width), +parseInt(cvs.height));
    setInterval(()=>{
        console.log('fps: ', fps.Getfps());
        let delta = fps.Tickfps();
        // update();
        render(gl, program, buffer);
    },33)
}