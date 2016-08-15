const scene = require('../logic/scene');
const sprite = require('../logic/sprite');
const animation = require('../logic/animation');

class gamescene extends scene {
    constructor(logic) {
        super(logic);
        this.spriteA = new sprite(logic, 'test', 0, 0)
        this.animationA = new animation(logic, 'test2', 0)
        this.animationA.MoveLocation({X:50,Y:80,Z:0})

        this.textSprite = new logic.textSprite(logic, '', 55, '#FF0000', 'RixToyGray', {X: -100, Y: 200, Z: 0})
        this.textSprite.MoveLocation({X:0,Y:200,Z:0})

        this.prevFPS = this.logic.fps()
    }
    Render(delta) {
        super.Render(delta)
        
        this.spriteA.Render(this.logic)
        this.animationA.Render(this.logic)
        this.textSprite.Render()
    }
    
    Update(delta) {
        super.Update(delta)
        
        this.animationA.Update(this.logic, delta)
        const curFPS = this.logic.fps()
        if(curFPS != this.prevFPS) {
            this.textSprite.ChangeText('fps: ' + curFPS)
            this.prevFPS = curFPS
        } 
    }
}

module.exports = gamescene;