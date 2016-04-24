class transform {
    constructor(Transform) {
        this.Transform = Transform;
        
        this.Initialize(this.Transform);
    }
    Initialize(Transform = {'Location':{X:0,Y:0,Z:0},'Rotation':{Yaw:0,Pitch:0,Roll:0},'Scale':{X:1,Y:1,Z:1}}) {
        this.Location = Transform.Location;
        this.Rotation = Transform.Rotation;
        this.Scale = Transform.Scale;
    }
    GetLocation() {
        return [this.Location.X, this.Location.Y, this.Location.Z];
    }
    GetRotation() {
        return [this.Rotation.Yaw, this.Rotation.Pitch, this.Rotation.Roll];
    }
    GetScale() {
        return [this.Scale.X, this.Scale.Y, this.Scale.Z];
    }
    SetTransform(Transform) {
        this.Transform = Transform;
    }
    SetLocation(Location) {
        this.Location = Transform.Location;
    }
    SetRotation(Rotation) {
        this.Rotation = Transform.Rotation;
    }
    SetScale(Scale) {
        this.Scale = Transform.Scale;
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
}
module.exports = transform;