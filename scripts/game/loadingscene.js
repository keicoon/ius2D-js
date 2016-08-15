'use strict'

const scene = require('../logic/scene');
const gamescene = require('./gamescene');

class loadingscene extends scene {
    constructor(logic) {
        super(logic);
        this.resourceManager = logic.resourceManager
        //texture loading
        this.resourceManager.AddImage(logic.gl, 'test')
        this.resourceManager.AddImage(logic.gl, 'test2')
        this.resourceManager.AddAllFont()
    }
    Render(delta) {
        super.Render(delta);
    }
    
    Update(delta) {
        super.Update(delta);
        
        if(this.resourceManager.GetLoadingState())
            this.logic.ChangeScene(this, new gamescene(this.logic));
    }
}

module.exports = loadingscene;