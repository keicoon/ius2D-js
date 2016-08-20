'use strict'

const _ = require('lodash')

class Delegate {
    constructor(_pn) {
        this._delegate = new Array()
        this.pn = _pn
    }
    BroadCast(...p) {
        switch(this.pn) {
            case 0:
            _(this._delegate).forEach(f=>f())
            break
            case 1:
            _(this._delegate).forEach(f=>f(p[0]))
            break
            case 2:
            _(this._delegate).forEach(f=>f(p[0], p[1]))
            break
            case 3:
            _(this._delegate).forEach(f=>f(p[0], p[1], p[2]))
            break
        }
    }
    set Add(_f) {
        this._delegate.push(_f)
    }
    set Remove(_f) {
        this._delegate.splice(_.findIndex(this._delegate, (f)=>Object.is(f, _f)), 1)
    }
    RemoveAll() {
        this._delegate = []
    }
}
module.exports = Delegate