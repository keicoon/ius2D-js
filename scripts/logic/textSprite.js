"use strict"

const transform = require('./transform');
const render = require('./render');

module.exports = (canvas, gl) => {
    let getPowerOfTwo = (value, pow = 1) => {
        pow = pow;
        while(pow < value) {
            pow *= 2;
        }
        return pow;
    }
    let generateTextTexture = (text, size, color, font) => {
        let ctx = canvas.getContext('2d')
        ctx.font = size + 'px ' + font
        canvas.width = getPowerOfTwo(ctx.measureText(text).width)
        canvas.height = getPowerOfTwo(2 * size)
        ctx = canvas.getContext('2d')
        ctx.fillStyle = color
        ctx.font = size + 'px ' + font
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(text, canvas.width * 0.5, canvas.height * 0.5)

        let texture = gl.createTexture()
        
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST)
        gl.generateMipmap(gl.TEXTURE_2D)
        gl.bindTexture(gl.TEXTURE_2D, null)

        return {Src: texture, width: canvas.width, height: canvas.height}
    }

    class textSprite extends transform {
        constructor(logic, text = '', size = 15, color = 'rgb(255,255,255)', font = 'RixToyGray', location, rotation, scale) {
            super(location, rotation, scale)
            this.logic = logic
            this.vertex = logic.util.MakeVertexsData(logic.gl, 'rectData');

            ///temperary cached
            this.cached = {
                text,
                size,
                color,
                font
            }

            this.ChangeText()
        }
        ChangeText(text, size, color, font) {
            let _Src = generateTextTexture(text || this.cached.text, size || this.cached.size, color || this.cached.color, font || this.cached.font)
            this.Src = _Src.Src
            this.SrcRect = [0,0,_Src.width,_Src.height]
            this.uv = this.logic.util.MakeRectUVData(this.logic.gl, _Src.width, _Src.height, this.SrcRect);
        }
        GetSpriteScale() {
            const rect = this.SrcRect;
            const SrcScale = { X: rect[2], Y: rect[3], Z: 1 };
            return [SrcScale.X * this.Scale.X, SrcScale.Y * this.Scale.Y, SrcScale.Z * this.Scale.Z];
        }
        Render() {
            render(this.logic.gl, this.logic.program, this.vertex, this.uv,
                this.LocationByArr, this.RotationByArr, this.logic.util.ArrayVectorMultifly(this.GetSpriteScale(), this.logic.viewportScale),
                this.Src)
        }
    }
    return textSprite
}
