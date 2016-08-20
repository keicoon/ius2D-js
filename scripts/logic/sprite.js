"use strict"

const util = require('../util/util')
const Vector3D = util.Vector3D
const transform = require('./transform');
const render = require('./render');

class sprite extends transform {
    constructor(logic, name, aN = 0, sN = 0, location, rotation, scale, bufferType = 'rectData') {
        super(location, rotation, scale)
        this.logic = logic
        this.resourceManager = logic.resourceManager
        this.vertex = util.MakeVertexsData(logic.gl, bufferType);
        
        this.aN = aN;
        this.sN = sN;
        
        this.SetSprite(name);
    }
    SetSprite(name) {
        const imgData = this.resourceManager.GetImage(name);
        this.Id = imgData.Id;
        this.Src = imgData.Src;
        this.uv = util.MakeRectUVData(this.logic.gl, this.Id.width, this.Id.height, this.Id.animation[this.aN][this.sN]);
    }
    GetSpriteScale() {
        const rect = this.Id.animation[this.aN][this.sN];
        return Vector3D.C({X:rect[2], Y:rect[3], Z:1}).Multifly_Vector(this.Scale)
    }
    Render() {
        render(this.logic.gl, this.logic.program, this.vertex, this.uv,
            this.Location.ToArray(), this.Rotation.ToArray(), this.GetSpriteScale().Multifly_Vector(this.logic.viewportScale).ToArray(),
            this.Src);
    }
}
module.exports = sprite;