/**
 * Simple object to provide x,y logic
 * @param {number} x
 * @param {number} y
 */
class Vector2D {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    /**
     * @param {Vector2D} vector
     * @returns {Vector2D}
     */
    add(vector){
        this.x += vector.x;
        this.y += vector.y;

        return this;
    }

    /**
     * @param {Vector2D} vector
     * @returns {Boolean}
     */
    isEqual(vector){
        return this.x === vector.x && this.y === vector.y;
    }
}

module.exports = Vector2D;