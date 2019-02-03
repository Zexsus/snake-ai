const Vector2D = require('../../Engine/Vector2D.js');
const Rectangle = require('./Rectangle.js');

class GridItem extends Rectangle{

    /**
     * @param {Vector2D} positionInGrid
     * @param {Engine} engine
     * @param {Vector2D} position
     * @param {Vector2D} size
     * @param {GameObjectState} state
     */
    constructor(positionInGrid, engine, position, size, state) {
        super(engine, position, size, state);
        this._positionInGrid = positionInGrid;
    }


    getPositionInGrid() {
        return this._positionInGrid;
    }
}

module.exports = GridItem;