'use strict'

const _ = require('lodash')
const Vector3D = require('../util/vector').Vector3D

const eGameStatus = ((list)=>{
    let obj = new Object()
    for(let index = 0, length = list.length; index < length; ++index)
        obj[list[index]] = index
    return obj
})(['NotYet','ResourceLoading','ResourceLoaded','GameStarted','GameStop','GameResume','GameOver'])

class scene {
    constructor(context) {
        this.context = context;
        this.actors = new Array()
        this.bTick = false
    }
    pBeginPlay() {
        this.BeginPlay()
        this.bTick = true
        this.controller = this.context.controller
    }
    pDestroy() {
        this.bTick = false
        _.forEach(this.actors, a=>a.Destroy())
        this.actors = []
        this.context.timerManager.DeleteTimer()

        this.Destroy()
    }
    pTick(delta) {
        const gl = this.context.gl;
        
        gl.clearColor(0, 0, 0, 1)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)        

        if(this.bTick) {
            _.forEach(this.actors, a=>a.Tick(delta))
            this.Tick(delta)
            ///@ UI Input
            this.InputKey()
            this.InputMouse()
        }
    }
    ProjectionViewport(loc) {
        return Vector3D.C(loc).Multifly_Vector(this.context.viewportScale)
    }
    get GameStatus() { return eGameStatus } 
    get CurrentGameStatus() { return this.context.gameStatus }
    get DeltaTime() { return this.context.timerManager.DeltaTime() }
    set CurrentGameStatus(_status) { this.context.gameStatus = _status}
}

module.exports = scene