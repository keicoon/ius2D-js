'use strict'

const _fps = 1000 / 60
class fps {
    constructor() {
        this.delta = 1
        this.lastDate = Date.now()
    }
    Tickfps() {
        let currentDate = Date.now()
        let delta = (currentDate - this.lastDate)
        if(delta > _fps) {
            this.delta = delta
            this.lastDate = currentDate;
            return delta
        }
        else return 0
    }
    Getfps() {
        return Math.round(1000 / this.delta)
    }
}
module.exports = new fps()