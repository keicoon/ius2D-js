'use strict'

class Rotator {
    constructor(yaw=0,pitch=0,roll=0) {
        this.Yaw = yaw, this.Pitch = pitch , this.Roll = roll
    }
    static C(_r) {
        return new Rotator(_r.Yaw,_r.Pitch,_r.Roll)
    }
    ToString() {
        return 'Yaw: ' + this.Yaw + ', Pitch: ' + this.Pitch + ', Roll: ' + this.Roll
    }
    ToArray() {
        return [this.Yaw, this.Pitch, this.Roll]
    }
}

module.exports = Rotator