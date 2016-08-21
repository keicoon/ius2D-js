'use strict'

const pow = (a, b = 2) => {
    return Math.pow(a, b)
}
const sqrt = (a) => {
    return Math.floor(Math.sqrt(a))
}

class Vector3D {
    constructor(x=0,y=0,z=0) {
        this.X = x, this.Y = y, this.Z = z
    }
    static C(_v) {
        return new Vector3D(_v.X,_v.Y,_v.Z)
    }
    ToString() {
        return 'X: ' + this.X + ', Y: ' + this.Y + ', Z: ' + this.Z 
    }
    ToArray() {
        return [this.X, this.Y, this.Z]
    }
    Set(v) {
        this.X = this.Y = this.Z = v
    }
    Abs() {
        this.X = Math.abs(this.X), this.Y = Math.abs(this.Y), this.Z = Math.abs(this.Z)
    }
    Negative() {
        this.X = -this.X, this.Y = -this.Y, this.Z = -this.Z
        return this
    }
    Reciprocal() {
        this.X = 1 / (this.X || 1), this.Y = 1 / (this.Y || 1), this.Z = 1 / (this.Z || 1)
        return this
    }
    Length() {
        return pow(this.X) + pow(this.Y) + pow(this.Z)
    }
    LengthSquard() {
        return sqrt(this.Length())
    }
    Normalize() {
        return this.Divide_Float(this.LengthSquard())
    }
    Add_Vector(_v) {
        this.X += _v.X, this.Y += _v.Y, this.Z += _v.Z
        return this
    }
    Subtract_Vector(_v) {
        return this.Add_Vector(_v.Negative())
    }
    Multifly_Float(_f) {
        this.X *= _f, this.Y *= _f, this.Z *= _f
        return this
    }
    Multifly_Vector(_v) {
        this.X *= _v.X, this.Y *= _v.Y, this.Z *= _v.Z
        return this
    }
    Divide_Float(_f) {
        _f = 1 / (_f || 1)
        return this.Multifly_Float(_f)
    }
    Divide_Vector(_v) {
        return this.Multifly_Vector(_v.Reciprocal())
    }
    Dot(_v) {
        return (this.X * _v.X) + (this.Y * _v.Y) + (this.Z * _v.Z)
    }
    Cross(_v) {
        return Vector3D.C({X:(this.Y*_v.Z - this.Z*_v.Y),Y:(this.Z*_v.X - this.X*_v.Z),Z:(this.X*_v.Y - this.Y*_v.Z)})
    }
    DistanceTo(_v) {
        return sqrt(pow(this.X - _v.X) + pow(this.Y - _v.Y) + pow(this.Z - _v.Z))
    }
}

class Vector2D {
    constructor(x=0,y=0) {
        this.X = x, this.Y = y
    }
    static C(_v) {
        return new Vector2D(_v.X,_v.Y)
    }
    ToString() {
        return 'X: ' + this.X + ', Y: ' + this.Y
    }
    Compare(_v) {
        return this.X == _v.X && this.Y == _v.Y
    }
    Copy(_v) {
        this.X = _v.X, this.Y = _v.Y
    }
    Set(...p) {
        switch(p.length)
        {
            case 1:
            this.X = this.Y = p[0]
            break
            case 2:
            this.X = p[0], this.Y = p[1]
            break
        }
    }
    Subtract_X(_v) {
        return this.X - _v.X
    }
    Subtract_Y(_v) {
        return this.Y - _v.Y
    }
    Multifly_X(_v) {
        return this.X * _v.X
    }
    Multifly_Y(_v) {
        return this.Y * _v.Y
    }
    Divide_X(_v) {
        return this.X / (_v.X || 1)
    }
    Divide_Y(_v) {
        return this.Y / (_v.Y || 1)
    }
}

module.exports = {Vector3D,Vector2D}