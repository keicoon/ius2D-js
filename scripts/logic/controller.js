'use strict'

const _ = require('lodash')
const util = require('../util/util')
const Vector2D = util.Vector2D
const Delegate = util.Delegate

let MouseMoveDelegate = new Delegate(2),
    KeyDownDelegate = new Delegate(1),
    KeyUpDelegate = new Delegate(1)

window.addEventListener("mousemove", (e) => {
    MouseMoveDelegate.BroadCast(e.clientX, e.clientY)
}, false);
window.addEventListener("keydown", (e) => {
    KeyDownDelegate.BroadCast(e.key)
}, false);
window.addEventListener("keyup", (e) => {
    KeyUpDelegate.BroadCast(e.key)
}, false);

class Controller {
    constructor(bUseKeyInput, bUseMouseInput, bUseTouchInput) {
        this.KeyPressed = new Object()
        this._MousePositon = new Vector2D()
        this.MousePositon = new Vector2D()
        this.bUseKeyInput = bUseKeyInput
        this.bUseMouseInput = bUseMouseInput
        // this.bUseTouchInput = bUseTouchInput
        
        this.controlPlayer
    }
    Tick(delta) {
        this.bUseKeyInput && this.InputKey()
        this.bUseMouseInput && this.InputMouse()
    }
    BeginPlay() {
        if(this.bUseKeyInput) {
            KeyDownDelegate.Add = (key) => {
                this.KeyPressed[key] = true
            }
            KeyUpDelegate.Add = (key) => {
                this.KeyPressed[key] = false
            }
        }
        if(this.bUseMouseInput){
            MouseMoveDelegate.Add = (x, y)=> {
                this.MousePositon.Set(x, y)
            }
        }
        // this.bUseTouchInput &&
    }
    Destroy() {
        KeyDownDelegate.RemoveAll()
        KeyUpDelegate.RemoveAll()
        MouseMoveDelegate.RemoveAll()
    }
    CheckKey(...p) {
        return p.some(k => this.KeyPressed[k])
    }
    InputKey() {}
    InputMouse() {}
    Posess(_a, _s) {
        if(this.controlPlayer) {
            this.Destroy()
            this.controlPlayer.bController = false
            this.controlPlayer.DetachComponent('audiolistener')
        }
        this.controlPlayer = _a
        this.controlPlayer.AttachComponent('audiolistener')
        this.controlPlayer.bController = true
        this.BeginPlay()

        this.scene = _s
    }
    get GetControlPlayer() { return this.controlPlayer }
    get CheckKeyEvent() { return this.bUseKeyInput && _.find(this.KeyPressed, k => k) }
    get CheckMouseEvent() { return this.bUseMouseInput && !this.MousePositon.Compare(this._MousePositon) && ((this._MousePositon.Copy(this.MousePositon)) || true) }
    get GetMouse() { return this.MousePositon }
}

module.exports = Controller