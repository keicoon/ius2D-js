// @TODO: experiment component
module.exports = class Live2DComponent extends Component {
    constructor(owner, params) {
        super(owner, 'live2d')

        this.resourceManager = this.context.resourceManager

        this.live2dName = params.live2dName

        this.live2DModel = null
    }
    Tick(delta) {
        var t = UtSystem.getTimeMSec() * 0.001 * 2 * Math.PI; //1秒ごとに2π(1周期)増える
        var cycle = 3.0; //パラメータが一周する時間(秒)
        // PARAM_ANGLE_Xのパラメータが[cycle]秒ごとに-30から30まで変化する
        this.live2DModel.setParamFloat("PARAM_ANGLE_X", 30 * Math.sin(t / cycle));

        this.live2DModel.update();
        this.live2DModel.draw();
    }
    BeginPlay() {
        this.gl = this.context.gl

        const live2d_data = this.resourceManager.GetLive2D(this.live2dName)

        this.live2DModel = Live2DModelWebGL.loadModel(live2d_data.model);
        _.each(live2d_data.src, (texture, index) => {
            this.live2DModel.setTexture(index, texture)
        })

        this.live2DModel.setGL(this.gl);

        const s = 2.0 / this.live2DModel.getCanvasWidth();
        const matrix4x4 = [
            s, 0, 0, 0,
            0, -s, 0, 0,
            0, 0, 1, 0,
            -1.0, 1, 0, 1];

        this.live2DModel.setMatrix(matrix4x4);
    }
}