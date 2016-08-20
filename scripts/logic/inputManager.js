'use strict'

const Delegate = require('../util/util').Delegate

const KeyMap = {
    65: 'A',
    87: 'W',
    68: 'D',
    83: 'S',
    32: 'SPACE'
}
module.exports = (bUseKeyInput = false, bUseMouseInput = false, bUseTouchInput = false) => {
    class inputManager {
        constructor() {
            this.Delegate_InputKey = new Delegate(2)
            this.Delegate_InputMouse = new Delegate(2)
        }
    }
    let inputMnager = new inputManager()

    bUseMouseInput && window.addEventListener("mousemove", (e) => {
        inputMnager.Delegate_InputMouse.BroadCast(e.clientX, e.clientY)
    }, false);
    bUseKeyInput && window.addEventListener("keydown", (e) => {
        inputMnager.Delegate_InputKey.BroadCast(KeyMap[e.keyCode], true)
    }, false);
    bUseKeyInput && window.addEventListener("keyup", (e) => {
        inputMnager.Delegate_InputKey.BroadCast(KeyMap[e.keyCode], false)
    }, false);

    return inputMnager
}