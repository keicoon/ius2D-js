"use strict"

const transform = require('./transform');
const render = require('./render');

class sprite extends transform {
    constructor(logic, name, aN = 0, sN = 0, location, rotation, scale, bufferType = 'rectData') {
        super(location, rotation, scale)
        this.resourceManager = logic.resourceManager
        this.vertex = logic.util.MakeVertexsData(logic.gl, bufferType);
        
        this.aN = aN;
        this.sN = sN;
        
        this.SetSprite(logic, name);
    }
    SetSprite(logic, name) {
        const imgData = this.resourceManager.GetImage(name);
        this.Id = imgData.Id;
        this.Src = imgData.Src;
        this.uv = logic.util.MakeRectUVData(logic.gl, this.Id.width, this.Id.height, this.Id.animation[this.aN][this.sN]);
    }
    GetSpriteScale() {
        const rect = this.Id.animation[this.aN][this.sN];
        const SrcScale = {X:rect[2], Y:rect[3], Z:1};
        return [SrcScale.X*this.Scale.X, SrcScale.Y*this.Scale.Y, SrcScale.Z*this.Scale.Z];
    }
    Render(logic) {
        render(logic.gl, logic.program, this.vertex, this.uv,
            this.LocationByArr, this.RotationByArr, logic.util.ArrayVectorMultifly(this.GetSpriteScale(),logic.viewportScale),
            this.Src);
    }
}
module.exports = sprite;