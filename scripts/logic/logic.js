'use strict'

const _ = require('lodash')

const fps = require('./fps')
const loadingscene = require('../game/loadingscene')
const debugscene = require('../game/debugscene')
const resourceManager = require('./resourceManager')
const timerManager = require('../logic/timerManager')
const util = require('../util')

module.exports = (gl, cvs, context) => {
    let defaultViewport = new util.Size(1080, 1920)
    let screen = new util.Size(window.innerWidth, window.innerHeight)
    let viewport = new util.Size()
    let viewportScale = new util.Vector2D()

    viewportScale.Set((defaultViewport.Width - screen.Width) > (defaultViewport.Height - screen.Height)
        ? screen.Width / defaultViewport.Width : screen.Height / defaultViewport.Height)

    if (cvs) viewport.Width = cvs.width = defaultViewport.Width * viewportScale.X, viewport.Height = cvs.height = defaultViewport.Height * viewportScale.Y
    gl.viewport(0, 0, parseInt(cvs.width), +parseInt(cvs.height));
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    gl.enable(gl.BLEND)

    console.log('#defaultViewport', defaultViewport.Width, defaultViewport.Height)
    console.log('#defaultScreen', screen.Width, screen.Height)
    console.log('#currentScreen', viewport.Width, viewport.Height)

    //initialize
    let logic = _.extend(context, {
        gameStatus: 0,
        gl,
        program: require('./shader')(gl),
        pixelMatrix: [
            2 / viewport.Width, 0, 0, 0,
            0, 2 / viewport.Height, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 1
        ],
        resourceManager: new resourceManager(context),
        timerManager: timerManager,
        fps: ()=>fps.Getfps(),
        util,
        defaultViewportSize: { X: defaultViewport.Width, Y: defaultViewport.Height, Z: 1 },
        currentViewportSize: { X: viewport.Width, Y: viewport.Height, Z: 1 },
        viewportScale: { X: viewportScale.X, Y: viewportScale.Y, Z: 0 },
        ChangeScene: (prevScene, aftrScene) => {
            prevScene.pDestroy();
            prevScene = null;
            aftrScene.pBeginPlay();
            currentScene = aftrScene;
        }
    })
    
    let currentScene = new loadingscene(logic),
        debugScene = new debugscene(logic);
    currentScene.pBeginPlay()
    debugScene.BeginPlay()

    setInterval(() => {
        let delta = fps.Tickfps();
        if (!delta) return

        timerManager.Tick(delta)

        currentScene.pUpdate(delta);
        currentScene.pRender(delta);

        debugScene.Update(delta)
        debugScene.Render(delta)
    }, 0)
}