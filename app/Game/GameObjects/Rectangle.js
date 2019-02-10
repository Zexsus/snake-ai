const GameObject = require("./GameObject.js");
const Vector2D = require('../../Engine/Vector2D.js');

class Rectangle extends GameObject {

    /**
     * @param {Engine} engine
     * @param {Vector2D} position
     * @param {Vector2D} size
     * @param {GameObjectState} state
     */
    constructor(engine, position, size, state) {
        super(engine, position, size);
        this.ctx = this.engine.getContext('2d');
        this.state = state;
    }

    draw() {
        this.ctx.fillStyle = this.state.color;
        this.ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
    }

    /**
     * @returns {GameObjectState}
     */
    getState(){
        return this.state;
    }

    setState(state){
        this.state = state;
    }

    /**
     * @param {string} name
     * @returns {boolean}
     */
    hasState(name){
        return (this.state.name === name);
    }

    clear(rect) {
        this.ctx.clearRect(rect.position.x, rect.position.y, rect.size.x, rect.size.y);
    }
}

module.exports = Rectangle;