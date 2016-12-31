'use strict'

const _ = require('lodash')

module.exports = class Delegate {

    constructor() {
        this._delegate = new Array()
    }

    BroadCast(...params) {
        _(this._delegate).forEach(f=>f.apply(null, params))
    }
    
    RemoveAll() {
        this._delegate.length = 0
    }

    set Add(_f) {
        this._delegate.push(_f)
    }
    // TODO: replace 'lodash remove'
    set Remove(_f) {
        _.remove(this._delegate, (f)=>Object.is(f, _f))
    }

}