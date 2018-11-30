GameObject = require("./GameObject.js");

class Rectangle extends GameObject {
    constructor(engine, params) {
        super(engine);
        this.ctx = this.engine.getContext('2d');
        this.position = {
            x: params.x,
            y: params.y
        };

        this.lastPosition = this.position;

        this.size = {
            width: params.width,
            height: params.height
        };

        this.state = params.state;
    }


    draw() {
        this.ctx.fillStyle = this.state.color;
        this.ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
    }

    /**
     *
     * @returns {GameObjectState}
     */
    getState(){
        return this.state;
    }

    setState(state){
        this.state = state;
    }

    /**
     *
     * @param {string} name
     * @returns {boolean}
     */
    hasState(name){
        return (this.state === this.engine.getState(name));
    }

    clear(rect) {
        this.ctx.clearRect(rect.position.x, rect.position.y, rect.size.width, rect.size.height);
    }
}

module.exports = Rectangle;