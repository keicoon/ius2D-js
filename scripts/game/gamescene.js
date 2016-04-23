const scene = require('../logic/scene');
const sprite = require('../logic/sprite');

class gamescene extends scene {
    constructor(logic) {
        super(logic);
        this.spriteA = new sprite('test');
    }
    Render(delta) {
        super.Render(delta);
        
        this.spriteA.Render(this.logic);
    }
    
    Update(delta) {
        super.Update(delta);
    }
}

module.exports = gamescene;