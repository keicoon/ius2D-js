'use strict'

const util = require('../util/util')
const scene = require('../logic/scene')
const sprite = require('../logic/sprite')
const animation = require('../logic/animation')
const textSprite = require('../logic/textSprite')

class gamescene extends scene {
    constructor(logic) {
        super(logic);
    }
    BeginPlay() {
        this.spriteA = new sprite(this.logic, 'test', 0, 0, util.ProjectViewport({X:0,Y:0,Z:0}, this.logic.viewportScale))
        this.animationA = new animation(this.logic, 'test2', 0)
        this.animationA.MoveLocation({X:50,Y:80,Z:0})
        this.textSprite = new (textSprite(this.logic.canvas, this.logic.gl))(this.logic, '하이요!', 55, util.RGB(255,255,0), 'RixToyGray', {X: -100, Y: -200, Z: 0})
    }
    Destroy() {}
    Render(delta) {
        this.spriteA.Render()
        this.animationA.Render()
        this.textSprite.Render()
    }
    Update(delta) {
        this.animationA.Update(delta)
    }
}

module.exports = gamescene;