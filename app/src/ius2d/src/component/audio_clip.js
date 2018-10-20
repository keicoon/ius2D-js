module.exports = class AudioClipComponent extends Component {
    constructor(owner, params) {
        super(owner, 'audioclip')

        this.audioName = params.audioName
        this.volume = params.volume || 1
        this.bLoop = params.loop || false
        this.bAutoplay = params.autoplay || false
    }
    Tick() {
        if (this.audioId && this.audioClip.playing(this.audioId)) {
            const audioListner = this.context.controller.GetControlPlayer.GetComponent('audiolistener')
            const ratio = 1000 / audioListner.radius
            const listenerPos = audioListner.GetListenerLocation()
            this.audioClip.pos(
                _.clamp(-listenerPos.X * ratio, -1000, 1000), _.clamp(-listenerPos.Y * ratio, -1000, 1000), -10 / this.Volume,
                this.audioId)
            const pos = this.owner.transform.Location
            this.audioClip.orientation(pos.X, pos.Y, 0, this.audioId)
        }
    }
    BeginPlay() {
        this.resourceManager = this.context.resourceManager
        this.audioClip = this.resourceManager.GetAudio(this.audioName)
    }
    Play() {
        const audioListner = this.context.controller.GetControlPlayer.GetComponent('audiolistener')
        this.audioClip.volume = _.clamp(lerp(0.8, this.volume, audioListner.Volume), 0, 1)
        this.audioClip.loop = this.bLoop
        this.audioClip.autoplay = this.bAutoplay
        this.audioId = this.audioClip.play()
    }
    Pause() {
        this.audioClip.pause()
    }
    Stop() {
        this.audioClip.stop()
    }
    get Volume() {
        return this.audioClip.volume
    }
    set Volume(value) {
        this.volume = value
        const audioListner = this.context.controller.GetControlPlayer.GetComponent('audiolistener')
        this.audioClip.volume = _.clamp(lerp(0.8, this.volume, audioListner.Volume), 0, 1)
    }
}