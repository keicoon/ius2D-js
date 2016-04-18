const scene = require('./scene');
const img = require('./img');
const textureData = require('../data/texture')

const gamescene = require('./gamescene');

class loadingscene extends scene {
    constructor(logic) {
        super(logic);
        //texture loading
        textureData.map((o) => img.Add(logic.gl, o.key, o.value))
    }
    Render() {
        super.Render();
    }
    
    Update() {
        super.Update();
        
        if(img.IsFinishLoading()){
            console.log('Loading Finished..');
            this.logic.ChangeScene(this, new gamescene(this.logic));
        }
    }
}

module.exports = loadingscene;