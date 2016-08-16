'use strict'

const scene = require('../logic/scene')
const sprite = require('../logic/sprite')
const animation = require('../logic/animation')
const textSprite = require('../logic/textSprite')

class gamescene extends scene {
    constructor(logic) {
        super(logic);
    }
    BeginPlay() {
        this.spriteA = new sprite(this.logic, 'test', 0, 0)
        this.animationA = new animation(this.logic, 'test2', 0)
        this.animationA.MoveLocation({X:50,Y:80,Z:0})
        this.textSprite = new (textSprite(this.logic.canvas, this.logic.gl))(this.logic, '하이요!', 55, this.logic.util.RGB(255,255,0), 'RixToyGray', {X: -100, Y: -200, Z: 0})
    }
    Destroy() {}
    Render(delta) {
        this.spriteA.Render(this.logic)
        this.animationA.Render(this.logic)
        this.textSprite.Render()
    }
    Update(delta) {
        this.animationA.Update(this.logic, delta)
    }
}

module.exports = gamescene;