const transform = require('./transform');
const render = require('./render');
const img = require('./img');

class animation extends transform {
    constructor(logic, name, aN = 0, Transform, bufferType = 'rectData') {
        super(Transform);
        this.vertex = logic.util.MakeVertexsData(logic.gl, bufferType);
        
        this.aN = aN;
        
        this.SetAnimation(logic, name);
    }  
    SetAnimation(logic, name) {
        this.currentFrame = 0;        
        this.frame = 4;
        this.speed = 1;
        this.animationTimer = 0;
        
        const imgData = img.Get(name);
        this.Id = imgData.Id;
        this.Src = imgData.Src;
        this.uv = logic.util.MakeRectUVData(logic.gl, this.Id.width, this.Id.height, this.Id.animation[this.aN][this.currentFrame]);
    }
    GetSpriteScale() {
        const rect = this.Id.animation[this.aN][this.currentFrame];
        const SrcScale = {X:rect[2], Y:rect[3], Z:1};
        return [SrcScale.X*this.Scale.X, SrcScale.Y*this.Scale.Y, SrcScale.Z*this.Scale.Z];
    }
    Render(logic) {
        render(logic.gl, logic.program, this.vertex, this.uv,
            this.GetLocation(), this.GetRotation(), logic.util.ArrayVectorMultifly(this.GetSpriteScale(),logic.viewportScale),
            this.Src);
    }
    Update(logic, delta) {
        this.animationTimer += delta;
        let currentFrame = Math.floor(this.animationTimer*this.frame/this.speed)
        if(currentFrame >= this.frame){
            currentFrame = this.animationTimer = 0;
        }
        if(currentFrame != this.currentFrame){
            this.currentFrame = currentFrame
            this.uv = logic.util.MakeRectUVData(logic.gl, this.Id.width, this.Id.height, this.Id.animation[this.aN][this.currentFrame]);
        }
        
    }
}
module.exports = animation;