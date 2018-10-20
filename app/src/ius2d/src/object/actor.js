module.exports = class Actor {
    constructor(context, actorName, Location, Rotation, Scale) {
        this.name = actorName
        this.context = context
        this.uid = this.name + '_' + (uid++) 
        
        const params = _.find(actorData, a => a.$type === actorName)
        if(params) this.components = _.map(params.components, c => new Component[c.$type](this, c.params))
        
        this.transform = new Transform(Location, Rotation, Scale)
        
        this._componentsCached = new Map()
        this.bUsingCustomTick = false
    }
    Spawn(scene , bController = false) {
        this.BeginPlay()
        scene = scene || this.context.GetCurrentScene()
        scene.actors.push(this)
        bController && this.context.controller.Posess(this, scene)
    }
    DeSpawn() {
        this.Destroy()
        const scene = this.context.GetCurrentScene()
        _.remove(scene.actors, a=>a.uid == this.uid)
    }
    Tick(delta) {
        this.bController && this.context.controller.Tick(delta)
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
    AttachComponent(_name, _params) {
        let c = this.GetComponent(_name)
        if(!c) {
            c = new Component[_name](this, _params)
            this.components.push(c)
            c.BeginPlay()
        }
    }
    DetachComponent(_name) {
        let c = this.GetComponent(_name)
        if(c) {
            c.Destroy()
            _.remove(this.components, c => c.name == _name)
            this._componentsCached[_name] = null
        }
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