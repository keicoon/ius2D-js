module.exports = class AudioListenerComponent extends Component {
    constructor(owner, params) {
        super(owner, 'audiolistener')

        this.volume = 0.1
        this.radius = 1000 * 500
    }
    Tick() { }
    BeginPlay() { }
    GetListenerLocation() { return this.owner.transform.Location }
    get Volume() { return this.volume }
    set Volume(_v) { this.volume = _v }
}