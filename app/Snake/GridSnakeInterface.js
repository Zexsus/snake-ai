class GridSnakeInterface{

    /**
     * @param {Vector2D} position
     * @param {GameObjectState} state
     */
    constructor(position, state){
        this.position = position;
        this.state = state;
    }
}

module.exports = GridSnakeInterface;