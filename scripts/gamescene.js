const scene = require('./scene');
const sprite = require('./sprite');

class gamescene extends scene {
    constructor(logic) {
        super(logic);
        this.spriteA = new sprite('test');
    }
    Render() {
        super.Render();
        
        this.spriteA.Render(this.logic);
    }
    
    Update() {
        super.Update();
    }
}

module.exports = gamescene;