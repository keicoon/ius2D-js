'use strict'

const _ = require('lodash')

const textureData = require('../data/texture')
const fontPath = require('../data/font')

class resourceManager {
    constructor(context) {
        this.context = context
        this.imgMap = new Map()
        this.maximumResourceNum = this.currentResourceNum = 0
    } 
    get IsLoaded() {
        return (this.currentResourceNum >= this.maximumResourceNum)
    }
    GetStatus() {
        return 'Loading... '+ this.currentResourceNum + ' / ' + this.maximumResourceNum
    }
    AddImage(gl, name) {
        let texture = gl.createTexture();
        texture.img = new Image();
        texture.img.src = textureData[name].src;
        ++this.maximumResourceNum;
        
        texture.img.onload = ()=>{
            gl.bindTexture(gl.TEXTURE_2D, texture)
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.img);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.bindTexture(gl.TEXTURE_2D, null);
            this.imgMap.set(name, {'Id':textureData[name],'Src':texture});
            ++this.currentResourceNum;
            console.log('#Loaded Image', name)
        }
    }
    GetImage(name) {
        return this.imgMap.get(name);
    }
    AddAllFont() {
        _.forEach(fontPath, (v, k) => this.AddFont(k))
    }
    AddFont(name) {
        let FontFace = this.context.FontFace
        let document = this.context.document
        let f = new FontFace(name, 'url(' + fontPath[name] + ')')
        ++this.maximumResourceNum
        f.load().then((loadedFace)=>{
            document.fonts.add(loadedFace)
            ++this.currentResourceNum
            console.log('#Loaded Font', name)
        })
    }
}
module.exports = resourceManager;