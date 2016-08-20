'use strict'

class time {
    constructor() {
        this.currentTime = 0
    }
    Tick(delta) {
        try {
            this.currentTime += delta
            this.currnetTime > Number.Max && this.Reset()
        } catch(e) {
            console.error(e)
        }
    }
    Reset() {
        this.currentTime = 0
    }
}
class timer {
    constructor(t, bImmune, bUseBoom) {
        this.time = new time()
        this.stockTime = t
        this.bImmune = bImmune
        this.bUseBoom = bUseBoom
        this.bBoom = false
    }
    SetTimerFunc(fn) {
        this.fn = fn
    }
    ResetTime() {
        this.time.Reset()
    }
    Tick(delta) {
        if (this.bBoom) return

        if (this.time.currentTime > this.stockTime && this.bUseBoom) {
            this.bBoom = true
            if (this.fn) {
                this.fn()
                this.IsBoom()
            }
            this.ResetTime()
        }
        this.time.Tick(delta)
    }
    IsBoom() {
        return this.bBoom && ((this.bBoom = false) || true)
    }
    get Time() {
        return this.time.currentTime
    }
}
class timerManager {
    constructor() {
        this.timers = []
    }
    Tick(delta) {
        for(let index = 0, length = this.timers.length; index < length; ++index)
            this.timers[index].Tick(delta)
    }
    AddTimer(t = 0, bImmune = false, bUseBoom = true) {
        let _timer = new timer(t, bImmune, bUseBoom)
        this.timers.push(_timer)
        return _timer
    }
    DeleteTimer() {
        let _timers = []
        for(let index = 0, length = this.timers.length; index < length; ++index)
            this.timers[index].bImmune && _timers.push(this.timers[index])
        this.timers = _timers
    }
    DeleteAllTimer() {
        this.timers = []
    }
}
module.exports = new timerManager()