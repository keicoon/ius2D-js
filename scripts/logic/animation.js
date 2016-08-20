'use strict'

const util = require('../util/util')
const Vector3D = util.Vector3D
const transform = require('./transform');
const render = require('./render');

class animation extends transform {
    constructor(logic, name, aN = 0, fps = 1000, location, rotation, scale, bufferType = 'rectData') {
        super(location, rotation, scale)
        this.logic = logic
        this.resourceManager = logic.resourceManager
        this.vertex = util.MakeVertexsData(logic.gl, bufferType)
        
        this.aN = aN;
        
        this.SetAnimation(name, fps)
    }  
    SetAnimation(name, fps) {    
        this.currentFrame = 0;
        this.animationTimer = 0;

        const imgData = this.resourceManager.GetImage(name);
        this.Id = imgData.Id;
        this.Src = imgData.Src;
        this.uv = util.MakeRectUVData(this.logic.gl, this.Id.width, this.Id.height, this.Id.animation[this.aN][this.currentFrame]);
    
        this.frame = this.Id.animation[this.aN].length;
        this.speed = fps;
    }
    GetSpriteScale() {
        const rect = this.Id.animation[this.aN][this.currentFrame];
        return Vector3D.C({X:rect[2], Y:rect[3], Z:1}).Multifly_Vector(this.Scale)
    }
    Render() {
        render(this.logic.gl, this.logic.program, this.vertex, this.uv,
            this.Location.ToArray(), this.Rotation.ToArray(), this.GetSpriteScale().Multifly_Vector(this.logic.viewportScale).ToArray(),
            this.Src);
    }
    Update(delta) {
        this.animationTimer += delta;
        let currentFrame = Math.floor(this.animationTimer*this.frame/this.speed)
        if(currentFrame >= this.frame){
            currentFrame = this.animationTimer = 0;
        }
        if(currentFrame != this.currentFrame){
            this.currentFrame = currentFrame
            this.uv = util.MakeRectUVData(this.logic.gl, this.Id.width, this.Id.height, this.Id.animation[this.aN][this.currentFrame]);
        }
        
    }
}
module.exports = animation;