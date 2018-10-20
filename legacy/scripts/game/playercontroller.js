'use strict'

const Controller = require('../logic/controller')
const Vector3D = require('../util/util').Vector3D

class PlayerController extends Controller {
    constructor(bUseKeyInput, bUseMouseInput, bUseTouchInput) {
        super(bUseKeyInput, bUseMouseInput, bUseTouchInput)
    }
    InputKey() {
        const DeltaTime = this.scene.DeltaTime
        const player = this.GetControlPlayer
        if (this.CheckKey('a', 'ArrowLeft'))
            player.MoveLocation(Vector3D.C({ X: -200 }).Multifly_Float(DeltaTime))
        if (this.CheckKey('s', 'ArrowDown'))
            player.MoveLocation(Vector3D.C({ Y: -200 }).Multifly_Float(DeltaTime))
        if (this.CheckKey('d', 'ArrowRight'))
            player.MoveLocation(Vector3D.C({ X: 200 }).Multifly_Float(DeltaTime))
        if (this.CheckKey('w', 'ArrowUp'))
            player.MoveLocation(Vector3D.C({ Y: 200 }).Multifly_Float(DeltaTime))
    }
    InputMouse() {
        console.log(this.GetMouse.ToString())
    }
}

module.exports = PlayerController