'use strict'

const _ = require('lodash')

const SceneMap = {
    'Loadingscene': require('../game/loadingscene'),
    'Gamescene': require('../game/gamescene'),
    'Debugscene': require('../game/debugscene')
}
const PlayerController = require('../game/playercontroller')
const Fps = require('./fps')
const ResourceManager = require('./resourceManager')
const timerManager = require('./timerManager')
const controller = require('./controller')
const util = require('../util/util')
const Vector2D = util.Vector2D
const Vector3D = util.Vector3D

module.exports = (gl, cvs, browserContext) => {
    let defaultViewportSize = new Vector2D(1080, 1920)
    let screen = new Vector2D(window.innerWidth, window.innerHeight)
    let viewportSize = new Vector2D()
    let viewportScale = new Vector3D()

    viewportScale.Set(defaultViewportSize.Subtract_X(screen) > defaultViewportSize.Subtract_Y(screen)
        ? screen.Divide_X(defaultViewportSize) : screen.Divide_Y(defaultViewportSize))

    if (cvs) cvs.width = viewportSize.X = defaultViewportSize.Multifly_X(viewportScale), cvs.height = viewportSize.Y = defaultViewportSize.Multifly_Y(viewportScale)

    gl.viewport(0, 0, parseInt(cvs.width), parseInt(cvs.height));
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)
    gl.enable(gl.BLEND)

    console.log('#defaultViewportSize', defaultViewportSize.ToString())
    console.log('#screen', screen.ToString())
    console.log('#viewportSize', viewportSize.ToString())

    //initialize
    let context = _.extend(browserContext, {
        gameStatus: 0,
        gl,
        program: require('./shader')(gl),
        pixelMatrix: [
            2 / viewportSize.X, 0, 0, 0,
            0, -2 / viewportSize.Y, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 1
        ],
        defaultViewportSize,
        viewportSize,
        viewportScale,
        fps: ()=>Fps.Getfps(),
        timerManager,
        controller: new PlayerController(true, false, false),
        ChangeScene: (nextSceneName) => {
            currentScene.pDestroy()
            currentScene = null
            currentScene = new SceneMap[nextSceneName](context)
            currentScene.pBeginPlay()
        },
        GetCurrentScene: () => currentScene
    })
    context.resourceManager =  new ResourceManager(context)
    let currentScene = new SceneMap['Loadingscene'](context),
        debugScene = new SceneMap['Debugscene'](context)
    currentScene.pBeginPlay(), debugScene.BeginPlay()

    setInterval(() => {
        let delta = Fps.Tickfps();
        if (!delta) return
        
        timerManager.Tick(delta)

        currentScene.pTick(delta)
        debugScene.Tick(delta)
    }, 0)
}