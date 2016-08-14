const scene = require('../logic/scene');
const img = require('../logic/img');

const gamescene = require('./gamescene');

class loadingscene extends scene {
    constructor(logic) {
        super(logic);
        //texture loading
        img.Add(logic.gl, 'test')
        img.Add(logic.gl, 'test2')
    }
    Render(delta) {
        super.Render(delta);
    }
    
    Update(delta) {
        super.Update(delta);
        
        let LoadingState = img.GetLoadingState()
        console.log('#Loading: ',LoadingState.current,' / ',LoadingState.maximum)
        if(LoadingState.current >= LoadingState.maximum)
            this.logic.ChangeScene(this, new gamescene(this.logic));
    }
}

module.exports = loadingscene;