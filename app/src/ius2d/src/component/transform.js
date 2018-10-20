'use strict'

const Vector3D = require('../util/vector').Vector3D
const Rotator = require('../util/rotator')

class Transform {
    constructor(Location = {X:0,Y:0,Z:0}, Rotation = {Yaw:0,Pitch:0,Roll:0}, Scale = {X:1,Y:1,Z:1}) {
        this.transform = {
            Location: Vector3D.C(Location),
            Rotation: Rotator.C(Rotation),
            Scale: Vector3D.C(Scale)
        }
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
        this.Transform.Location.Add_Vector(_Location)
    }
    MoveRotation(_Rotation) {
        this.Transform.Rotation.Add_Rotator(_Rotation)
    }
    MoveScale(_Scale) {
        this.Transform.Scale.Add_Vector(_Scale)
    }
}
module.exports = Transform;