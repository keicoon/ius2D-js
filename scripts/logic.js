const fps = require('./fps');

const loadingscene = require('./loadingscene');

module.exports = (gl, cvs)=>{
    let viewportWidth, viewportHright;
    if(cvs)  viewportWidth = cvs.width='500', viewportHright = cvs.height='500'
    gl.viewport(0, 0, parseInt(cvs.width), +parseInt(cvs.height));
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    gl.enable(gl.BLEND)
    
    //initialize
    let logic = {
        'gl': gl,
        'program': require('./shader')(gl),
        'buffer': require('./buffer')(gl),
        'pixelMatrix': [
            2/viewportWidth,0,0,0,
            0,2/viewportHright,0,0,
            0,0,0,0,
            0,0,0,1
        ],
        'ChangeScene': (prevScene, aftrScene) => {
            //prevScene.Destroy();
            prevScene = null;
            // aftrScne.Initialize();
            currentScene = aftrScene;
        }
    };
    
    let currentScene = new loadingscene(logic);
    
    setInterval(()=>{
        // console.log('fps: ', fps.Getfps());
        let delta = fps.Tickfps();
        
        currentScene.Update();
        currentScene.Render();
    },33)
}