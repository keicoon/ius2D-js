const Component = require('./index.js');

module.exports = class Sprite2DComponent extends Component {
    constructor(owner, params) {
        super(owner, 'sprite2d')

        this.spriteName = params.spriteName
        this.aN = params.aN || 0
        this.sN = params.sN || 0
    }
    Tick() {
        render(this.context.gl, this.context.program, this.context.pixelMatrix, this.vertex, this.uv,
            this.owner.transform.Location.ToArray(), this.owner.transform.Rotation.ToArray(),
            this.GetSpriteScale().Multifly_Vector(this.context.viewportScale).ToArray(),
            this.Src)
    }
    BeginPlay() {
        this.resourceManager = this.context.resourceManager
        this.vertex = util.MakeVertexsData(this.context.gl, 'rectData')
        this.SetSprite(this.spriteName, this.aN, this.sN)
    }
    SetSprite(spriteName, aN, sN) {
        if (spriteName != undefined) {
            this.spriteName = spriteName
            const imgData = this.resourceManager.GetImage(spriteName)
            this.Id = imgData.Id
            this.Src = imgData.Src
        }
        if (aN != undefined && sN != undefined) {
            this.aN = aN, this.sN = sN
            this.uv = util.MakeRectUVData(this.context.gl, this.Id.width, this.Id.height, this.Id.animation[this.aN][this.sN])
        }
    }
    GetSpriteScale() {
        const rect = this.Id.animation[this.aN][this.sN]
        const scale = this.owner.transform.Scale
        return Vector3D.C({ X: rect[2], Y: rect[3], Z: 1 }).Multifly_Vector(scale)
    }
}