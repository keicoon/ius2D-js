const fps = require('./fps');

const loadingscene = require('./loadingscene');

module.exports = (gl, cvs)=>{
    let defaultViewportWidth = '1080', defaultViewportHeight = '1920'
    let screenWidth = window.innerWidth, screenHeight = window.innerHeight
    let viewportWidth, viewportHeight
    let scaleWidth, scaleHeight;
    
    scaleWidth = scaleHeight = (defaultViewportWidth - screenWidth) > (defaultViewportHeight - screenHeight)
        ? screenWidth / defaultViewportWidth : screenHeight / defaultViewportHeight 
    
    if(cvs)  viewportWidth = cvs.width= defaultViewportWidth*scaleWidth, viewportHeight = cvs.height= defaultViewportHeight*scaleHeight
    gl.viewport(0, 0, parseInt(cvs.width), +parseInt(cvs.height));
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    gl.enable(gl.BLEND)
    
    console.log('#defaultViewport',defaultViewportWidth,defaultViewportHeight)
    console.log('#defaultScreen',screenWidth,screenHeight)
    console.log('#currentScreen',viewportWidth,viewportHeight)
    
    //initialize
    let logic = {
        'gl': gl,
        'program': require('./shader')(gl),
        'buffer': require('./buffer')(gl),
        'pixelMatrix': [
            2/viewportWidth,0,0,0,
            0,2/viewportHeight,0,0,
            0,0,0,0,
            0,0,0,1
        ],
        'defaultViewportSize':{X:defaultViewportWidth, Y:defaultViewportHeight, Z:1},
        'currentViewportSize':{X:viewportWidth, Y:viewportHeight, Z:1},
        'viewportScale':{X:scaleWidth, Y:scaleHeight, Z:0},
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