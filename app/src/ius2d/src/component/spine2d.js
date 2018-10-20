module.exports = class Spine2DComponent extends Component {
    constructor(owner, params) {
        super(owner, 'spine2d')

        this.resourceManager = this.context.resourceManager
        this.vertex = util.MakeVertexsData(this.context.gl, 'rectData')

        this.spineName = params.spineName

        this.skeletonData = null
        this.state = null
        this.skeleton = null
    }
    Tick(delta) {
        const degrad = 0.01745
        const vs = this.context.viewportScale
        //@update
        this.state.update(delta * 0.001)
        this.state.apply(this.skeleton)
        this.skeleton.updateWorldTransform()
        //@render
        let skeleton = this.skeleton, drawOrder = skeleton.drawOrder
        for (let i = 0, n = drawOrder.length; i < n; i++) {
            let slot = drawOrder[i]
            let attachment = slot.attachment
            if (!(attachment instanceof spine.RegionAttachment)) continue
            let bone = slot.bone
            let x = (skeleton.x + attachment.x * bone.a + attachment.y * bone.b + bone.worldX) * vs.X
            let y = (skeleton.y + attachment.x * bone.c + attachment.y * bone.d + bone.worldY) * vs.Y
            let rotation = (bone.getWorldRotationX() - attachment.rotation) * degrad
            let w = attachment.width * bone.getWorldScaleX(), h = attachment.height * bone.getWorldScaleY()
            
            render(this.context.gl, this.context.program, this.context.pixelMatrix, this.vertex, attachment.uv,
                util.Vector3D.C({ X: x, Y: y, Z: 0 }).Add_Vector(this.owner.transform.Location).ToArray(),
                util.Rotator.C({ Roll: rotation }).Add_Rotator(this.owner.transform.Rotation).ToArray(),
                this.GetSpriteScale(w, h).Multifly_Vector(vs).ToArray(),
                attachment.texture)
        }
    }
    BeginPlay() {
        const gl = this.context.gl
        const spine_data = this.resourceManager.GetSpine(this.spineName)
        let json = new spine.SkeletonJson({
            newRegionAttachment: function (skin, name, path) {
                let attachment = new spine.RegionAttachment(name)
                const imgData = spine_data.src.get(name)
                attachment.rendererObject = imgData.Image
                const w = imgData.Image.width, h = imgData.Image.height
                attachment.uv = util.MakeRectUVData(gl, GetPowerOfTwo(w), GetPowerOfTwo(h), [0, 0, w, -h])
                attachment.texture = imgData.Src
                return attachment
            },
            newBoundingBoxAttachment: function (skin, name) {
                return new spine.BoundingBoxAttachment(name)
            }
        });

        json.scale = (this.owner.transform.Scale.X + this.owner.transform.Scale.Y) * 0.5
        this.skeletonData = json.readSkeletonData(spine_data.skelatal)
        spine.Bone.yDown = true

        this.skeleton = new spine.Skeleton(this.skeletonData)

        let stateData = new spine.AnimationStateData(this.skeletonData)
        this.state = new spine.AnimationState(stateData)
    }
    GetSpriteScale(w, h) {
        const scale = this.owner.transform.Scale
        return Vector3D.C({ X: w, Y: h, Z: 1 }).Multifly_Vector(scale)
    }
    SetDefaultMix(defaultMix) {
        this.state.data.defaultMix = defaultMix
    }
    SetAnimationByName(trackIndex, animationName, loop) {
        this.state.setAnimationByName(trackIndex, animationName, loop)
    }
    AddAnimationByName(trackIndex, animationName, loop, delay) {
        this.state.addAnimationByName(trackIndex, animationName, loop, delay)
    }
}