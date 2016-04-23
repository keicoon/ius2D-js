class scene {
    constructor(logic) {
        this.logic = logic;
    }
    Render() {
        
    }
    Update() {
        
    }
    Tick(delta) {
        this.Update(delta);
        this.Redner(delta);
    }
}

module.exports = scene;