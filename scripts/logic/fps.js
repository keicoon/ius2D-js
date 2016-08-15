'use strict'

class fps {
    constructor() {
        this.delta = 1;
        this.lastDate = Date.now();
    }
    Tickfps() {
        let currentDate = Date.now();
        this.delta = (currentDate - this.lastDate) * 0.001;
        this.lastDate = currentDate;
        
        return this.delta;
    }
    Getfps() {
        return Math.round(1 / this.delta)
    }
}
module.exports = new fps();