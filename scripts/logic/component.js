'use strict'

const _ = require('lodash')
const util = require('../util/util')
const Vector3D = util.Vector3D

function lerp(t, a, b) {
    return t * (b - a) + a
}
function GetPowerOfTwo(value, pow = 1) {
    while (pow < value) pow *= 2
    return pow;
}

class Component {
    constructor(_owner, _name) {
        this.owner = _owner
        this.context = _owner.context
        this.name = _name

        this.prevTickDelta = 0, this.curTickDelta = 0, this.tickInterval = 0
        this.tickCondition = () => true
    }
    pTick(delta) {
        if((this.curTickDelta += delta) - this.prevTickDelta >= this.tickInterval && this.tickCondition()) {
            this.currentDelta = this.prevDelta = 0
            this.Tick(delta)
        }
    }
    BeginPlay() {}
    Destroy() {}
    Debug() {}
}
const render = require('./render')
class Sprite2DComponent extends Component {
    constructor(owner, params) {
        super(owner, 'sprite2d')
        
        this.spriteName = params.spriteName  
        this.aN = params.aN || 0
        this.sN = params.sN || 0
    }
    Tick() {
        render(this.context.gl, this.context.program, this.vertex, this.uv,
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
        if(spriteName != undefined) {
            this.spriteName = spriteName
            const imgData = this.resourceManager.GetImage(spriteName)
            this.Id = imgData.Id
            this.Src = imgData.Src
        }
        if(aN != undefined && sN != undefined) {
            this.aN = aN, this.sN = sN
            this.uv = util.MakeRectUVData(this.context.gl, this.Id.width, this.Id.height, this.Id.animation[this.aN][this.sN])
        }
    }
    GetSpriteScale() {
        const rect = this.Id.animation[this.aN][this.sN]
        const scale = this.owner.transform.Scale
        return Vector3D.C({X:rect[2], Y:rect[3], Z:1}).Multifly_Vector(scale)
    }
}
class Animation2DComponent extends Component {
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
        
        this.currentFrame = this.time= 0
        this.sprite2DComp.SetSprite(spriteName, this.aN, this.currentFrame)
        this.frame = this.sprite2DComp.Id.animation[this.aN].length
    }
}
class TextSpriteComponent extends Component {
    constructor(owner, params) {
        super(owner, 'textsprite')

        this.text = params.text || ''
        this.size = params.size || 15
        this.color = params.color || util.RGB(255,255,255)
        this.font = params.font || 'Arial'
        this.textAlign = params.textAlign || 'left'
    }
    Tick() {
        render(this.gl, this.context.program, this.vertex, this.uv,
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
class AudioClipComponent extends Component {
    constructor(owner, params) {
        super(owner, 'audioclip')

        this.audioName = params.audioName
        this.volume = params.volume || 1
        this.bLoop = params.loop || false
        this.bAutoplay = params.autoplay || false
    }
    Tick() {
        if(this.audioId && this.audioClip.playing(this.audioId)) {    
            const audioListner = this.context.controller.GetControlPlayer.GetComponent('audiolistener')
            const ratio = 1000 / audioListner.radius
            const listenerPos = audioListner.GetListenerLocation()
            this.audioClip.pos(
                _.clamp(-listenerPos.X * ratio, -1000, 1000), _.clamp(-listenerPos.Y * ratio, -1000, 1000), -1,
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
}
///@ existed only one audiolistener in world
class AudioListenerComponent extends Component {
    constructor(owner, params) {
        super(owner, 'audiolistener')

        this.volume = 0.1
        this.radius = 1000 * 500
    }
    Tick() {}
    BeginPlay() {}
    GetListenerLocation() { return this.owner.transform.Location }
    get Volume() { return this.volume }
    set Volume(_v) { this.volume = _v }
}
class Spine2DComponent extends Component {
    constructor(owner, params) {
        super(owner, 'spine2d')

        this.resourceManager = this.context.resourceManager
        this.vertex = util.MakeVertexsData(this.context.gl, 'rectData')

        this.name = params.name

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

            render(this.context.gl, this.context.program, this.vertex,
                util.MakeRectUVData(this.context.gl, GetPowerOfTwo(w), GetPowerOfTwo(h), [0, 0, w, h]),
                util.Vector3D.C({ X: x, Y: -y, Z: 0 }).Add_Vector(this.owner.transform.Location).ToArray(),
                util.Rotator.C({ Roll: rotation }).Add_Rotator(this.owner.transform.Rotation).ToArray(),
                this.GetSpriteScale(w, h).Multifly_Vector(vs).ToArray(),
                attachment.texture)
        }
    }
    BeginPlay() {
        const spine_data = this.resourceManager.GetSpine(this.name)
        let json = new spine.SkeletonJson({
            newRegionAttachment: function (skin, name, path) {
                let attachment = new spine.RegionAttachment(name)
                const imgData = spine_data.src.get(name)
                attachment.rendererObject = imgData.Image
                attachment.texture = imgData.Src
                return attachment
            },
            newBoundingBoxAttachment: function (skin, name) {
                return new spine.BoundingBoxAttachment(name)
            }
        });
        //@TODO
        json.scale = (this.owner.transform.Scale.X + this.owner.transform.Scale.Y) * 0.5
        this.skeletonData = json.readSkeletonData(spine_data.skelatal)
        spine.Bone.yDown = true

        this.skeleton = new spine.Skeleton(this.skeletonData)

        let stateData = new spine.AnimationStateData(this.skeletonData)
        this.state = new spine.AnimationState(stateData)

        //@TODO:
        this.state.data.defaultMix = 0.4;
        this.state.setAnimationByName(0, "walk", true);
        this.state.addAnimationByName(0, "jump", false, 3);
        this.state.addAnimationByName(0, "run", true, 0);
    }
    GetSpriteScale(w, h) {
        const scale = this.owner.transform.Scale
        return Vector3D.C({ X: w, Y: h, Z: 1 }).Multifly_Vector(scale)
    }
}
module.exports = {
    sprite2d: Sprite2DComponent,
    animation2d: Animation2DComponent,
    textsprite: TextSpriteComponent,
    audioclip: AudioClipComponent,
    audiolistener: AudioListenerComponent,
    spine2d: Spine2DComponent
}