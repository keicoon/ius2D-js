'use strict'

const scene = require('../logic/scene');
const gamescene = require('./gamescene');

class loadingscene extends scene {
    constructor(logic) {
        super(logic);
        this.resourceManager = logic.resourceManager
    }
    BeginPlay() {
        this.resourceManager.AddImage(this.logic.gl, 'test')
        this.resourceManager.AddImage(this.logic.gl, 'test2')
        this.resourceManager.AddAllFont()
        this.logic.gameStatus = this.GameStatus.ResourceLoading
    }
    Destroy() {}
    Render(delta) {}
    Update(delta) {
        if(this.resourceManager.GetLoadingState()) {
            this.logic.gameStatus = this.GameStatus.ResourceLoaded
            this.logic.ChangeScene(this, new gamescene(this.logic));
        }
    }
}

module.exports = loadingscene;