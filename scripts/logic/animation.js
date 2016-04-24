const render = require('./render');
const img = require('./img');

class animation {
    constructor(logic, name, aN = 0, Translation, bufferType = 'rectData') {
        this.vertex = logic.util.MakeVertexsData(logic.gl, bufferType);
        
        this.aN = aN;
        
        this.SetAnimation(logic, name);
        this.Initialize(Translation);
    }
    Initialize(Translation = {'Location':{X:0,Y:0,Z:0},'Rotation':{Yaw:0,Pitch:0,Roll:0},'Scale':{X:1,Y:1,Z:1}}) {
        this.Location = Translation.Location;
        this.Rotation = Translation.Rotation;
        this.Scale = Translation.Scale;
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
    GetLocation() {
        return [this.Location.X, this.Location.Y, this.Location.Z];
    }
    GetRotation() {
        return [this.Rotation.Yaw, this.Rotation.Pitch, this.Rotation.Roll];
    }
    GetScale() {
        const rect = this.Id.animation[this.aN][this.currentFrame];
        const SrcScale = {X:rect[2], Y:rect[3], Z:1};
        return [SrcScale.X*this.Scale.X, SrcScale.Y*this.Scale.Y, SrcScale.Z*this.Scale.Z];
    }
    MoveLocation(Location) {
        this.Location.X += Location.X;
        this.Location.Y += Location.Y;
        this.Location.Z += Location.Z;
    }
    MoveRotation(Rotation) {
        this.Rotation.Yaw += Rotation.Yaw;
        this.Rotation.Pitch += Rotation.Pitch;
        this.Rotation.Roll += Rotation.Roll;
    }
    MoveScale(Scale) {
        this.Scale.X += Scale.X;
        this.Scale.Y += Scale.Y;
        this.Scale.Z += Scale.Z;
    }
    Render(logic) {
        render(logic.gl, logic.program, this.vertex, this.uv,
            this.GetLocation(), this.GetRotation(), logic.util.ArrayVectorMultifly(this.GetScale(),logic.viewportScale),
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