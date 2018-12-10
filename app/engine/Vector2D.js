class Vector2D{

    /**
     * @param {number} x
     * @param {number} y
     */
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
}

module.exports = Vector2D;