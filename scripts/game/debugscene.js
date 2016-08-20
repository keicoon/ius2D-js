'use strict'

const util = require('../util/util')
const scene = require('../logic/scene')
const textSprite = require('../logic/textSprite')

class debugscene extends scene {
    constructor(logic) {
        super(logic);
    }
    BeginPlay(){
        this.textSprite = new (textSprite(this.logic))(this.logic, 'fps: ', 55, util.RGB(255,0,255), 'RixToyGray', 'left', util.ProjectionViewport({X:-540, Y:960}, this.logic))
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