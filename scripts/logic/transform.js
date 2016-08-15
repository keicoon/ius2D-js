'use strict'

class transform {
    constructor(Location = {X:0,Y:0,Z:0}, Rotation = {Yaw:0,Pitch:0,Roll:0}, Scale = {X:1,Y:1,Z:1}) {
        this.transform = {
            Location,
            Rotation,
            Scale
        }
    }
    get LocationByArr() {
        return [this.Transform.Location.X, this.Transform.Location.Y, this.Transform.Location.Z];
    }
    get RotationByArr() {
        return [this.Transform.Rotation.Yaw, this.Transform.Rotation.Pitch, this.Transform.Rotation.Roll];
    }
    get ScaleByArr() {
        return [this.Transform.Scale.X, this.Transform.Scale.Y, this.Transform.Scale.Z];
    }
    get Location() {
        return this.Transform.Location
    }
    get Rotation() {
        return this.Transform.Rotation
    }
    get Scale() {
        return this.Transform.Scale
    }
    get Transform() {
        return this.transform
    }
    set Location(_Location) {
        this.Transform.Location = _Location
    }
    set Rotation(_Rotation) {
        this.Transform.Rotation = _Rotation;
    }
    set Scale(_Scale) {
        this.Transform.Scale = _Scale;
    }
    set Transform(_Transform) {
        this.transform = _Transform;
    }
    MoveLocation(_Location) {
        this.Transform.Location.X += _Location.X;
        this.Transform.Location.Y += _Location.Y;
        this.Transform.Location.Z += _Location.Z;
    }
    MoveRotation(_Rotation) {
        this.Transform.Rotation.Yaw += _Rotation.Yaw;
        this.Transform.Rotation.Pitch += _Rotation.Pitch;
        this.Transform.Rotation.Roll += _Rotation.Roll;
    }
    MoveScale(_Scale) {
        this.Transform.Scale.X += _Scale.X;
        this.Transform.Scale.Y += _Scale.Y;
        this.Transform.Scale.Z += _Scale.Z;
    }
}
module.exports = transform;