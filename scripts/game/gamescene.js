'use strict'

const _ = require('lodash')
const util = require('../util/util')
const scene = require('../logic/scene')
const Actor = require('../logic/actor')

class gamescene extends scene {
    constructor(context) {
        super(context)
        
        this.A = new Actor(this.context, 'SpriteActor')
        this.BS = _.map(new Array(300), __=>{
            const pos = {
                X: _.random(-400, 400, true),
                Y: _.random(-800, 800, true)
            }
            return new Actor(this.context, 'AnimationActor', this.ProjectionViewport(pos)) 
        }) 
        this.C = new Actor(this.context, 'TextSpriteActor', this.ProjectionViewport({X:-540, Y:-200}))
        this.bgm = new Actor(this.context, "AudioClipActor")
    }
    BeginPlay() {
        this.A.Spawn(this, true)
        _.forEach(this.BS, a=>a.Spawn())
        this.C.Spawn()
        this.bgm.Spawn()

        this.C.GetComponent('textsprite').ChangeText(
            '하이요! 이게 얼마나 길게 써지는데 테스트 해보고 싶어요', 
            55, util.RGB(255,255,0), 'RixToyGray')
        
        this.bgm.GetComponent('audioclip').Play()
    }
    Destroy() {}
    Tick(delta) {
        _.forEach(this.BS, a=>{
            a.MoveRotation(util.Rotator.C({Roll:0.001}).Multifly_Float(delta))
        })
    }
    InputKey() {}
    InputMouse() {}
}

module.exports = gamescene