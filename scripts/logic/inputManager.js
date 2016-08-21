'use strict'

const _ = require('lodash')
const util = require('../util/util')
const Vector2D = util.Vector2D

const KeyMap = {
    A: 65,
    W: 87,
    D: 68,
    S: 83,
    SPACE: 32
}
module.exports = (bUseKeyInput = false, bUseMouseInput = false, bUseTouchInput = false) => {
    class inputManager {
        constructor(bUseKeyInput, bUseMouseInput, bUseTouchInput) {
            this.KeyPressed = new Array()
            this._MousePositon = new Vector2D()
            this.MousePositon = new Vector2D()
            this.bUseKeyInput = bUseKeyInput
            this.bUseMouseInput = bUseMouseInput
            this.bUseTouchInput = bUseTouchInput
        }
        get CheckKeyEvent() { return this.bUseKeyInput && this.KeyPressed.some(v=>v) }
        get CheckMouseEvent() {
            return this.bUseMouseInput && !this.MousePositon.Compare(this._MousePositon) && ((this._MousePositon.Copy(this.MousePositon)) || true)
        }
        get GetMouse() { return this.MousePositon }
        CheckKey(k) { return this.KeyPressed[KeyMap[k]]}
    }
    let inputMnager = new inputManager(bUseKeyInput, bUseMouseInput, bUseTouchInput)

    bUseMouseInput && window.addEventListener("mousemove", (e) => {
        inputMnager.MousePositon.Set(e.clientX, e.clientY)
    }, false);
    bUseKeyInput && window.addEventListener("keydown", (e) => {
        inputMnager.KeyPressed[e.keyCode] = true
    }, false);
    bUseKeyInput && window.addEventListener("keyup", (e) => {
        inputMnager.KeyPressed[e.keyCode] = false
    }, false);

    return inputMnager
}