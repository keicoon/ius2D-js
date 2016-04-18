class img {
    constructor() {
        this.imgMap = new Map();
    }
    add(gl, name, src) {
        let texture = gl.createTexture();
        texture.img = new Image();
        texture.img.src = src;
        
        texture.img.onload = ()=>{
            gl.bindTexture(gl.TEXTURE_2D, texture)
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.img);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.bindTexture(gl.TEXTURE_2D, null)
            this.imgMap.set(name, texture);
        }
    }
    get(name) {
        return this.imgMap.get(name);
    }
}
module.exports = new img();