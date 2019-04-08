/**
 * Object containing x, y parameters which can determine how to change snake position when move
 * @typedef {Object} Direction
 * @property {number} x
 * @property {number} y
 * @property {number} index
 */

let directions = {
    /**
     * @type {Direction}
     */
    up: {
        index: 0,
        x: 0,
        y: -1
    },
    /**
     * @type {Direction}
     */
    right: {
        index: 1,
        x: 1,
        y: 0
    },
    /**
     * @type {Direction}
     */
    down: {
        index: 2,
        x: 0,
        y: 1
    },
    /**
     * @type {Direction}
     */
    left: {
        index: 3,
        x: -1,
        y: 0
    },

    /**
     * It's simple spinner over directions
     * @param {number} index
     * @returns {Direction}
     */
    getByIndex(index) {
        for (var key in this) {
            if (this[key].index === index) {
                return this[key];
            }
        }

        if (index > 3) {
            return this.up;
        }

        if (index < 0) {
            return this.left
        }

        throw new Error(`You are trying to get direction with index equal ${index}, there is no such direction`)
    },
};

module.exports = directions;