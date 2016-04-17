const render = require('./render');

module.exports = (gl)=>{
    
    setInterval(()=>{render(gl);},16)
    // render(gl)
}