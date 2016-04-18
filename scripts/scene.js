class scene {
    constructor(logic) {
        this.logic = logic;
    }
    Render() {
        
    }
    Update() {
        
    }
    Tick(delta) {
        this.Update();
        this.Redner();
    }
}

module.exports = scene;