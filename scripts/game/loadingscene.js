'use strict'

const util = require('../util/util')
const scene = require('../logic/scene');
const gamescene = require('./gamescene');
const textSprite = require('../logic/textSprite')

class loadingscene extends scene {
    constructor(logic) {
        super(logic);
        this.resourceManager = logic.resourceManager
    }
    BeginPlay() {
        this.resourceManager.AddImage(this.logic.gl, 'test')
        this.resourceManager.AddImage(this.logic.gl, 'test2')
        this.resourceManager.AddAudio('Reminiscence', true)
        this.resourceManager.AddAudio('touhouproject', true)
        this.resourceManager.AddAllFont()
        this.logic.gameStatus = this.GameStatus.ResourceLoading
        this.textSprite = new (textSprite(this.logic))(this.logic, '', 30, util.RGB(255,255,255), 'Arial')
        this.rock = false
    }
    Destroy() {}
    Render(delta) {
        this.textSprite.Render()
    }
    Update(delta) {
        this.textSprite.ChangeText(this.resourceManager.GetStatus())
        if(!this.rock && this.resourceManager.IsLoaded) {
            this.rock = true
            //@lazy delay loading
            this.timer = this.logic.timerManager.AddTimer(500)
            this.timer.SetTimerFunc(()=>{
                this.logic.ChangeScene(this, new gamescene(this.logic));
                this.logic.gameStatus = this.GameStatus.ResourceLoaded
            })
        }
    }
    InputKey() {
        // console.log(k, s)
    }
    InputMouse() {
        // console.log(x, y)
    }
}

module.exports = loadingscene;