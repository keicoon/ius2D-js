module.exports = (gl)=>{
    gl.clearColor(Math.random(),Math.random(),Math.random(), 1)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    
}