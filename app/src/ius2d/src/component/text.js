module.exports = class TextSpriteComponent extends Component {
    constructor(owner, params) {
        super(owner, 'textsprite')

        this.text = params.text || ''
        this.size = params.size || 15
        this.color = params.color || util.RGB(255, 255, 255)
        this.font = params.font || 'Arial'
        this.textAlign = params.textAlign || 'left'
    }
    Tick() {
        render(this.gl, this.context.program, this.context.pixelMatrix, this.vertex, this.uv,
            this.owner.transform.Location.ToArray(), this.owner.transform.Rotation.ToArray(),
            this.GetSpriteScale().Multifly_Vector(this.context.viewportScale).ToArray(),
            this.Src)
    }
    BeginPlay() {
        this.canvas = this.context.canvas
        this.gl = this.context.gl
        this.vertex = util.MakeVertexsData(this.context.gl, 'rectData')
        this.ChangeText(this.text, this.size, this.color, this.font, this.textAlign)
    }
    GenerateTextTexture() {
        let ctx = this.canvas.getContext('2d')
        ctx.font = this.size + 'px ' + this.font
        ctx.textAlign = this.textAlign
        ctx.textBaseline = 'top'
        this.width = this.canvas.width = GetPowerOfTwo(2 * ctx.measureText(this.text).width)
        this.height = this.canvas.height = GetPowerOfTwo(2 * this.size)
        ctx = this.canvas.getContext('2d')
        ctx.fillStyle = this.color
        ctx.font = this.size + 'px ' + this.font
        ctx.textAlign = this.textAlign
        ctx.textBaseline = 'top'
        ctx.fillText(this.text, this.width * 0.5, this.height * 0.5)

        this.Src = this.gl.createTexture()

        this.gl.bindTexture(this.gl.TEXTURE_2D, this.Src)
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.canvas)
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR)
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_NEAREST)
        this.gl.generateMipmap(this.gl.TEXTURE_2D)
        this.gl.bindTexture(this.gl.TEXTURE_2D, null)
    }
    ChangeText(text, size, color, font, textAlign) {
        this.text = text || this.text, this.size = size || this.size, this.color = color || this.color,
            this.font = font || this.font, this.textAlign = textAlign || this.textAlign

        this.GenerateTextTexture()
        this.SrcRect = [0, 0, this.width, this.height]
        this.uv = util.MakeRectUVData(this.gl, this.width, this.height, this.SrcRect)
    }
    GetSpriteScale() {
        const rect = this.SrcRect
        const scale = this.owner.transform.Scale
        return Vector3D.C({ X: rect[2], Y: rect[3], Z: 1 }).Multifly_Vector(scale)
    }
}