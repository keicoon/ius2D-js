'use strict'

const scene = require('../logic/scene')
const Actor = require('../logic/actor')

class loadingscene extends scene {
    constructor(context) {
        super(context)
        this.resourceManager = this.context.resourceManager
        this.textActor = new Actor(this.context, 'TextSpriteActor')
    }
    BeginPlay() {
        this.resourceManager.AddImage('test')
        this.resourceManager.AddImage('test2')
        this.resourceManager.AddAudio('test_audio', true)
        this.resourceManager.AddAllFont()
        this.CurrentGameStatus = this.GameStatus.ResourceLoading

        this.textActor.Spawn()
        this.textActor.GetComponent('textsprite').ChangeText('', 30, undefined, undefined, 'center')
        this.timer = this.context.timerManager.AddTimer(500, true)

        this.lock = false
    }
    Destroy() {}
    Tick(delta) {
        if(this.timer.IsBoom())
            this.textActor.GetComponent('textsprite').ChangeText(this.resourceManager.GetStatus())
        if(!this.lock && this.resourceManager.IsLoaded) {
            this.lock = true
            //@lazy delay loading
            this.timer = this.context.timerManager.AddTimer(500)
            this.timer.SetTimerFunc(()=>{
                this.CurrentGameStatus = this.GameStatus.ResourceLoaded
                this.context.ChangeScene('Gamescene')
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