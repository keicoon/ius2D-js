const scene = require('../logic/scene');
const sprite = require('../logic/sprite');
const animation = require('../logic/animation');

class gamescene extends scene {
    constructor(logic) {
        super(logic);
        this.spriteA = new sprite(logic, 'test', 0, 0)
        this.animationA = new animation(logic, 'test2', 0)
        this.animationA.MoveLocation({X:50,Y:80,Z:0})

        this.textSprite = new logic.textSprite(logic, 'abcd가나다', 20, '#FF0000', 'RixToyGray')
        this.textSprite.MoveLocation({X:0,Y:200,Z:0})
    }
    Render(delta) {
        super.Render(delta)
        
        this.spriteA.Render(this.logic)
        this.animationA.Render(this.logic)
        this.textSprite.Render(this.logic)
    }
    
    Update(delta) {
        super.Update(delta)
        
        this.animationA.Update(this.logic, delta)
    }
}

module.exports = gamescene;