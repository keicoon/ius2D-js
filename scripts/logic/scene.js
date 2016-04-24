class scene {
    constructor(logic) {
        this.logic = logic;
    }
    Render() {
        const gl = this.logic.gl;
        const program = this.logic.program;
        const pixelMatrix = this.logic.pixelMatrix;
        
        gl.clearColor(0, 0, 0, 1)
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        gl.useProgram(program)
        gl.uniformMatrix4fv(program.uPixelMatrix, false, pixelMatrix);
    }
    Update() {
        
    }
    Tick(delta) {
        this.Update(delta);
        this.Redner(delta);
    }
}

module.exports = scene;