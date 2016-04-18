const render = require('./render');
const img = require('./img');

class sprite {
    constructor(name, Translation) {
        this.Location = {X:0,Y:0,Z:0};
        this.Rotation = {Yaw:0,Pitch:0,Roll:0};
        this.Scale = {X:1,Y:-1,Z:1};
        
        this.SetSprite(name);
        Translation &&  this.Initialize(Translation);
    }
    Initialize(Translation) {
        this.Location = Translation.Location;
        this.Rotation = Translation.Rotation;
        this.Scale = Translation.Scale;
    }
    SetSprite(name) {
        this.Src = img.Get(name);
        this.SrcScale = {X:this.Src.img.naturalWidth, Y:this.Src.img.naturalHeight, Z:1};
        console.log('#',this.SrcScale.X, this.SrcScale.Y)
    }
    GetLocation() {
        return [this.Location.X, this.Location.Y, this.Location.Z];
    }
    GetRotation() {
        return [this.Rotation.Yaw, this.Rotation.Pitch, this.Rotation.Roll];
    }
    GetScale() {
        return [this.SrcScale.X*this.Scale.X, this.SrcScale.Y*this.Scale.Y, this.SrcScale.Z*this.Scale.Z];
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
        render(logic.gl, logic.program, logic.buffer.vertex, logic.buffer.uv, logic.pixelMatrix,
            this.GetLocation(), this.GetRotation(), this.GetScale(), this.Src);
    }
}
module.exports = sprite;