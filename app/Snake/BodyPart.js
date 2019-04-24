const clone = require('lodash.clonedeep');
const Vector2D = require('../Engine/Vector2D.js');

class BodyPart {
    /**
     * @param {Vector2D} position
     */
    constructor(position = null) {
        this.position = position;
        this.next = null;
    }

    move(direction) {
        this.setPosition({
            x: this.position.x + direction.x,
            y: this.position.y + direction.y
        });

        return this;
    }

    setPosition(position) {
        if (this.next !== null) {
            this.next.setPosition(this.position);
        }
        this.position = clone(position);
    }

    recreate() {
        if (this.next !== null) {
            return this.next.recreate();
        }

        this.next = new BodyPart(this.position);
        return this.next;
    }
}

module.exports = BodyPart;