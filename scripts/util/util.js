'use strict'

const Vector3D = require('./vector').Vector3D
const Vector2D = require('./vector').Vector2D
const Rotator = require('./rotator')
const Delegate = require('./delegate')

module.exports = {
    MakeVertexsData:(gl,bufferType)=>{
        const data = require('../data/arraybuffer')
        let bufferData = data[bufferType];
    
        let vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(bufferData.vertical), gl.STATIC_DRAW)
        vertexBuffer.itemSize = 3;
        vertexBuffer.numItem = bufferData.numItem;  
        return vertexBuffer;
    },
    MakeRectUVData:(gl,dw,dh,ar)=>{
        const _w = 1 / dw, _h = 1 / dh;
        const uvData = [
            ar[0]*_w,           (ar[1]+ar[3])*_h, 
            (ar[0]+ar[2])*_w,   (ar[1]+ar[3])*_h,
            ar[0]*_w,           ar[1]*_h,
            (ar[0]+ar[2])*_w,   ar[1]*_h
        ];
        
        let UVBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, UVBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvData), gl.STATIC_DRAW)
        UVBuffer.itemSize = 2;
        UVBuffer.numItem = 4;
        return UVBuffer;
    },
    ProjectionViewport:(loc, logic)=>{
        return Vector3D.C(loc).Multifly_Vector(logic.viewportScale)
    },
    RGB:(r,g,b)=>'rgb('+r+','+g+','+b+')',
    Vector3D,
    Vector2D,
    Rotator,
    Delegate
}