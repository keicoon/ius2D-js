'use strict'

const eGameStatus = ((list)=>{
    let obj = new Object()
    for(let index = 0, length = list.length; index < length; ++index)
        obj[list[index]] = index
    return obj
})(['NotYet','ResourceLoading','ResourceLoaded','GameStarted','GameStop','GameResume','GameOver'])

class scene {
    constructor(logic) {
        this.logic = logic;
        this.bTick = false
    }
    pBeginPlay() {
        this.BeginPlay()
        this.bTick = true
        
        this.logic.inputManager.Delegate_InputKey.Add = (...p)=>{
            this.InputKey(this, p[0], p[1])
        }
        this.logic.inputManager.Delegate_InputMouse.Add = (...p)=>{
            this.InputMouse(this, p[0], p[1])
        }
    }
    pDestroy() {
        this.logic.inputManager.Delegate_InputKey.RemoveAll()
        this.logic.inputManager.Delegate_InputMouse.RemoveAll()

        this.bTick = false
        this.logic.timerManager.DeleteTimer()

        this.Destroy()
    }
    pRender(delta) {
        const gl = this.logic.gl;
        const program = this.logic.program;
        const pixelMatrix = this.logic.pixelMatrix;
        
        gl.clearColor(0, 0, 0, 1)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        gl.useProgram(program)
        gl.uniformMatrix4fv(program.uPixelMatrix, false, pixelMatrix);

        this.bTick && this.Render(delta)
    }
    pUpdate(delta) {
        this.bTick && this.Update(delta)
    }
    get GameStatus() {
        return eGameStatus
    }
}

module.exports = scene;