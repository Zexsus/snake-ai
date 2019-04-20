class GameObjectState {
    constructor(name, color, collidable) {
        this.name = name;
        this.color = color;
        this.collidable = collidable;
    }

    getName() {
        return this.name;
    }

    getColor() {
        return this.color;
    }

    isCollidable() {
        return this.collidable;
    }

}

module.exports = GameObjectState;