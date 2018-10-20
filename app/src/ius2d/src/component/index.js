'use strict';

const _ = require('lodash')

module.exports = class Component {
    constructor(_owner, _name) {
        this.owner = _owner
        this.context = _owner.context
        this.name = _name

        this.prevTickDelta = 0, this.curTickDelta = 0, this.tickInterval = 0
        this.tickCondition = () => true
    }
    pTick(delta) {
        if ((this.curTickDelta += delta) - this.prevTickDelta >= this.tickInterval && this.tickCondition()) {
            this.currentDelta = this.prevDelta = 0
            this.Tick(delta)
        }
    }
    BeginPlay() { }
    Destroy() { }
    Debug() { }
}