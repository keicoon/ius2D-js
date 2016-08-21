'use strict'

const _ = require('lodash')
const Transform = require('./transform')
const Component = require('./component')
const actorData = require('../data/actor')

let uid = 0
class Actor {
    constructor(context, actorName, Location, Rotation, Scale) {
        this.name = actorName
        this.context = context
        this.uid = this.name + '_' + (uid++) 
        
        const params = actorData[actorName]
        if(params) this.components = _.map(params.components, c => new Component[c.name](this, c.params))
        
        this.transform = new Transform(Location, Rotation, Scale)
        
        this._componentsCached = new Map()
        this.bUsingCustomTick = false
    }
    Spawn(scene) {
        this.BeginPlay()
        scene = scene || this.context.GetCurrentScene()
        scene.actors.push(this)
    }
    DeSpawn() {
        this.Destroy()
        const scene = this.context.GetCurrentScene()
        scene.actors.splice(_.findIndex(scene.actors, a=>a.uid == this.uid), 1)
    }
    Tick(delta) {
        _.forEach(this.components, c => c.pTick(delta))
        // if (this.bUsingCustomTick) {
        //     this.CustomTick(delta)
        // }
    }
    BeginPlay() {
        _.forEach(this.components, c=>c.BeginPlay())
    }
    Destroy() {
        _.forEach(this.components, c=>c.Destroy())
    }
    GetComponent(_name) {
        let c = this._componentsCached[_name]
        if(!c) c = this._componentsCached[_name] = _.find(this.components, c => c.name == _name) 
        return c
    }
    AddComponent(_name, _params) {
        let c = this.GetComponent(_name)
        if(!c) this.components.push(new components[_name](this, _params))
    }
    MoveLocation(_Location) {
        this.transform.MoveLocation(_Location)
    }
    MoveRotation(_Rotation) {
        this.transform.MoveRotation(_Rotation)
    }
    MoveScale(_Location) {
        this.transform.MoveScale(_Scale)
    }
}

module.exports = Actor