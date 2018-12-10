class GameObject {

    /**
     * @param {Engine} engine
     * @param {Vector2D} position
     * @param {Vector2D} size
     */
    constructor(engine, position, size) {
        this.engine = engine;
        this.position = position;
        this.size = size;
    }

    /**
     * @param {Vector2D} position
     */
    setPosition(position) {
        this.position = position;
    }

    /**
     * @param {Vector2D} size
     */
    setSize(size) {
        this.size = size;
    }

    /**
     * @returns {Vector2D}
     */
    getSize(){
        return this.size;
    }

    /**
     * @returns {Vector2D}
     */
    getDisplaySize(){
        return this.size;
    }

    /**
     * @param {Vector2D} vector
     */
    move(vector) {
        this.clear(this);
        this.lastPosition = this.position;
        this.position.add(vector);

        this.draw();
    }

    /**
     * @param {GameObjectState} state
     */
    changeState(state) {
        this.clear(this);
        this.state = state;
        this.draw();
    }

    draw() {
        throw new Error('You have to implement the method draw()');
    }

    clear() {
        throw new Error('You have to implement the method clear()');
    }
}

module.exports = GameObject;