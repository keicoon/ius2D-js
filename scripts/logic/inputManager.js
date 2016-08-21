'use strict'

const _ = require('lodash')
const util = require('../util/util')
const Vector2D = util.Vector2D

module.exports = (bUseKeyInput = false, bUseMouseInput = false, bUseTouchInput = false) => {
    class inputManager {
        constructor(bUseKeyInput, bUseMouseInput, bUseTouchInput) {
            this.KeyPressed = new Object()
            this._MousePositon = new Vector2D()
            this.MousePositon = new Vector2D()
            this.bUseKeyInput = bUseKeyInput
            this.bUseMouseInput = bUseMouseInput
            this.bUseTouchInput = bUseTouchInput
        }
        get CheckKeyEvent() {
            return this.bUseKeyInput && _.find(this.KeyPressed, k=>k)
        }
        get CheckMouseEvent() {
            return this.bUseMouseInput && !this.MousePositon.Compare(this._MousePositon) && ((this._MousePositon.Copy(this.MousePositon)) || true)
        }
        get GetMouse() { return this.MousePositon }
        CheckKey(...p) {
            return p.some(k => this.KeyPressed[k]) 
        }
    }
    let inputMnager = new inputManager(bUseKeyInput, bUseMouseInput, bUseTouchInput)

    bUseMouseInput && window.addEventListener("mousemove", (e) => {
        inputMnager.MousePositon.Set(e.clientX, e.clientY)
    }, false);
    bUseKeyInput && window.addEventListener("keydown", (e) => {
        inputMnager.KeyPressed[e.key] = true
    }, false);
    bUseKeyInput && window.addEventListener("keyup", (e) => {
        inputMnager.KeyPressed[e.key] = false
    }, false);

    return inputMnager
}