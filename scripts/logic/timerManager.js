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
    constructor(t, immune) {
        this.time = new time()
        this.stockTime = t
        this.immune = immune
        this.bBoom = false
    }
    SetStockTime(t) {
        this.stockTime = t
    }
    SetTimerFunc(fn) {
        this.fn = fn
    }
    Tick(delta) {
        if(this.bBoom) return
        
        this.time.Tick(delta)
        if(this.time.currentTime > this.stockTime) {
            this.bBoom = true
            if(this.fn) {
                this.fn()
                this.IsBoom()
            }
            this.time.Reset()
        }
    }
    IsBoom() {
        const result = this.bBoom
        if(result) this.bBoom = false
        return result
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
    AddTimer(t, immune = false) {
        let _timer = new timer(t, immune)
        this.timers.push(_timer)
        return _timer
    }
    DeleteTimer() {
        let _timers = []
        for(let index = 0, length = this.timers.length; index < length; ++index)
            this.timers[index].immune && _timers.push(this.timers[index])
        this.timers = _timers
    }
    DeleteAllTimer() {
        this.timers = []
    }
}
module.exports = new timerManager()