'use strict'

const _ = require('lodash')
const util = require('../util/util')
const scene = require('../logic/scene')
const Actor = require('../logic/actor')

class debugscene extends scene {
    constructor(context) {
        super(context)

        this.textActor = new Actor(this.context, 'TextSpriteActor', this.ProjectionViewport({ X: -540, Y: 960 }))
    }
    BeginPlay() {
        this.textActor.Spawn(this)
        this.textActor.GetComponent('textsprite').ChangeText(
            'fps: ', 55, util.RGB(255, 0, 255), 'RixToyGray')
        this.textActor.GetComponent('textsprite').tickCondition =
            () => this.GameStatus.ResourceLoaded <= this.CurrentGameStatus

        this.timer = this.context.timerManager.AddTimer(500, true)
    }
    Tick(delta) {
        _.forEach(this.actors, a=>a.Tick(delta))
        if (this.GameStatus.ResourceLoaded <= this.CurrentGameStatus && this.timer.IsBoom())
            this.textActor.GetComponent('textsprite').ChangeText('fps: ' + this.context.fps())
    }
}

module.exports = debugscene