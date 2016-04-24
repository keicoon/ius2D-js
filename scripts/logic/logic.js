const fps = require('./fps');
const loadingscene = require('../game/loadingscene');

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
        'pixelMatrix': [
            2/viewportWidth,0,0,0,
            0,2/viewportHeight,0,0,
            0,0,0,0,
            0,0,0,1
        ],
        'util': require('../util'),
        'defaultViewportSize': {X:defaultViewportWidth, Y:defaultViewportHeight, Z:1},
        'currentViewportSize': {X:viewportWidth, Y:viewportHeight, Z:1},
        'viewportScale': {X:scaleWidth, Y:scaleHeight, Z:0},
        'ChangeScene': (prevScene, aftrScene) => {
            //prevScene.Destropy();
            prevScene = null;
            // aftrScne.Initialize();
            currentScene = aftrScene;
        }
    };
    
    let currentScene = new loadingscene(logic);
    function tick() {
        let delta = fps.Tickfps();
        // console.log('fps: ', fps.Getfps());
        currentScene.Update(delta);
        currentScene.Render(delta);
        
        // process.nextTick(tick);
    }
    // tick()
    setInterval(()=>{
       tick() 
    },0)
}