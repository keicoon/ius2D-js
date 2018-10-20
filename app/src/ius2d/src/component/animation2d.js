module.exports = class Animation2DComponent extends Component {
    constructor(owner, params) {
        super(owner, 'animation2d')

        this.aN = params.aN || 0
        this.fps = params.fps || 1000
    }
    Tick(delta) {
        this.time += delta
        let currentFrame = Math.floor(this.time * this.frame / this.fps)
        if (currentFrame >= this.frame) {
            currentFrame = this.time = 0
        }
        if (currentFrame != this.currentFrame) {
            this.currentFrame = currentFrame
            this.sprite2DComp.SetSprite(undefined, this.aN, this.currentFrame)
        }
    }
    BeginPlay() {
        this.time = 0
        this.sprite2DComp = this.owner.GetComponent('sprite2d')
        this.SetAnimation()
    }
    SetAnimation(spriteName, aN, fps) {
        this.aN = aN || this.aN, this.fps = fps || this.fps

        this.currentFrame = this.time = 0
        this.sprite2DComp.SetSprite(spriteName, this.aN, this.currentFrame)
        this.frame = this.sprite2DComp.Id.animation[this.aN].length
    }
}