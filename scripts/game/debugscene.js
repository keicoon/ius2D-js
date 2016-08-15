'use strict'

const scene = require('../logic/scene')
const textSprite = require('../logic/textSprite')

class debugscene extends scene {
    constructor(logic) {
        super(logic);
    }
    BeginPlay(){
        this.textSprite = new (textSprite(this.logic.canvas, this.logic.gl))(this.logic, 'fps: ', 55, '#FF0000', 'RixToyGray', {X: -100, Y: 200, Z: 0})
        this.timer = this.logic.timerManager.AddTimer(500, true)
    }
    Render(delta) {
        if(this.GameStatus.ResourceLoaded <= this.logic.gameStatus)
            this.textSprite.Render()
    }
    Update(delta) {
        if(this.GameStatus.ResourceLoaded <= this.logic.gameStatus && this.timer.IsBoom())
            this.textSprite.ChangeText('fps: ' + this.logic.fps())
    }
}

module.exports = debugscene;